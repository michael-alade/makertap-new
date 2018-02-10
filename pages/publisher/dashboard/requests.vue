<template>
    <div class="dashboard-main"  :style="{ 'height': requests.length > 8 ? '100%' : '100vh' }">
        <div class="uk-container">
            <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                <li>
                    <a href="#">New requests</a>
                </li>
                <li>
                    <a href="#">Accepted requests</a>
                </li>
            </ul>
            <ul class="uk-switcher uk-margin">
                <li>
                    <div class="">
                        <div class="body">
                            <request-box class="uk-margin" v-for="i in requests" :key="i"/>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import RequestBox from '~/components/requestsBox.vue'

export default {
  layout: 'dashboard',
  middleware: ['auth'],
  components: {
    RequestBox
  },
  head: {
    title: 'Requests | Makertap'
  },
  data () {
    return {
      requests: [4, 5, 6, 7, 3, 6,7,8,4,5,34,4]
    }
  }
}
</script>

<style>

</style>
