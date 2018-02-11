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
                <div class="form-box">
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-name">Product name</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productName" class="uk-input" id="product-name" maxlength="20" placeholder='For example: Mastercard' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-tagline">Product tagline</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productTagline" class="uk-input" id="product-tagline" maxlength="50" placeholder='e.g The best credit card provider' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-website">Product website</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productWebsite" class="uk-input" id="product-website" maxlength="50" placeholder='https://example.com' />
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
                            <div class="quill-editor" 
                                :content="form.productDescription"
                                @change="onEditorChange($event)"
                                v-quill:myQuillEditor="editorOption">
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Select pricing</label>
                        <div class="subtitle">A service fee of $10 is charged during payment</div>
                        <div class="uk-grid-small categories uk-grid" uk-grid>
                            <div v-for="price in pricing" :key="price.value.price" class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div @click="selectPricing(price)" class="category" :class="{ 'selected': selectedPricing.value.price === price.value.price }" v-bind:uk-tooltip="`title: Estimated reach: ${price.value.reach}`">
                                    {{ price.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Cover photo</label>
                        <div class="subtitle">Upload a cool cover photo with 170 * 80 in size</div>
                        <div class="uk-placeholder cover-photo">
                            <span uk-icon="icon: cloud-upload"></span>
                            <span class="uk-text-middle">Attach binaries by dropping them here or</span>
                            <div uk-form-custom>
                                <input type="file" multiple>
                                <span class="uk-link">selecting one</span>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <no-ssr>
                        <vue-rave-pay
                            class="btn"
                            :disabled="paymentDisabled"
                            :is-production="false"
                            :text="raveBtnText"
                            style-class="paymentbtn"
                            :email="email"
                            :amount="selectedPricing.value.price + 6"
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
            </div>
        </div>
    </section>
</template>

<script>
import VueRavePay from 'vue-ravepayment'
export default {
  components: {
    VueRavePay
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
       return { campaign: data.campaign }
     })
     .catch(err => {
        redirect(302, '/sponsor/campaign')
     })
  },
  data () {
    return {
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
        productWebsite: '',
        productDescription: "<p><strong style=\"color: rgb(34, 34, 34);\">A headline for your release</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Discuss the larger mission of your product, i.e. what it does and what it is for. Include a date and location at the very beginning.</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">What are the specifics of your product / announcement.</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">A quote from your CEO or a business co-founder explaining the announcement. This means that journalists won’t have to waste their time – or your company’s time – finding quotes for the article.</strong></p><p>Your answer here</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Bring in trends to explain why this product is relevant to the larger industry / community that your business is a part of. Ideally this will include at least one data point (ex: how large the industry is)</strong></p><p>Your answer here</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Wrap up with a final quote from CEO or founder</strong></p><p>Your answer here</p>",
        campaignCategory: '',
        campaignPricing: {},
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
      ],
      pricing: [
        {
          name: '$0 - 5 publishers',
          value: {
            price: 0,
            slots: 5,
            reach: '10,000 - 20,000'
          }
        },
        {
          name: '$600 - 5 publishers',
          value: {
            price: 600,
            slots: 5,
            reach: '10,000 - 20,000'
          }
        },
        {
          name: '$1200 - 10 publishers',
          value: {
            price: 1200,
            slots: 10,
            reach: '20,000 - 30,000'
          }
        },
        {
          name: '$1800 - 15 publishers',
          value: {
            price: 1800,
            slots: 15,
            reach: '30,000 - 40,000'
          }
        },
        {
          name: '$2400 - 20 publishers',
          value: {
            price: 2400,
            slots: 20,
            reach: '40,000'
          }
        },
      ]
    }
  },
  methods: {
    onPaymentSuccess (data) {
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer', ['post'])
      return this.$axios
        .post(`/api/campaign/payment-verify/${this.$route.params.id}`, data)
        .then(res => {
          console.log(res, 'res')
        })
    },
    callback (response) {
      if (response.respcode === '00') {
        const data = Object.assign({},
          this.form, { transactions: [response] }
        )
        console.log(data, 'data')
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
    onEditorChange({ editor, html, text }) {
      this.form.productDescription = html
    }
  }
}
</script>

<style>
</style>
