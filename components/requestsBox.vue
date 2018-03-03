<template>
    <div class="requests-box mk-card uk-card uk-card-default">
        <div class="uk-child-width-expand@s uk-grid" uk-grid>
            <div class="uk-width-1-3@m">
                <div class="request-details">
                    <!-- <div class="request-logo">
                        <img src="https://s3.envato.com/files/240569513/onero_icon_sale.png" alt="">
                    </div> -->
                    <div class="title">
                        <h4>{{ campaignDetails.productName }}</h4>
                        <div class="tagline">{{ campaignDetails.productTagline }}</div>
                        <!-- <div class="category">Technology</div> -->
                        <div class="uk-hidden@m desc-small">
                            <div class="time">
                                <i class="fa fa-folder"></i>
                                <span style="text-transform: capitalize">{{ campaignDetails.campaignCategory }}</span>
                            </div>
                            <div class="price-per-slot">
                                <i class="fa fa-money"></i>
                                <span>${{price}}/slot</span>
                            </div>
                            <div class="time">
                                <i class="fa fa-align-center"></i>
                                <span>{{ campaignDetails.slots }} slots</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-2@m uk-visible@m description">
                <div class="time">
                    <i class="fa fa-folder"></i>
                    <span style="text-transform: capitalize">{{ campaignDetails.campaignCategory }}</span>
                </div>
                <div class="price-per-slot">
                    <i class="fa fa-money"></i>
                    <span>${{price}}/slot</span>
                </div>
                <div class="time">
                    <i class="fa fa-align-center"></i>
                    <span>{{ campaignDetails.slots }} slots</span>
                </div>
            </div>
            <div class="width" v-if="type === 'new-request'">
                <button v-if="!accepted" :disabled="campaignDetails.slots <= 0" @click="accept" class="btn btn-small" style="float:right">
                    {{
                        campaignDetails.slots ? 'Accept' : 'Expired'
                    }}
                </button>
                <button v-if="accepted" class="btn btn-small btn-green" style="float:right">Accepted</button>
                <div class="more-details" style="float:right">Details</div>
            </div>
            <div class="width" v-if="type === 'accepted-request'" style="float:right">
                <button v-if="!accepted" @click="finish" class="btn btn-small" style="float:right">Finish</button>
                <button v-if="accepted" class="btn btn-small btn-green" style="float:right">Done</button>
                <a class="more-details" :href="`#modal-${campaign._id}`" uk-toggle style="float:right">Details</a>
            </div>
            <details-modal :campaign="campaign" />
        </div>
    </div>
</template>

<script>
import DetailsModal from '~/components/detailsModal.vue'
export default {
  props: ['campaign', 'type'],
  components: {
    DetailsModal
  },
  data () {
    return {
      accepted: false
    }
  },
  computed: {
    campaignDetails () {
      if (this.campaign) {
        return this.campaign.campaignDetails
      }
      return {}
    },
    price () {
      const amount = this.campaign.campaignDetails.campaignPricing.value.price
      const slots = this.campaign.campaignDetails.campaignPricing.value.slots
      const cost = amount / slots
      const n = cost * 15
      const commission = n / 100
      return cost - commission
    }
  },
  mounted () {
    const self = this
    this.$socket.on(`request-success-${this.$auth.state.user._id}-${this.campaign._id}`, (val) => {
      if (val.status) {
        self.accepted = true
        return
      }
      self.accepted = false
    })
  },
  methods: {
    accept () {
      const data = {
        userId: this.$auth.state.user._id,
        campaignId: this.campaign._id
      }
      console.log(this.$socket, 'data')
      this.$socket.emit('acceptRequest', data)
    },
    finish () {
       
    }
  }
}
</script>

<style>

</style>
