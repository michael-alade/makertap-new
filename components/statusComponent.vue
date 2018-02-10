<template>
  <div :class="`uk-alert-${status.type}`" uk-alert>
    <p>{{ status.message }}</p>
  </div>
</template>

<script>
export default {
  props: ['status']
}
</script>

<style>

</style>
