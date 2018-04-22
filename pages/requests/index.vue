<template>
    <section class="requests">
        <div class="uk-container">
            <div class="filter">
                <div uk-grid>
                    <div class="uk-width-1-4@m">
                        <select v-model="selectedCategory" class="uk-select" style="height:34px">
                            <option selected="" disabled="" value="default">Filter by category</option>
                            <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="list-requests">
                <div class="uk-child-width-expand@s uk-grid-small uk-grid" uk-grid>
                  <div class="uk-width-1-3@m uk-grid-margin" v-for="product in campaigns" :key="product._id">
                    <div @click="openLink(product)"><startup-box :product="product" /></div>
                  </div>
                </div>
            </div>
        </div>
        <product-modal/>
    </section>
</template>

<script>
import ProductModal from '~/components/productModal.vue'
import StartupBox from '~/components/startupBox.vue'
export default {
  layout: 'main',
  components: {
    StartupBox,
    ProductModal
  },
  async asyncData ({ app, redirect }) {
    if (app.$auth.state.user !== null) {
      if (app.$auth.state.user.userType === 'influencer' && 
      app.$auth.state.user.twitterDetails === null) {
        return redirect(302, '/connect/twitter')
      }
    }
    const { data } = await  app.$axios.get('/api/campaign/paid/requests')
    return { campaigns: data.campaigns }
  },
  head: {
    title: 'Requests - Makertap'
  },
  data () {
    return {
      selectedCategory: 'default',
      categories: [
        {
          name: 'All'
        },
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
    selectedCategory (val) {
      this.$axios.get('/api/campaign/paid/requests', {
        params: {
          'category': val.toLowerCase()
        }
      })
      .then(res => {
        this.campaigns = res.data.campaigns
      })
    }
  },
  methods: {
    openLink(product) {
      this.$store.dispatch('viewProduct', product)
      window.UIkit.modal('#product-modal').show()
    }
  },
}
</script>

<style>

</style>
