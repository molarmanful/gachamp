<script>
  import { BgImg, user } from '..'

  import casino_night from '$lib/assets/casino_night.jpg?enhanced&brightness=.69&saturation=2'
</script>

<BgImg alt="casino at night" src={casino_night} />

<div
  class="nox m-auto max-w-prose w-full bg-black/20 p-4 text-center backdrop-blur-2 md:p-16"
>
  <h1>Thank you for playing at <em>GACHAMP</em>!</h1>
  <h2>You are welcome back anytime.</h2>
  <div class="flex flex-(wrap justify-center) gap-4">
    <button
      class="blink bg-green-500 text-white"
      on:click={() => {
        $user.over = 0
      }}
    >
      Go Back to GACHAMP
    </button>
    <button
      class="hovglow bg-red-500 text-white"
      on:click={() => {
        $user = {}
      }}
    >
      New Character
    </button>
  </div>
</div>
