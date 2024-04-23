<script>
  import { BgImg } from '$lib'
  import newvegas from '$lib/assets/newvegas.jpg?enhanced&brightness=.69&saturation=3'
</script>

<svelte:head>
  <title>WIN WITH GACHAMP!</title>
</svelte:head>

<header class="screen flex">
  <BgImg alt="new vegas" src={newvegas} />
  <div
    class="nox m-auto max-w-[65ch] w-full border-(3 purple solid) bg-black/20 p-4 text-center backdrop-blur-2 md:p-16"
  >
    <h1>
      <em>Double</em> your <em>life savings</em> with
      <em class="text-[2em]">GACHAMP</em>!!!
    </h1>
    <hr />
    <h2>
      The <em>premier</em> platform for <em>winning big</em> and
      <em>getting rich quick</em>!!!
    </h2>
    <hr />
    <p>
      <a href="play">
        <button class="blink bg-green-500 text-red-600">START WINNING!</button>
      </a>
    </p>
  </div>
</header>

<style>
  :root {
    @apply lt-md-text-[3vw];
  }

  :is(h1, h2, h3) em {
    @apply font-big1 font-not-italic text-red-600 text-stroked-yellow;
  }
</style>
