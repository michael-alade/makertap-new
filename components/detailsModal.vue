<template>
    <div :id="`modal-${campaign._id}`" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                {{ campaignDetails.productName }}
            </div>
            <div class="uk-modal-body">
                <div class="uk-grid" uk-grid>
                    <div class="uk-width-1-2@m">
                        <label class="uk-form-label"><b>Product Name</b></label>
                        <div>{{ campaignDetails.productName }}</div>
                    </div>
                    <div class="uk-width-1-2@m">
                        <label class="uk-form-label"><b>Product Tagline</b></label>
                        <div>{{ campaignDetails.productTagline }}</div>
                    </div>
                    <div class="uk-width-1-2@m"></div>
                    <div class="uk-width-1-2@m"></div>
                </div>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                <a href="#modal-group-2" class="uk-button uk-button-primary" uk-toggle>Next</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['campaign'],
  computed: {
    campaignDetails () {
      return this.campaign.campaignDetails
    }
  }
}
</script>

<style>

</style>
