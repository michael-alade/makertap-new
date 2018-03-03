<template>
    <section id="new-campaign">
        <div class="uk-container">
            <div class="header">
                <div>
                    <h3 class="title uk-text-center">{{ campaign.title }}</h3>
                    <div class="subtitle uk-text-center">Please fill all the fields to get the most out of this campaign</div>
                </div>
                <span @click="$router.go(-1)" uk-icon="icon: arrow-left; ratio: 2"></span>
            </div>
            <div class="body">
              <!-- <form> -->
                <div class="form-box">
                    <div class="uk-margin">
                        <label class="uk-form-label">Product thumbnail</label>
                        <div class="subtitle">Upload a cool product thumbnail</div>
                        <div class="channel-picture-box">
                            <input required type="file" hidden @change="setTempThumbnail" ref="uploadPicture">
                            <div v-if="!loadingThumbnail" @click="getPicture" class="channel-picture uk-cover-container">
                                <img v-if="!tempImgUrl" uk-cover src="/img/Placeholder.png"/>
                                <img v-if="tempImgUrl" uk-cover :src="tempImgUrl"/>
                                <div class="overlay">
                                    <span>Upload</span>
                                </div>
                            </div>
                            <div v-if="loadingThumbnail" @click="getPicture" class="channel-picture uk-cover-container">
                                <div uk-spinner></div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-name">Product name</label>
                        <div class="uk-form-controls">
                            <input type="text" required v-model="form.productName" class="uk-input" id="product-name" maxlength="20" placeholder='For example: Mastercard' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-tagline">Product tagline</label>
                        <div class="uk-form-controls">
                            <input type="text" required v-model="form.productTagline" class="uk-input" id="product-tagline" maxlength="50" placeholder='e.g The best credit card provider' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-website">Product website</label>
                        <div class="uk-form-controls">
                            <input type="text" required v-model="form.productWebsite" class="uk-input" id="product-website" maxlength="50" placeholder='https://example.com' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Product Cover Photo</label>
                        <div class="subtitle">Upload a cool product cover picture</div>
                        <div class="channel-picture-box">
                            <input required type="file" hidden @change="setTempCoverPhoto" ref="uploadCoverPicture">
                            <div v-if="!loadingCoverPhoto" @click="getCoverPicture" style="width: 472px; height:314px" class="channel-picture uk-cover-container">
                                <img v-if="!tempCoverPhotoImgUrl" uk-cover src="/img/Placeholder.png"/>
                                <img v-if="tempCoverPhotoImgUrl" uk-cover :src="tempCoverPhotoImgUrl"/>
                                <div class="overlay">
                                    <span>Upload cover picture</span>
                                </div>
                            </div>
                            <div v-if="loadingCoverPhoto" @click="getPicture" class="channel-picture uk-cover-container">
                                <div uk-spinner></div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Select category</label>
                        <div class="uk-grid-small uk-grid categories" uk-grid>
                            <div v-for="category in categories" :key="category.name" class="uk-width-1-4@m uk-width-1-2">
                                <div @click="selectCategory(category.name)" class="category" :class="{ 'selected': selectedCategory === category.name.toLowerCase() }">
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-website">Product Description</label>
                        <div class="subtitle">This would give more clarity about your product to writers</div>
                        <div class="uk-form-controls">
                            <textarea v-model="form.productDescription" class="uk-textarea"></textarea>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">How many influencers do you need?</label>
                        <div class="subtitle">A service fee of $15 is charged during payment</div>
                        <range-slider
                          class="slider"
                          min="1"
                          max="1000"
                          step="10"
                          v-model="sliderValue">
                        </range-slider>
                        <b>{{ sliderValue }} influencers</b>
                        <!-- <div class="uk-grid-small categories uk-grid" uk-grid>
                            <div v-for="price in pricing" :key="price.value.price" class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div @click="selectPricing(price)" class="category" :class="{ 'selected': selectedPricing.value.price === price.value.price }" v-bind:uk-tooltip="`title: Estimated reach: ${price.value.reach}`">
                                    {{ price.name }}
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="uk-margin">
                      
                    </div>
                    <div class="uk-margin">
                        <no-ssr>
                          <vue-rave-pay
                              class="btn"
                              type="submit"
                              :is-production="false"
                              :text="`$${sliderValue * 5} ${raveBtnText}`"
                              style-class="paymentbtn"
                              :email="email"
                              :amount="(sliderValue * 5) + 15"
                              :reference="$route.params.id"
                              :rave-key="raveKey"
                              :callback="callback"
                              :close="close"
                              currency="USD"
                          />
                        </no-ssr>
                        <!-- <button type="submit" class="btn">Publish</button> -->
                    </div>
                </div>
                <!-- </form> -->
            </div>
        </div>
    </section>
</template>

<script>
import VueRavePay from 'vue-ravepayment'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
export default {
  components: {
    VueRavePay,
    RangeSlider
  },
  head () {
    return {
      title: `Edit | ${this.campaign.title}`
    }
  },
  asyncData ({ app, params, redirect }) {
    if (!app.$auth.hasScope('sponsor')) {
      return redirect(302, '/publisher/dashboard/requests')
    }
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer', ['get'])
    return app.$axios.get(`/api/campaign/${params.id}`)
     .then(res => {
       const { data } = res
       if (data.campaign.status === 'paid') {
         return redirect(302, `/sponsor/campaign/${data.campaign._id}`)
       }
       return { campaign: data.campaign }
     })
     .catch(err => {
        redirect(302, '/sponsor/campaign')
     })
  },
  data () {
    return {
      tempCoverPhotoImgUrl: null,
      loadingCoverPhoto: null,
      tempImgUrl: null,
      loadingThumbnail: null,
      sliderValue: 20,
      selectedCategory: '',
      raveBtnText: "Publish",
      raveKey: "FLWPUBK-e6b3ce4d58052879aac69887be9d4ef0-X",
      email: "foobar@example.com",
      amount: 10000,
      paymentDisabled: true,
      selectedPricing: {
        name: '',
        value: {
          price: 0,
          reach: '',
          slots: ''
        }
      },
      form: {
        productName: '',
        productTagline: '',
        productThumbnail: '',
        productCoverPhoto: '',
        productWebsite: '',
        productDescription: '',
        campaignCategory: '',
        campaignPrice: 0,
        spots: 0,
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      },
      categories: [
        {
          name: 'Creativity',
        },
        {
          name: 'Technology'
        },
        {
          name: 'Sports'
        },
        {
          name: 'Education'
        },
        {
          name: 'Cryptocurrency'
        },
        {
          name: 'Travel'
        },
        {
          name: 'Finance'
        },
        {
          name: 'Fashion'
        }
      ]
    }
  },
  watch: {
    sliderValue (val) {
      this.form.spots = val
      this.form.campaignPrice = val * 5
    }
  },
  methods: {
    onPaymentSuccess (data) {
      const self = this
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer', ['post'])
      return this.$axios
        .post(`/api/campaign/payment-verify/${this.$route.params.id}`, data)
        .then(res => {
          window.location.href = `/sponsor/campaign/${self.$route.params.id}`
        })
    },
    callback (response) {
      if (response.respcode === '00') {
        const data = Object.assign({},
          this.form, { transactions: [response] }
        )
        return this.onPaymentSuccess(data)
      }
    },
    close () {
      console.log("Payment closed")
    },
    selectCategory (name) {
      this.selectedCategory = name.toLowerCase()
      this.form.campaignCategory = name.toLowerCase()
    },
    selectPricing (price) {
      this.paymentDisabled = false
      this.form.campaignPricing = price
      this.form.slots = price.value.slots
      this.selectedPricing = price
    },
    getPicture () {
      this.$refs.uploadPicture.click()
    },
    getCoverPicture () {
      this.$refs.uploadCoverPicture.click()
    },
    setTempThumbnail () {
      const self = this
      const reader = new window.FileReader()
      const blob = this.$refs.uploadPicture.files[0]
      // this.form.channelPicture = blob
      if (blob) {
        reader.onload = (e) => {
          self.loadingThumbnail = true
          return this.uploadImage(reader.result, {
            width: 85,
            height: 85,
            crop: 'fill'
          }, 'productThumbnail', this.$route.params.id)
          .then(res => {
            self.loadingThumbnail = false
            self.tempImgUrl = res.url
            self.form.productThumbnail = res.url
          }).catch(err => {
            self.tempImgUrl = null
            self.loadingThumbnail = false
          })
        }
        reader.readAsDataURL(blob)
      }
    },
    setTempCoverPhoto () {
      const self = this
      const reader = new window.FileReader()
      const blob = this.$refs.uploadCoverPicture.files[0]
      if (blob) {
        reader.onload = (e) => {
          self.loadingCoverPhoto = true
          return this.uploadImage(reader.result, {
            width: 472,
            height: 314,
            crop: 'fit'
          }, 'productThumbnail', this.$route.params.id)
          .then(res => {
            self.loadingCoverPhoto = false
            self.tempCoverPhotoImgUrl = res.url
            self.form.productCoverPhoto = res.url
          }).catch(err => {
            self.tempCoverPhotoImgUrl = null
            self.loadingCoverPhoto = false
          })
        }
        reader.readAsDataURL(blob)
      }
    },
    async uploadImage (image, options, formField, campaignId) {
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer', ['post'])
      const { data } = await this.$axios.post(`/api/campaign/upload-image/${campaignId}`, {
        image,
        options,
        formField
      })
      return { url: data.url }
    }
  }
}
</script>

<style>
  .slider {
    width: 100%;
  }
</style>
