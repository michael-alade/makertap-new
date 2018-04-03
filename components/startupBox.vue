<template>
    <div class="startup-box">
        <div class="startup-logo">
            <img :src="details.productThumbnail || 'https://ph-files.imgix.net/6e4fe6f7-38d0-4050-bf3c-2cb8fcedaed5?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop'"/>
        </div>
        <div class="startup-details">
            <div class="status red" v-show="details && details.spots <= 0">Ended</div>
            <div class="status blue" v-show="details && details.spots > 0">$5 per share</div>
            <div class="startup-name">
                <span>{{ details.productName || 'loading...' }}</span>
            </div>
            <div class="startup-tagline">
                <span>{{ details.productTagline || 'loading...' }}</span>
            </div>
            <div class="full">
                <div class="startup-categories">
                    <span class="category">{{ details.campaignCategory || 'loading...' }}</span>
                    <!-- <span class="remaning-category">+ 1</span> -->
                </div>
                <div class="actions">
                    <div class="get-it"><a href="#">Get It</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    details () {
      if (this.product && this.product.campaignDetails) {
        return this.product.campaignDetails
      }
      return {}
    }
  }
}
</script>

<style>

</style>
