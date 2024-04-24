<script>
  import { onMount } from 'svelte'

  import { user } from '$lib'
  import { Dead, EULA, Home, RRoul, Signup } from '$lib/game'

  let loaded = false

  onMount(() => {
    $user.modal = ''

    requestAnimationFrame(() => {
      loaded = true

      let t0 = Date.now()
      setInterval(() => {
        if ($user.started) {
          if ($user.time == void 0) {
            $user.time = 6e5
            t0 = Date.now()
          } else if ($user.time > 0) {
            let t1 = Date.now()
            $user.time -= t1 - t0
            t0 = t1
          } else {
            $user.over = 1
          }
        }
      })
    })
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
  {:else if !$user.eula}
    <EULA />
  {:else if $user.dead || $user.over}
    <Dead />
  {:else if $user.rroul}
    <RRoul />
  {:else}
    <Home />
  {/if}
</div>
