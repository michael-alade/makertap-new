<template>
    <div class="uk-card uk-card-default uk-card-body"  style="height: auto;">
        <div class="icon">
        </div>
        <div class="">
            <button class="" @click="connect"> Connect Twitter account</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
var provider = new firebase.auth.TwitterAuthProvider();
export default {
  methods: {
    connect () {
      const self = this
      return this.$firebase.auth().signInWithPopup(provider).then(result => {
        if (result.credential) {
          const user = result.user
          const twitterDetails = Object.assign({}, result.credential, {
            username: result.additionalUserInfo.username,
            isNewUser: result.additionalUserInfo.isNewUser,
            displayName: user.displayName,
            photoUrl: user.photoUrl,
            profile: result.additionalUserInfo.profile
          })
          self.saveTwitterDetails(twitterDetails)
        }
      }).catch(err => {
        console.log(err, 'err')
      })
    },
    saveTwitterDetails (twitterDetails) {
      const self = this
      const userId = this.$auth.state.user._id
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer')
      this.$axios.post(`/api/auth/connect/twitter/${userId}`, twitterDetails)
      .then(res => {
        window.location.href = '/'
        return
      })
      .catch(err => {
        // handle err
      })
    }
  }
}
</script>

<style>

</style>
