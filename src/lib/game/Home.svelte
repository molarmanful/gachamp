<script>
  import { getAge, user } from '..'
</script>

<div class="m-auto mix-blend-exclusion">
  <h1>Hi {$user.name}</h1>
  <ul>
    <li>Age: {getAge($user.bdate)}</li>
    <li>Balance: ${$user.money}</li>
  </ul>
  <button
    on:click={() => {
      $user = {}
    }}
  >
    Clear
  </button>
</div>
