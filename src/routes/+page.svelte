<script>
</script>

<svelte:head>
  <title>WIN WITH GACHAMP!</title>
</svelte:head>

<header class="screen flex">
  <enhanced:img
    class="absolute inset-0 z--10 full object-fill"
    alt="new vegas"
    src="../../static/newvegas.jpg?brightness=.69&saturation=3"
  />
  <div
    class="nox m-auto max-w-[80ch] w-full border-(3 purple solid) bg-black/50 p-16 text-center"
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
      <a href="/play">
        <button class="blink bg-green-500 text-red-600">START WINNING!</button>
      </a>
    </p>
  </div>
</header>

<style>
  .nox {
    box-shadow:
      -3px -3px yellow,
      -3px 3px yellow,
      3px -3px yellow,
      3px 3px yellow,
      -6px -6px cyan,
      -6px 6px cyan,
      6px -6px cyan,
      6px 6px cyan;
  }

  .blink {
    animation: blink 0.5s infinite steps(1);
  }

  @keyframes blink {
    0%,
    100% {
      box-shadow: 0 0 0 yellow;
    }
    50% {
      box-shadow: 0 0 15px yellow;
    }
  }

  :is(h1, h2, h3) em {
    @apply font-big1 font-not-italic text-red-600 text-stroked-yellow;
  }
</style>
