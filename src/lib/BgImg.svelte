<script>
  export let src
  let clazz = ''
  export { clazz as class }
</script>

<enhanced:img
  class="absolute inset-0 z--10 full object-cover{clazz}"
  {src}
  {...$$restProps}
/>
