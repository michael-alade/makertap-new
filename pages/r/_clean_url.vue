<template>
  <div>Redirecting, please wait..</div>
</template>
<script>
export default {
  asyncData ({ app, params }) {
    const shortUrl = params.clean_url
    return app.$axios.get(`/api/campaign/r/${shortUrl}`)
      .then(res => {
        const campaignDetails = res.data.campaign.campaignDetails
        return { campaignDetails }
      })

  },
  data () {
    return {
      campaignDetails: null
    }
  },
  head () {
    return {
      title: `${this.campaignDetails.productName} - Makertap`,
      meta: [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${this.campaignDetails.productName}` },
        { name: 'twitter:description', content: `${this.campaignDetails.productTagline}: ${this.campaignDetails.productDescription}` },
        { name: 'twitter:image:src', content: this.campaignDetails.productCoverPhoto },
        { name: 'twitter:site', content: '@makertap' }
      ]
    }
  },
  mounted () {
    const shortUrl = this.$route.params.clean_url
    return this.$axios.get(`/api/campaign/r/${shortUrl}/?clicked=yes`)
      .then(res => {
        const campaignDetails = res.data.campaign.campaignDetails
        window.location.replace(this.campaignDetails.productWebsite)
      })
  }
}
</script>

