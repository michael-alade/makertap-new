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
                            <request-box type="new-request" class="uk-margin" :campaign="campaign" v-for="campaign in requests" :key="campaign._id"/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="">
                        <div class="body">
                            <request-box class="uk-margin" type="accepted-request" :campaign="accepted" v-for="accepted in acceptedRequests" :key="accepted._id"/>
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
  async asyncData ({ app }) {
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer')
    const { data } = await app.$axios.get('/api/campaign/paid/requests')
    const res = await app.$axios.get('/api/campaign/accepted/requests')
    return { requests: data.campaigns, acceptedRequests: res.data.campaigns }
  },
  data () {
    return {
      requests: []
    }
  },
  mounted () {
    const self = this
    // this.$socket.on('new-request', (payload) => {
    //   const checkData = self.requests.find((request) => {
    //     return request._id === payload._id
    //   })
    //   if (!checkData) {
    //     self.requests.push(payload)
    //   }
    // })
    this.$socket.on('request-refresh', () => {
      const token = this.$auth.token
      self.$axios.setToken(token, 'Bearer')
      self.$axios.get('/api/campaign/paid/requests')
        .then(({ data }) => {
          self.requests = data.campaigns
        })
      return self.$axios.get('/api/campaign/accepted/requests')
        .then(({ data }) => {
          self.acceptedRequests = data.campaigns
        })
    })
  },
}
</script>

<style>

</style>
