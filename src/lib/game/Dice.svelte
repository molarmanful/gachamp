<script>
  import { onMount } from 'svelte'
  import DiceBox from '@3d-dice/dice-box'

  import { BgImg, commaNum, user } from '..'

  import { HUD } from '.'

  import casino_woman_ai from '$lib/assets/casino-woman-ai.jpg?enhanced&saturation=2'

  let started, dicebox
  let rolling = false
  let checked = false
  let value = 100
  $: min = checked ? 200 : 100
  $: value = Math.max(min, value)

  onMount(async () => {
    dicebox = await new DiceBox('#dicebox', {
      assetPath: '/gachamp/dice-box/',
    }).init()
    dicebox.roll('20d6')
  })
</script>

<BgImg alt="AI casino woman" src={casino_woman_ai} />
<HUD />

<canvas id="dicebox" class="fixed inset-0 z--10 screen"></canvas>
{#if !rolling}
  <div
    class="nox m-auto max-w-prose w-full border-(3 blue solid) bg-black/50 p-4 text-center backdrop-blur-2 md:p-16"
  >
    {#if !started}
      <h1>Dice!</h1>
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
          $user.dice = 0
        }}
      >
        LEAVE
      </button>
    {:else}
      <form class="m-auto flex flex-col gap-4">
        {#if BigInt($user.money) > 200n}
          <label class="cursor-pointer">
            <input type="checkbox" bind:checked />
            Add a die (x2 bet)
          </label>
        {/if}
        <label>
          Bet: ${commaNum(value)}
          <br />
          <input
            class="cursor-pointer"
            max={$user.money}
            {min}
            type="range"
            bind:value
          />
        </label>
        <button
          class="blink bg-green-500 text-white"
          on:click={() => {
            dicebox.onRollComplete = res => {
              const sum = res[0].rolls
                .map(r => r.value)
                .reduce((a, b) => a + b, 0)
              const won = sum == 7 || sum == 12
              if (won)
                $user.money = BigInt($user.money) + BigInt(value) * 7n + ''
              alert(won ? 'YOU WON! Keep winning!' : 'You lost :( Try again!')
              rolling = false
            }
            $user.money = BigInt($user.money) - BigInt(value) + ''
            rolling = true
            dicebox.roll(checked ? '3d6' : '2d6')
          }}
        >
          SHOOT!
        </button>
        <button
          class="hovglow bg-red-500 text-white"
          on:click={() => {
            $user.dice = 0
          }}
        >
          LEAVE
        </button>
      </form>
    {/if}
  </div>
{/if}
