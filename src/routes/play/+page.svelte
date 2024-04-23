<script>
  import { Input, user } from '$lib'
  import { Home } from '$lib/game'
  import { onMount } from 'svelte'

  const signup = {
    name: {
      err: s =>
        s.length < 1
          ? 'Name required!'
          : s.length > 32
            ? 'Name should be <32 characters!'
            : '',
    },
    bdate: {
      err: s => (isNaN(new Date(s).getTime()) ? 'Date required!' : ''),
    },
  }

  let loaded = false

  onMount(() => {
    loaded = true
  })
</script>

<div
  class="{loaded ? 'opacity-100' : 'opacity-0'} flex screen transition-opacity"
>
  <div class="m-auto">
    {#if $user.name}
      <Home />
    {:else}
      <form
        class="flex-(~ col) gap-4"
        on:submit={e => {
          e.preventDefault()
          let pass = true
          for (const { el, err } of Object.values(signup)) {
            if (err(el.value)) {
              pass = false
              el.setCustomValidity(err(el.value))
              el.reportValidity()
            }
          }
          if (pass) {
            $user.name = signup.name.el.value
            $user.bdate = signup.bdate.el.value
            $user.money = 0 | (Math.random() * 1e5 + 10)
          }
        }}
      >
        <label>
          Name:
          <Input
            bind:el={signup.name.el}
            name="name"
            placeholder="Name..."
            type="text"
            err={signup.name.err}
          />
        </label>
        <label>
          Birthdate:
          <Input
            bind:el={signup.bdate.el}
            name="bdate"
            max={new Date().toISOString().split('T')[0]}
            min="1900-01-01"
            placeholder="YYYY-MM-DD"
            type="date"
            err={signup.name.err}
          />
        </label>
        <button>Start!</button>
      </form>
    {/if}
  </div>
</div>
