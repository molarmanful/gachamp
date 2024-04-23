<script>
  import { onMount } from 'svelte'

  import { user } from '$lib'
  import { Home, Signup } from '$lib/game'

  let loaded = false

  onMount(() => {
    loaded = true
  })
</script>

<svelte:head>
  <title>{'GACHAMP! '.repeat(50)}</title>
</svelte:head>

<div
  class="{loaded ? 'opacity-100' : 'opacity-0'} flex screen transition-opacity"
>
  {#if !$user.name}
    <Signup />
  {:else}
    <Home />
  {/if}
</div>
