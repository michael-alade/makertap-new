<template>
    <section class="requests">
        <div class="uk-container">
            <div class="filter">
                <div uk-grid>
                    <div class="uk-width-1-4@m">
                        <select class="uk-select" style="height:34px">
                            <option default>Filter by category</option>
                            <option>Technology</option>
                            <option>Fashion</option>
                        </select>
                    </div>
                </div>
            </div>
            <h4 class="request-time">Today</h4>
            <div class="list-requests">
                <div class="uk-child-width-expand@s uk-grid-small uk-grid" uk-grid>
                  <div class="uk-width-1-3@m" v-for="product in campaigns" :key="product._id">
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
  async asyncData ({ app }) {
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer', ['get'])
    const { data } = await  app.$axios.get('/api/campaign/paid/requests')
    return { campaigns: data.campaigns }
  },
  head: {
    title: 'Requests - Makertap'
  },
  methods: {
    openLink(product) {
    //   this.$router.push(`/product/${i}`)
      this.$store.dispatch('viewProduct', product)
      window.UIkit.modal('#product-modal').show()
    }
  },
}
</script>

<style>

</style>
