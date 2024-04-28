<script>
  import { commaNum, getAge, msToMin, user } from '..'

  import { LoanShark, PayDebt } from '.'

  if ($user.tog == void 0) $user.tog = true
</script>

<div
  class="nox fixed right-2 top-2 z-10 cursor-pointer bg-black/50 p-4 backdrop-blur-2"
  role="button"
  tabindex="0"
  on:click={() => {
    $user.tog = !$user.tog
  }}
  on:keyup={e => {
    if (e.key == 'Enter' || e.key == ' ') $user.tog = !$user.tog
  }}
>
  {#if $user.tog}
    <ul class="list-none pl-0">
      <li><strong>{$user.name}</strong>, age {getAge($user.bdate)}</li>
      <li>
        Money{'\t'}<strong class="text-green">${commaNum($user.money)}</strong>
      </li>
      <li>
        Debt{'\t'}<strong class="text-red">${commaNum($user.debt)}</strong>
      </li>
      <li>
        Time{'\t'}<strong class={$user.won ? 'text-green' : 'text-red'}
          >{msToMin($user.time)}</strong
        >
      </li>
    </ul>
  {:else}
    ...
  {/if}
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
      {:else if $user.modal == 'shark'}
        <LoanShark />
      {/if}
    </div>
  </div>
{/if}

<style>
  li {
    @apply whitespace-pre;
  }
</style>
