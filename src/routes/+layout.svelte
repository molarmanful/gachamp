<script>
  import '@unocss/reset/sanitize/sanitize.css'
  import '@unocss/reset/sanitize/assets.css'
  import 'uno.css'
</script>

<slot />

<style>
  :root {
    @apply bg-black text-white;
  }

  :global(h1, h2, h3) {
    @apply font-big;
  }
</style>
