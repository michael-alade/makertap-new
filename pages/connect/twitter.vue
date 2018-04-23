<template>
    <section id="login">
        <div class="uk-container authentication">
           <connect-twitter />
        </div>
    </section>
</template>

<script>
import connectTwitter from "~/components/connectTwitter";
export default {
  asyncData ({ app, redirect }) {
    if (app.$auth.state.user.twitterDetails) {
      return redirect(302, '/')
    }
  },
  middleware: ['auth'],
  components: {
    connectTwitter
  },
  head: {
    title: 'Connect Twitter account'
  }
}
</script>

<style>

</style>
