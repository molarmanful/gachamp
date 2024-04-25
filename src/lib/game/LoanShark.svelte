<script>
  import { BgImg, commaNum, user } from '..'

  import { HUD } from '.'

  import loanshark from '$lib/assets/loanshark.jpg?enhanced'

  let value = 1e6
</script>

<HUD />
<BgImg alt="loan shark" src={loanshark} />
<div
  class="nox m-auto max-w-prose w-full border-(3 red solid) bg-black/70 p-4 text-center backdrop-blur-2 md:p-16"
>
  <h1>Loan Shark!</h1>
  <p>
    Short on cash? Bank can't accept your pitiful credit score? Well you're in
    luck! Our in-house <strong>loan shark</strong> can give you just the thing you
    need to get right back on your feet!
  </p>
  <p>At only 5 points, you'd be foolish not to take this wonderful deal!</p>

  <form
    class="flex flex-col gap-4"
    method="post"
    on:submit={e => {
      e.preventDefault()
      $user.money = BigInt($user.money) + BigInt(value) + ''
      $user.debt = BigInt($user.debt) + BigInt(value) + ''
      if (!$user.loan)
        $user.loan = {
          time: Date.now(),
          value: value + '',
          int: 0,
        }
      else $user.loan.value = BigInt($user.loan.value) + BigInt(value) + ''
      $user.shark = 0
    }}
  >
    <label>
      ${commaNum(value)}
      <br />
      <input
        class="cursor-pointer"
        max="1000000"
        min="1000"
        step="100"
        type="range"
        bind:value
      />
    </label>
    <button class="blink bg-green-500 text-white">Get Free Cash!!!</button>
    <button
      class="hovglow bg-red-500 text-white"
      on:click={() => {
        $user.shark = 0
      }}
    >
      Leave
    </button>
  </form>

  <p class="text-([.1rem] gray-500)">
    By accepting this loan, you agree - in the potential event that you are
    unable to repay this loan and/or its interest - to forfeit the entirety of
    your physical existence as collateral.
  </p>
</div>
