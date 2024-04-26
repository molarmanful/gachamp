<script>
  import { user } from '..'
</script>

<div class="m-auto text-center">
  {#if $user.dead}
    <p>You die.</p>
  {:else if $user.over}
    <p>The House wins.</p>
    <p>
      Unable to pay off your debts, you attempt to flee the premises. As you
      make your way to the doors, however, two burly security guards materialize
      on your left and right. They drag you down a side corridor, and your fate
      is left unknown.
    </p>
  {/if}
  <button
    class="no"
    on:click={() => {
      $user = {}
    }}
  >
    New Character
  </button>
</div>
