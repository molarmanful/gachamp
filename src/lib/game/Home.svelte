<script>
  import { getAge, user } from '..'
</script>

<h1>Hi {$user.name}</h1>
<ul>
  <li>Age: {getAge($user.bdate)}</li>
  <li>Balance: ${$user.money}</li>
</ul>
<button
  on:click={() => {
    $user = {}
  }}>clear</button
>
