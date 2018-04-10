<template>
    <div>
        <div id="product-modal" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-outside" type="button" uk-close @click="$store.dispatch('clearSelectedProduct')"></button>
                <div class="product-side">
                    <div class="product-logo">
                        <img :src="product.productThumbnail || ''"/>
                    </div>
                    <div class="actions">
                        <div class="views">
                            <span>3.3k</span>
                            <div style="display: flex; align-items:center; justify-content: center">
                                <span class="eye" uk-tooltip="title: 3.3k views">
                                    <i class="fa fa-eye"></i>
                                </span>
                            </div>
                        </div>
                        <div class="twitter-share">
                            <span class="numbers">70</span>
                            <div style="display: flex; align-items:center; justify-content: center">
                                <span uk-toggle="target: #tweet-product" class="twitter" uk-tooltip="title: 20 spots left">
                                    <i class="fa fa-twitter"></i>
                                </span>
                            </div>
                        </div>
                        <div class="get-it">
                            <!-- <span class="numbers">2.2k</span> -->
                            <a :href="product.productWebsite" target="_blank" class="get-button">WEBSITE</a>
                        </div>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-name">
                        <a href="#">{{ product.productName || 'loading...' }}</a>
                    </div>
                    <div class="product-tagline">
                        <span>{{ product.productTagline || 'loading...' }}</span>
                    </div>
                    <div class="full">
                        <div class="product-categories">
                            <span class="category">{{ product.campaignCategory || 'loading...' }}</span>
                        </div>
                        <div style="flex: 1"></div>
                    </div>
                    <div class="product-main-picture">
                        <div class="product-main-placeholder">
                            <img :src="product.productCoverPhoto"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="user.twitterDetails !== null" id="tweet-product" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <button class="uk-modal-close-outside" type="button" uk-close uk-toggle="target: #product-modal"></button>
                <div v-if="user.twitterDetails.profile.followers_count >= 6000" class="uk-modal-header">
                    <h5>Tweet for a cup of coffee ☕</h5>
                </div>
                <div class="uk-modal-body">
                    <div v-if="error.show" class="uk-alert-danger uk-alert" uk-alert>
                        <a class="uk-alert-close" uk-close></a>
                        <p>{{ error.message }}</p>
                    </div>
                    <div v-if="user.twitterDetails.profile.followers_count >= 6000" class="uk-flex">
                        <div>
                            <img class="twitter-user" :src="user.twitterDetails.profile.profile_image_url"/>
                        </div>
                        <div style="flex: 1; padding-top: 10px">
                            <textarea placeholder="Write positive review about this product." v-model="tweet" maxlength="140" class="uk-textarea"></textarea>
                        </div>
                    </div>
                    <div style="padding: 20px" v-if="user.twitterDetails.profile.followers_count < 6000" class="uk-text-center">
                        You need to have a follower count of at least 6000
                    </div>
                </div>
                <div v-if="user.twitterDetails.profile.followers_count >= 6000" class="uk-modal-footer uk-text-right">
                    <span style="margin-right: 10px;">{{140 - tweet.length}} left</span>
                    <a href="#product-modal" class="uk-button uk-button-default uk-modal-close" type="button" uk-toggle>Cancel</a>
                    <button :disabled="sending" style="background:#00aced;" @click="sendTweet" class="uk-button uk-button-primary">
                        {{ !sending ? 'Tweet' : 'Sending' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['campaign'],
  data () {
    return {
      tweet: '',
      sending: false,
      error: {
        message: '',
        show: false
      }
    }
  },
  methods: {
    sendTweet () {
      const self = this
      const data = {
        message: this.tweet,
        cleanUrl: this.$store.state.selectedProduct.cleanUrl,
        product: this.product,
        campaignId: this.$store.state.selectedProduct._id
      }
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer', ['get'])
      this.sending = true
      return this.$axios.post('/api/user/twitter/share', data)
        .then(res => {
          this.sending = false
          if (res.status === 200) {
            return setTimeout(() => {
              return window.UIkit.modal('#product-modal').show()
            }, 2000)
          }
        }).catch(err => {
          self.sending = false
          const message = err.response.data.message
          self.error = {
            show: true,
            message
          }
          return setTimeout(() => {
            return window.UIkit.modal('#product-modal').show()
          }, 2000)
        })
    }
  },
  computed: {
    campaignDetails () {
      return this.campaign.campaignDetails
    },
    product () {
      if (this.$store.state.selectedProduct) {
        return this.$store.state.selectedProduct.campaignDetails
      }
      return {}
    },
    user () {
      return this.$auth.state.user
    }
  }
}
</script>

<style>

</style>
