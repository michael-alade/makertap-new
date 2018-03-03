<template>
    <div class="publisher">
        <div class="profile-image">
          <img :src="`https://avatar.tobi.sh/${randomSvg}.svg?text=KO`">
        </div>
        <div class="profile-details">
          <div class="name">Michael Kolawole</div>
          <div class="title">Publisher</div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    randomSvg () {
      return Math.floor(Math.random()*900) + 100;
    }
  }
}
</script>

<style>

</style>
