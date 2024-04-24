<script>
  import { commaNum, getAge, msToMin, user } from '..'

  import { PayDebt } from '.'
</script>

<div class="nox fixed right-2 top-2 z-10 bg-black/50 p-4 backdrop-blur-2">
  <ul class="list-none pl-0">
    <li><strong>{$user.name}</strong>, age {getAge($user.bdate)}</li>
    <li>
      Money{'\t'}<strong class="text-green">${commaNum($user.money)}</strong>
    </li>
    <li>Debt{'\t'}<strong class="text-red">${commaNum($user.debt)}</strong></li>
    <li>Time{'\t'}<strong class="text-red">{msToMin($user.time)}</strong></li>
  </ul>
</div>

{#if $user.modal}
  <div class="fixed inset-0 z-20 flex bg-black/50">
    <button
      class="absolute inset-0 z--10 screen border-none opacity-0"
      on:click={() => {
        $user.modal = ''
      }}
    >
      Close
    </button>
    <div class="nox m-auto bg-purple-900 p-4 md:p-8">
      {#if $user.modal == 'debt'}
        <PayDebt />
      {/if}
    </div>
  </div>
{/if}

<style>
  li {
    @apply whitespace-pre;
  }
</style>
