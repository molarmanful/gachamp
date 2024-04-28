<script>
  import labyrinthos from 'labyrinthos'
  import { onMount } from 'svelte'

  import { commaNum, user } from '..'

  import { HUD } from '.'

  let maze, rats, votes, place
  let value = 100
  let group = '🐁'
  let started = false
  let running = false
  let out = ''
  let countdown = 0
  let dones = []
  let pool = 0n

  const map = new labyrinthos.TileMap({ width: 30, height: 30 })

  class Rat {
    constructor(id, x, y) {
      this.id = id
      this.tracks = []
      this.back = false
      this.done = false
      this.track(x, y)
    }

    move() {
      if (this.done) return
      if (this.x == 1 && this.y == 1) {
        this.done = true
        if (this.id == group) {
          place = dones.length
          if (place == 0) {
            $user.money =
              BigInt($user.money) +
              pool / BigInt(votes[rats.findIndex(rat => rat.id == group)]) +
              ''
          } else if (place == 1) {
            $user.money = BigInt($user.money) + BigInt(value) / 2n + ''
          }
        }
        dones.push(this.id)
        return
      }
      if (!this.tracks.length) return
      this.cur.opts = this.cur.opts.filter(
        ([a, b]) => this.prev[0] != a || this.prev[1] != b
      )
      if (!this.cur.opts.length) {
        this.back = this.tracks.pop().pos
        return
      }
      if (this.back) {
        this.back = null
        this.choose(this.cur.opts)
        return
      }
      this.choose(this.cur.opts)
    }

    choose(opts) {
      const [x, y] = opts[0 | (Math.random() * opts.length)]
      this.track(x, y)
    }

    opts(x, y) {
      return [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ].flatMap(([a, b]) => (maze[x + a][y + b] ? [] : [[x + a, y + b]]))
    }

    track(x, y) {
      this.tracks.push({ pos: [x, y], opts: this.opts(x, y) })
    }

    get cur() {
      return this.tracks[this.tracks.length - 1]
    }

    get prev() {
      return this.back || this.tracks[this.tracks.length - 2]?.pos || []
    }

    get x() {
      return this.cur.pos[0]
    }

    get y() {
      return this.cur.pos[1]
    }
  }

  const disp = () => {
    const m = maze.map(a => a.slice())
    for (const { id, x, y } of rats) m[x][y] = id
    m[1][1] = '🧀'
    out = m.map(a => a.map(b => ['▪️', '⬜'][b] || b).join``).join`\n`
  }

  const init = () => {
    map.fill(1)
    labyrinthos.mazes.BinaryTree(map, {})
    maze = [
      Array(31).fill(1),
      ...map.mask('01')[0].slice(0, -1).split`\n`.map(a => [
        1,
        ...a.split``.map(b => +b),
      ]),
    ]

    rats = [
      new Rat('🐁', 1, 29),
      new Rat('🐀', 29, 1),
      new Rat('🏃', 29, 29),
      new Rat('🐍', 15, 29),
      new Rat('🦐', 29, 15),
    ]

    votes = rats.map(() => 0 | (Math.random() * 10))
    pool = BigInt(
      0 |
        ((Math.random() * Math.min($user.money, 1e5) + 100) *
          votes.reduce((a, b) => a + b, 0))
    )

    disp()
  }

  const run = () => {
    running = true
    dones = []
    const int = setInterval(() => {
      for (const rat of rats.slice().sort(() => Math.random() - 0.5)) rat.move()
      disp()
      if (rats.every(rat => rat.done)) {
        clearInterval(int)
        running = false
        alert(
          `${place == 0 ? 'YOUR RAT WON FIRST PLACE! Keep it up!' : 'Your rat lost :( Try again!'}\n\n${dones.map((r, i) => i + 1 + '. ' + r).join`\n`}`
        )
        init()
      }
    })
  }

  onMount(() => {
    init()
  })
</script>

<HUD />
<div class="fixed inset-0 screen flex text-[2vmin]">
  <pre class="m-auto">{out}</pre>
</div>
{#if !running && countdown <= 0}
  <div
    class="nox m-auto max-w-prose w-full border-(3 red solid) bg-black/50 p-4 text-center backdrop-blur-2 md:p-16"
  >
    {#if !started}
      <h1>Rat Race!</h1>

      <p>
        A fast-paced, intellectually stimulating competition! One might even
        call it <strong>a-maze-ing</strong>!
      </p>
      <p>
        Place your bet on a rat. If your rat is first to reach the cheese, then
        you win a share of the betting pool! If your rat comes in second place,
        then you'll still get half your bet back. Don't be shy, go big or go
        home!
      </p>

      <button
        class="blink mt-4 bg-green-500 text-white"
        disabled={BigInt($user.money) < 100n}
        on:click={() => {
          if (BigInt($user.money) < 100n) {
            alert('You need at least $100 to play!')
            return
          }
          started = 1
        }}
      >
        PLAY! ($100)
      </button>
      <button
        class="hovglow mt-4 bg-red-500 text-white"
        on:click={() => {
          $user.race = 0
        }}
      >
        LEAVE
      </button>
    {:else}
      <form class="m-auto flex flex-col gap-4">
        <p class="m-0">Choose your rat:</p>
        <div class="flex gap-8 flex-justify-center">
          {#each rats as rat, i}
            <label class="cursor-pointer">
              <input
                name="rat"
                class="cursor-pointer"
                type="radio"
                value={rat.id}
                bind:group
              />
              {rat.id}
              {votes[i] + (group == rat.id)}
            </label>
          {/each}
        </div>
        <label>
          Pot: ${commaNum(BigInt(value) + pool)}
          <br />
          Bet: ${commaNum(value)}
          <br />
          <input
            class="cursor-pointer"
            max={$user.money}
            min="100"
            type="range"
            bind:value
          />
        </label>
        <button
          class="blink bg-green-500 text-white"
          on:click={() => {
            $user.money = BigInt($user.money) - BigInt(value) + ''
            pool += BigInt(value)
            votes[rats.findIndex(rat => rat.id == group)]++
            countdown = 3
            const int = setInterval(() => {
              countdown--
              if (countdown <= 0) {
                clearInterval(int)
                run()
              }
            }, 1000)
          }}
        >
          START!
        </button>
        <button
          class="hovglow bg-red-500 text-white"
          on:click={() => {
            $user.race = 0
          }}
        >
          LEAVE
        </button>
      </form>
    {/if}
  </div>
{:else if countdown > 0}
  <div class="fixed inset-0 z-10 screen flex">
    <h1 class="m-auto text-([9rem] yellow-500)">{countdown}</h1>
  </div>
{/if}
