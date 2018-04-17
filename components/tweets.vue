<template>
    <div class="tweets">
        <h4>Tweets</h4>
        <div class="uk-grid uk-child-width-expand@s uk-margin uk-grid-small" uk-grid>
            <!-- <div class="uk-width-1-2@m">
                <blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Weekend trips are the best ✈️🏖️<br><br>Here&#39;s a tool to easily book flights for them: <a href="https://t.co/Wd5TqbkV8s">https://t.co/Wd5TqbkV8s</a> <a href="https://t.co/PoF8ptjVFl">pic.twitter.com/PoF8ptjVFl</a></p>&mdash; Product Hunt (@ProductHunt) <a href="https://twitter.com/ProductHunt/status/974797574392680451?ref_src=twsrc%5Etfw">March 17, 2018</a></blockquote>
            </div> -->
            <div class="uk-width-1-2@m" v-for="tweet in tweets" :key="tweet.id">
                <div class="twitter-tweet">
                    <div class="tweet-header">
                        <div class="twitter-user-avatar">
                            <img :src="tweet.user.profile_image_url_https" :alt="tweet.user.name"/>
                        </div>
                        <div class="screen-name">
                            <span class="name">{{ tweet.user.name }}</span>
                            <span class="user-name">@{{ tweet.user.screen_name }}</span>
                        </div>
                        <div class="twitter-logo">
                            <a target="_blank" :href="`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`"><i class="fa fa-twitter"></i></a>
                        </div>
                    </div>
                    <div class="tweet-body">
                        <span>{{ tweet.text }}</span>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-1@m uk-text-center" v-if="!tweets.length">
                <i class="fa fa-3x fa-frown-o"></i>
                <div>No tweet yet.</div>
            </div>
        </div>
        <div v-if="tweetLoading" class="tweets-loading">
            <i class="fa fa-2x fa-spinner fa-spin"></i>
            <span>Loading tweets....</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['tweets'],
  data () {
    return {
      tweetLoading: true,
    }
  },
  mounted () {
    const self = this
    window.onload = () => {
      self.tweetLoading = false
    }
  }
}
</script>
