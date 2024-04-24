<script>
  import { user } from '..'
</script>

<div class="m-auto text-center">
  {#if $user.dead}
    <p>You die.</p>
  {:else if $user.over}
    <p>The House wins.</p>
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
