<script>
  import { user } from '..'
  let value = 0
</script>

<div class="text-center">
  <h1>Pay Debt</h1>
  <form
    class="flex flex-col gap-4"
    method="post"
    on:submit={e => {
      e.preventDefault()
      const mn = BigInt($user.money)
      const dn = BigInt($user.debt)
      const vn = BigInt(value)
      $user.money = mn - vn + ''
      $user.debt = dn - vn + ''
      $user.time *= 1 + Number((vn * 10000n) / dn) / 1e4
      $user.time = 0 | $user.time
      $user.modal = ''
    }}
  >
    <label>
      ${value}
      <br />
      <input
        class="cursor-pointer"
        max={Math.min($user.money, $user.debt)}
        min="0"
        type="range"
        bind:value
      />
    </label>
    <button class="hovglow bg-yellow">Pay</button>
  </form>
</div>
