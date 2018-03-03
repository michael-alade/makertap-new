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
                <!-- <div class="uk-modal-header">
                    Hello
                </div>
                <div class="uk-modal-body">
                    
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <a href="#modal-group-2" class="uk-button uk-button-primary" uk-toggle>Next</a>
                </div> -->
            </div>
        </div>
        <div id="tweet-product" uk-modal="bg-close: false">
            <div class="uk-modal-dialog">
                <div v-if="user.twitterDetails.profile.followers_count >= 60" class="uk-modal-header">
                    <h5>Tweet for a cup of coffee ☕</h5>
                </div>
                <div class="uk-modal-body">
                    <div v-if="user.twitterDetails.profile.followers_count >= 60" class="uk-flex">
                        <div>
                            <img class="twitter-user" :src="user.twitterDetails.profile.profile_image_url"/>
                        </div>
                        <div style="flex: 1; padding-top: 10px">
                            <textarea placeholder="Write positive review about this product." v-model="tweet" maxlength="140" class="uk-textarea"></textarea>
                        </div>
                    </div>
                    <div style="padding: 20px" v-if="user.twitterDetails.profile.followers_count < 60" class="uk-text-center">
                        You need to have a follower count of at least 6000
                    </div>
                </div>
                <div v-if="user.twitterDetails.profile.followers_count >= 60" class="uk-modal-footer uk-text-right">
                    <span style="margin-right: 10px;">{{140 - tweet.length}} left</span>
                    <a href="#product-modal" class="uk-button uk-button-default uk-modal-close" type="button" uk-toggle>Cancel</a>
                    <button style="background:#00aced;" class="uk-button uk-button-primary">Tweet</button>
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
      tweet: ''
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
