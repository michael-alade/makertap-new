<template>
    <section id="login">
                <div class="uk-container authentication">
                    <div class="card">
                        <div class="uk-margin" style="margin-bottom: 60px">
                            <div style="margin: 0 auto; display:block; text-align:center;">
                                UNKNOWN
                            </div>
                        </div>
                        <div class="">
                            <status-component v-if="status.show" :status="status" />
                        </div>
                        <form @submit.prevent="login">
                        <div class="uk-margin">
                            <label class="uk-form-label" for="email">Email</label>
                            <div class="uk-form-controls">
                                <input required v-model="form.email" class="uk-input" id="email" type="email">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="password">Password</label>
                            <div class="uk-form-controls">
                                <input required v-model="form.password" class="uk-input" id="password" type="password">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <button type="submit" class="btn btn-large btn-long">
                                Log in
                            </button>
                        </div>
                        </form>
                        <div class="uk-margin">
                            <button @click="$router.push('/signup')" class="btn btn-outline" style="margin: 0 auto;display: block;">
                                Sign up
                            </button>
                        </div>
                        <div class="uk-margin uk-text-center forgot-password">
                            <span><a href="#">Forgot password?</a></span>
                        </div>
                    </div>
                </div>
            </section>
</template>

<script>
import StatusComponent from '~/components/statusComponent.vue'
export default {
  head: {
    title: 'Login | Makertap'
  },
  components: {
    StatusComponent
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      status: {
        show: false,
        type: '',
        message: ''
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function () {
        this.status.show = false
      }
    }
  },
  methods: {
    login () {
      const self = this
      const form = this.form
      this.$auth.login({
        data: form
      }).then(res => {
        if (this.$auth.hasScope('publisher')) {
          self.$router.push('/publisher/dashboard/requests')
        } else if (this.$auth.hasScope('sponsor')) {
          self.$router.push('/sponsor/campaign')
        }
      })
      .catch(err => {
        self.status = {
          show: true,
          type: 'danger',
          message: err.response.data.message
        }
        return
      })
      
    }
  }
}
</script>

<style>

</style>
