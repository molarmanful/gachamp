<script>
  import { BgImg, Input, user } from '..'

  import gambling_group from '$lib/assets/gambling_group.jpg?enhanced&brightness=.69&saturation=2'

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
</script>

<BgImg alt="group of people gambling" src={gambling_group} />
<div class="nox bgblur m-auto border-(3 red solid) p-4 md:p-16">
  <form
    class="flex flex-(col) gap-4"
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
        name="name"
        err={signup.name.err}
        placeholder="Name..."
        type="text"
        bind:el={signup.name.el}
      />
    </label>
    <label>
      Birthdate:
      <Input
        name="bdate"
        err={signup.name.err}
        max={new Date().toISOString().split('T')[0]}
        min="1900-01-01"
        placeholder="YYYY-MM-DD"
        type="date"
        bind:el={signup.bdate.el}
      />
    </label>
    <button class="bg-yellow text-green-600">Start!</button>
  </form>
</div>
