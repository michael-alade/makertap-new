<template>
    <section id="campaign">
        <div class="uk-container">
            <div class="heading">
                <h4>
                    <span style="color: gold" uk-icon="bolt"></span>Campaigns</h4>
            </div>
            <div class="campaigns">
                <div class="uk-child-width-expand@s uk-grid-small uk-grid" uk-grid>
                    <div class="uk-width-1-4@m uk-width-1-2@s" v-for="campaign in campaigns" :key="campaign._id">
                            <div @click="openCampaign(campaign)" class="campaign-box uk-inline">
                                <div class="campaign-title">
                                    {{ campaign.title }}
                                </div>
                                <div class="impressions">
                                    <span><span style="text-transform: uppercase">{{ $abbreviate(campaign.analytics.impressions.length, 2) }}</span> Impressions</span>
                                </div>
                                <div class="overlay uk-position-top-right">
                                    <div class="actions">
                                        <div class="trash uk-text-right">
                                            <a @click.stop="deleteCampaign(campaign._id)" uk-icon="trash"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="uk-width-1-4@m uk-width-1-2@s">
                        <div class="campaign-box add uk-inline">
                            <div class="inner" uk-toggle="target: #create-campaign; cls: uk-hidden">
                                <div class="uk-text-center">Create new campaign...</div>
                            </div>
                            <div class="uk-position-cover uk-animation-slide-top uk-hidden" id="create-campaign">
                                <div class="heading">
                                    Create campaign
                                    <div class="close" uk-toggle="target: #create-campaign; cls: uk-hidden">
                                        <span uk-icon="close"></span>
                                    </div>
                                </div>
                                <div class="body">
                                    <label class="uk-form-label" for="form-title">Title</label>
                                    <div class="uk-form-controls">
                                        <input class="uk-input" v-model="form.title" id="form-title" type="text" placeholder='For example: "Makertap Campaign."'>
                                    </div>
                                </div>
                                <div class="footer">
                                    <button @click="createCampaign" class="btn btn-green btn-small">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  layout: 'main',
  middleware: ['auth'],
  head: {
    title: 'Campaigns'
  },
  data () {
    return {
      campaigns: [],
      form: {
        title: ''
      }
    }
  },
  async asyncData ({ app, req, redirect }) {
    if (!app.$auth.hasScope('sponsor')) {
      return redirect(302, '/publisher/dashboard/requests')
    }
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer', ['get'])
    const { data } = await  app.$axios.get('/api/campaign')
    return { campaigns: data.campaigns }
  },
  beforeMount() {
    if (this.$auth.hasScope('publisher')) {
      this.$router.replace('/publisher/dashboard/requests')
    }
  },
  methods: {
    async getCampaigns () {
      const { data } = await this.$axios.get('/api/campaign')
      this.campaigns = data.campaigns
      return
    },
    deleteCampaign (id) {
      const self = this
      return this.$axios
        .delete(`/api/campaign/${id}`)
        .then(res => {
          self.getCampaigns()
        })
    },
    createCampaign () {
      const self = this
      const form = this.form
      if (form.title.length) {
        this.$axios
          .post('/api/campaign', {
            title: form.title
          })
          .then(res => {
            self.form.title = ''
            self.getCampaigns()
          })
      }
    },
    openCampaign (campaign) {
      campaign.status === 'new' ? window.location.href = `/sponsor/campaign/new/${campaign._id}` : window.location.href = `/sponsor/campaign/${campaign._id}`
    }
  }
}
</script>

<style>

</style>
