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
                        <tweets :tweets="campaign.campaignDetails.tweets"/>
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
      return redirect(302, '/')
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
}
</script>

<style>
</style>
