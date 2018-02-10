import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      campaigns: []
    },
    mutations: {
      setCampaigns (state, payload) {
        state.campaigns = payload
      }
    }
  })
}

export default createStore
