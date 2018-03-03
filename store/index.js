import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      campaigns: [],
      selectedProduct: null
    },
    actions: {
      viewProduct ({ commit }, product) {
        return commit('viewProduct', product)
      },
      clearSelectedProduct({ commit }) {
        return commit('clearSelectedProduct', null)
      }
    },
    mutations: {
      setCampaigns (state, payload) {
        state.campaigns = payload
      },
      viewProduct (state, product) {
        state.selectedProduct = product
      },
      clearSelectedProduct (state, val) {
        state.selectedProduct = val
      }
    }
  })
}

export default createStore
