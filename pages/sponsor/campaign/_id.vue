<template>
    <section id="new-campaign">
        <div class="uk-container">
            <div class="header">
                <div>
                    <h3 style="margin: 0 0 20px 0;" class="title uk-text-center">{{ campaign.title }}</h3>
                    <!-- <div class="subtitle uk-text-center">Please fill all the fields to get the most out of this campaign</div> -->
                </div>
                <span @click="$router.push('/sponsor/campaign')" uk-icon="icon: arrow-left; ratio: 2"></span>
            </div>
            <div class="body">
                <div class="form-box">
                    <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                        <li>
                            <a href="#">Analytics</a>
                        </li>
                    </ul>
                    <ul class="uk-switcher uk-margin">
                      <li>
                        <campaign-analytics :campaign="campaign" />
                        <tweets/>
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Tweets from '~/components/tweets.vue'
import CampaignAnalytics from '~/components/campaignAnalytics.vue'
export default {
  components: {
    Tweets,
    CampaignAnalytics,
  },
  head () {
    return {
      title: `Overview | ${this.campaign.title}`
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
       if (data.campaign.status === 'new') {
         return redirect(302, `/sponsor/campaign/new/${data.campaign._id}`)
       }
       return { campaign: data.campaign }
     })
     .catch(err => {
        return redirect(302, '/sponsor/campaign')
     })
  },
  data () {
    return {
      datacollection: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      },
      articles: [1,2,3,4,5,6],
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
