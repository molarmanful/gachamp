<script>
  import { onMount } from 'svelte'

  import { user } from '$lib'
  import {
    Dead,
    Dice,
    EULA,
    Home,
    LoanShark,
    RRoul,
    Signup,
    Won,
  } from '$lib/game'

  let loaded = false
  let t0 = Date.now()

  $: if ($user.debt <= 0) {
    $user.money = BigInt($user.money) - BigInt($user.debt) + ''
    $user.debt = '0'
    $user.time = 6e5
    $user.won = 1
  } else if ($user.won) {
    $user.time = 6e5
    $user.won = 0
    t0 = Date.now()
  }

  onMount(() => {
    $user.modal = ''

    if ($user.over && $user.won) $user.over = 0

    requestAnimationFrame(() => {
      loaded = true

      setInterval(() => {
        if ($user.started && !($user.won || $user.dead || $user.over)) {
          const mn = BigInt($user.money)
          const dn = BigInt($user.debt)
          if ($user.time == void 0) {
            $user.time = 6e5
            t0 = Date.now()
          } else if ($user.time > 0) {
            let t1 = Date.now()
            $user.time -= t1 - t0
            t0 = t1
            if ($user.loan && t0 - $user.loan.time >= 6e4) {
              $user.loan.int++
              const lv = BigInt($user.loan.value)
              const li = BigInt($user.loan.int)
              const d = 20n ** li
              const n = (lv * 21n ** li + d - 1n) / d - lv
              if (mn < n) {
                $user.dead = 1
                return
              }
              $user.money = mn - n + ''
              $user.loan.time += 6e4
            }
          } else if (dn > mn) {
            $user.over = 1
          } else {
            $user.money = mn - dn + ''
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
  {:else if $user.dice}
    <Dice />
  {:else}
    <Home />
  {/if}
</div>
