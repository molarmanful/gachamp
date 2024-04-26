<script>
  import { onMount } from 'svelte'

  import { BgImg, commaNum, msToMin, user } from '..'

  import { HUD } from '.'

  import casino from '$lib/assets/casino.webp?enhanced'

  onMount(() => {
    if ($user.time == void 0) $user.started = 1
  })
</script>

<HUD />
<BgImg alt="casino" src={casino} />
<div
  class="nox m-auto max-full w-prose flex flex-col border-(3 pink solid) bg-black/50 p-4 text-center backdrop-blur-2 md:p-16"
>
  <h1>Welcome to <em>GACHAMP</em>, <em>{$user.name}</em>!</h1>
  <p>
    You have <strong class="text-green">${commaNum($user.money)}</strong>.
    {#if $user.won}
      You are currently debt-free, but bigger wins await! Keep gambling.
    {:else}
      You have <strong class="text-red">${commaNum($user.debt)}</strong> of debt
      to pay off in <strong class="text-red">{msToMin($user.time)}</strong>.
      What will you do?
    {/if}
  </p>

  <div class="my-4 flex flex-(wrap justify-center) gap-4 overflow-auto py-4">
    <button
      class="blink bg-yellow-500 text-black"
      on:click={() => {
        $user.dice = 1
      }}
    >
      Dice!
    </button>
    <button class="blink bg-yellow-500 text-black">Coin Flip!</button>
    <button
      class="blink bg-green-500 text-white"
      on:click={() => {
        $user.rroul = {}
      }}
    >
      Russian Roulette!
    </button>
    <button
      class="blink bg-green-500 text-white"
      on:click={() => {
        $user.shark = 1
      }}
    >
      Loan Shark!
    </button>
    {#if $user.debt > 0}
      <button
        class="hovglow bg-yellow-500 text-black"
        on:click={() => {
          $user.modal = 'debt'
        }}
      >
        Pay Debt
      </button>
    {/if}
    <button
      class="hovglow bg-red-500 text-white"
      on:click={() => {
        if ($user.debt > 0) {
          if ($user.debt > $user.money) {
            if (
              !confirm(
                `Are you sure you want to leave? You still have unpaid debts!`
              )
            )
              return
          } else {
            $user.money = BigInt($user.money) - BigInt($user.debt) + ''
            $user.debt = '0'
          }
        }
        $user.over = 1
      }}
    >
      Leave :(
    </button>
  </div>
</div>

<style>
  button {
    @apply text-[1rem] p-2;
  }
</style>
