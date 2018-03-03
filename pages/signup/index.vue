<template>
    <section id="login">
                <div class="uk-container authentication">
                    <div v-if="!emailVerification" class="card">
                        <div class="uk-margin" style="margin-bottom: 60px">
                            <div style="margin: 0 auto; display:block; text-align:center;">
                                UNKNOWN
                            </div>
                        </div>
                        <status-component v-if="status.show" :status="status" />
                        <form @submit.prevent="signup">
                        <label class="uk-form-label">Who are you?</label>
                        <div class="uk-child-width-expand@s uk-grid-small uk-grid" uk-grid>
                            <div class="uk-width-1-2 uk-first-column">
                                <div class="multi-select" :class="{ 'selected': selected === 'sponsor' }" @click="select('sponsor')">
                                    Sponsor
                                </div>
                            </div>
                            <div class="uk-width-1-2">
                                <div class="multi-select" :class="{ 'selected': selected === 'influencer' }" @click="select('influencer')">
                                    Twitter Influencer
                                </div>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="full-name">Full Name</label>
                            <div class="uk-form-controls">
                                <input v-model="form.fullName" required class="uk-input" id="full-name" type="text">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="email">Email</label>
                            <div class="uk-form-controls">
                                <input v-model="form.email" required class="uk-input" id="email" type="text">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="password">Password</label>
                            <div class="uk-form-controls">
                                <input v-model="form.password" required class="uk-input" id="password" type="password">
                            </div>
                        </div>
                        <div class="uk-margin" v-if="form.userType === 'influencer'">
                            <label class="uk-form-label" for="medium-username">Medium username</label>
                            <div class="uk-form-controls">
                                <input v-model="form.mediumUsername" required class="uk-input" id="medium-username" type="text">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <span class="terms">By clicking signup, you've read & agreed to the <a href="#">terms</a></span>
                        </div>
                        <div class="uk-margin">
                            <button type="submit" class="btn btn-large btn-long">
                                Sign up
                            </button>
                        </div>
                        </form>
                        <div class="uk-margin">
                            <button @click="$router.push('/login')" class="btn btn-outline" style="margin: 0 auto;display: block;">
                                Log in
                            </button>
                        </div>
                    </div>
                    <email-verification :email="form.email" v-if="emailVerification" />
                </div>
            </section>
</template>

<script>
import StatusComponent from '~/components/statusComponent.vue'
import EmailVerification from '~/components/emailVerification.vue'

export default {
  head: {
    title: 'Signup | Makertap'
  },
  components: {
    StatusComponent,
    EmailVerification
  },
  data () {
    return {
      selected: '',
      emailVerification: false,
      status: {
        show: false,
        type: '',
        message: ''
      },
      form: {
        fullName: '',
        email: '',
        userType: null,
        mediumUsername: '',
        password: ''
      }
    }
  },
  methods: {
    select (val) {
      this.selected = val
      this.form.userType = val
    },
    signup () {
      const self = this
      const form = this.form
      if (!this.form.userType) {
        this.status = {
          show: true,
          type: 'warning',
          message: 'Select a user type'
        }
        return
      }
      this.$axios.post('/api/auth/signup', form)
        .then(res => {
          self.emailVerification = true
        })
        .catch(err => {
          self.status = {
            show: true,
            type: 'danger',
            message: err.response.data.message
          }
        })
    }
  }
}
</script>

<style>

</style>
