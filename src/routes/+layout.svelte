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

  :global(button) {
    @apply border-(3 solid current) font-big1 text-2xl p-7;
  }
</style>
