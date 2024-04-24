<script>
  import { user } from '..'
  let value = 0
</script>

<div class="text-center">
  <h1>Pay Debt</h1>
  <form
    class="flex flex-col gap-4"
    on:submit={e => {
      e.preventDefault()
      $user.money = BigInt($user.money) - BigInt(value) + ''
      $user.debt = BigInt($user.debt) - BigInt(value) + ''
      $user.modal = ''
    }}
  >
    <label>
      ${value}
      <br />
      <input
        max={Math.min($user.money, $user.debt)}
        min="0"
        type="range"
        bind:value
      />
    </label>
    <button class="hovglow bg-yellow">Pay</button>
  </form>
</div>
