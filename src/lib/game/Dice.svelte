<script>
  import { user } from '..'

  import { HUD } from '.'

  let started
</script>

<HUD />

{#if !started}
  <div
    class="nox m-auto max-w-prose w-full border-(3 blue solid) bg-black/50 p-4 text-center backdrop-blur-2 md:p-16"
  >
    <h1>Dice!</h1>
    <button
      class="blink mt-4 bg-green-500 text-white"
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
  </div>
{:else}{/if}
