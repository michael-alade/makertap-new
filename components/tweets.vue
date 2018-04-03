<template>
    <div class="tweets">
        <h4>Tweets</h4>
        <div class="uk-grid uk-child-width-expand@s  uk-grid-small" uk-grid>
            <div class="uk-width-1-2@m">
                <blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Weekend trips are the best ✈️🏖️<br><br>Here&#39;s a tool to easily book flights for them: <a href="https://t.co/Wd5TqbkV8s">https://t.co/Wd5TqbkV8s</a> <a href="https://t.co/PoF8ptjVFl">pic.twitter.com/PoF8ptjVFl</a></p>&mdash; Product Hunt (@ProductHunt) <a href="https://twitter.com/ProductHunt/status/974797574392680451?ref_src=twsrc%5Etfw">March 17, 2018</a></blockquote>
            </div>
            <div class="uk-width-1-2@m">
                <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Change the incentives, change the world 🌎🌍</p>&mdash; owocki (@owocki) <a href="https://twitter.com/owocki/status/974842891880157184?ref_src=twsrc%5Etfw">March 17, 2018</a></blockquote>
            </div>
            <div class="uk-width-1-2@m">
                <blockquote class="twitter-tweet" data-cards="hidden" data-lang="en"><p lang="en" dir="ltr">Subculture funfact you might not pay attention to:<br>Atm there are 180.000 people waiting for <a href="https://twitter.com/Drake_Music?ref_src=twsrc%5Etfw">@drake_music</a> to join <a href="https://twitter.com/Ninja?ref_src=twsrc%5Etfw">@ninja</a> for a game of fortnite on <a href="https://twitter.com/Twitch?ref_src=twsrc%5Etfw">@Twitch</a> <a href="https://t.co/i1sVRIPWt3">https://t.co/i1sVRIPWt3</a>  / ht <a href="https://twitter.com/blakeir?ref_src=twsrc%5Etfw">@blakeir</a></p>&mdash; Andreas Klinger ✌️ (@andreasklinger) <a href="https://twitter.com/andreasklinger/status/974136630494638081?ref_src=twsrc%5Etfw">March 15, 2018</a></blockquote>
            </div>
            <div class="uk-width-1-2@m">
                <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I’m moving back to San Francisco in June. I will miss the greatest city in the world, and it was an honor to get to live here. <br><br>But its time to go back to California, where I found myself, my wife, and my career. It’s time to build. ❤️</p>&mdash; Kanyi Maqubela (@km) <a href="https://twitter.com/km/status/974708998204256257?ref_src=twsrc%5Etfw">March 16, 2018</a></blockquote>
            </div>
        </div>
        <div v-if="tweetLoading" class="tweets-loading">
            <i class="fa fa-2x fa-spinner fa-spin"></i>
            <span>Loading tweets....</span>
        </div>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</template>

<script>
export default {
  data () {
    return {
      tweetLoading: true
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

<style>

</style>
