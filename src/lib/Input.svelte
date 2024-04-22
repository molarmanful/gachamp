<script>
  export let el, err
</script>

<input
  bind:this={el}
  on:input={() => {
    el.setCustomValidity(err(el.value))
    el.reportValidity()
  }}
  {...$$restProps}
/>
