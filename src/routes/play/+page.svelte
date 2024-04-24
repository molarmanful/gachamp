<script>
  import { onMount } from 'svelte'

  import { user } from '$lib'
  import { Dead, EULA, Home, LoanShark, RRoul, Signup, Won } from '$lib/game'

  let loaded = false

  $: if ($user.debt <= 0) {
    $user.money = BigInt($user.money) - BigInt($user.debt) + ''
    $user.debt = '0'
    $user.time = 6e5
    $user.won = 1
  }

  onMount(() => {
    $user.modal = ''

    if ($user.over && $user.won) $user.over = 0

    requestAnimationFrame(() => {
      loaded = true

      let t0 = Date.now()
      setInterval(() => {
        if ($user.started && !$user.won) {
          if ($user.time == void 0) {
            $user.time = 6e5
            t0 = Date.now()
          } else if ($user.time > 0) {
            let t1 = Date.now()
            $user.time -= t1 - t0
            t0 = t1
          } else if (BigInt($user.debt) > BigInt($user.money)) {
            $user.over = 1
          } else {
            $user.money = BigInt($user.money) - BigInt($user.debt) + ''
            $user.debt = '0'
            $user.time = 6e5
            $user.won = 1
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
  {:else if $user.dead}
    <Dead />
  {:else if $user.over}
    {#if $user.won}
      <Won />
    {:else}
      <Dead />
    {/if}
  {:else if $user.rroul}
    <RRoul />
  {:else if $user.shark}
    <LoanShark />
  {:else}
    <Home />
  {/if}
</div>
