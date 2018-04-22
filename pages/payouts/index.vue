<template>
    <section id="payouts">
        <div class="uk-container uk-container-small">
            <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                <li class="active">
                    <a href="#">Wallet</a>
                </li>
                <li>
                    <a href="#">Request payout</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
            </ul>
            <ul class="uk-switcher uk-margin">
                <li>
                    <div class="body">
                        <div class="uk-card mt-card uk-card-default">
                            <div class="uk-child-width-expand@s wallet uk-text-center" uk-grid>
                                <div class="">
                                    <div class="available-balance">
                                        <h3>Available balance</h3>
                                        <span>${{ wallet.totalAmountAvailable }}</span>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="withdraw-balance">
                                        <h3>Withdrawed</h3>
                                        <span>${{ wallet.totalWithdrawed }}</span>
                                    </div>
                                </div>
                                <div class="uk-width-1-3@m">
                                    <div class="requested-payout">
                                        <h3>Total</h3>
                                        <span>${{ wallet.total }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-card uk-margin mt-card uk-card-default">
                            <div class="header">
                                <h4>Transactions</h4>
                            </div>
                            <div class="body">
                                <table class="uk-table uk-table-small uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Products</th>
                                            <th>Payouts
                                                <i style="text-transform: capitalize">(After $1 deduction.)</i>
                                            </th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="trans in wallet.transactions" :key="trans.date">
                                            <td>{{ trans.product.productName }}</td>
                                            <td>${{ trans.amount }}</td>
                                            <td>{{ $date(new Date(trans.date), 'Do [of] MMM YYYY hh[:]mm A') }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="body">
                        <form @submit.prevent="requestPayout" class="uk-form-stacked">
                            <div class="uk-grid" uk-grid>
                                <div class="uk-width-1-2@m uk-width-1-1@s">
                                    <label for="" class="uk-form-label">Withdrawal amount</label>
                                    <span v-if="withdrawError.status" class="text-red" style="font-size: 12px">{{ withdrawError.message }}</span>
                                    <div class="uk-form-controls">
                                        <input min="4" v-model="withdrawAmount" type="number" class="uk-input" placeholder="How much do you want to withdraw?">
                                    </div>
                                </div>
                            </div>
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-1-2">
                                    <button :class="{ 'uk-animation-shake': withdrawError.status }" :disabled="updating || withdrawError.status" type="submit" class="btn">
                                        {{ updating ? 'Processing' : 'Withdraw' }}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="uk-card uk-margin mt-card uk-card-default">
                            <div class="header">
                                <h4>Withdrawal Transactions</h4>
                            </div>
                            <div class="body">
                                <table class="uk-table uk-table-small uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Amount</th>
                                            <th>Status
                                            </th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="trans in wallet.withdrawalTransactions" :key="trans.submitDate">
                                            <td>${{ trans.amount }}</td>
                                            <td style="text-transform: capitalize;">{{ trans.status }}</td>
                                            <td>{{ $date(new Date(trans.submitDate), 'Do [of] MMM YYYY hh[:]mm A') }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="body">
                        <form @submit.prevent="updateSettings" class="uk-form-stacked uk-grid-small">
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-1-2@m uk-width-1-1@s">
                                    <h5>We currently only support <a href="https://transferwise.com">Transferwise</a> for payouts.</h5>
                                </div>
                            </div>
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-1-2@m uk-width-1-1@s">
                                    <label class="uk-form-label" for="form-stacked-select">Currency</label>
                                    <div class="uk-form-controls">
                                        <select v-model="wallet.currency" class="uk-select" id="form-stacked-select">
                                            <option disabled="" value="default"> -- Select your currency -- </option>
                                            <option value="AED">AED</option>
                                            <option value="AUD">AUD</option>
                                            <option value="BGN">BGN</option>
                                            <option value="CAD">CAD</option>
                                            <option value="CHF">CHF</option>
                                            <option value="CLP">CLP</option>
                                            <option value="CZK">CZK</option>
                                            <option value="DKK">DKK</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="GEL">GEL</option>
                                            <option value="HKD">HKD</option>
                                            <option value="HRK">HRK</option>
                                            <option value="HUF">HUF</option>
                                            <option value="IDR">IDR</option>
                                            <option value="ILS">ILS</option>
                                            <option value="INR">INR</option>
                                            <option value="JPY">JPY</option>
                                            <option value="KES">KES</option>
                                            <option value="MAD">MAD</option>
                                            <option value="MXN">MXN</option>
                                            <option value="MYR">MYR</option>
                                            <option value="NGN">NGN</option>
                                            <option value="NOK">NOK</option>
                                            <option value="NZD">NZD</option>
                                            <option value="PEN">PEN</option>
                                            <option value="PHP">PHP</option>
                                            <option value="PLN">PLN</option>
                                            <option value="RON">RON</option>
                                            <option value="SEK">SEK</option>
                                            <option value="SGD">SGD</option>
                                            <option value="THB">THB</option>
                                            <option value="TRY">TRY</option>
                                            <option value="USD">USD</option>
                                            <option value="VND">VND</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-grid-small uk-margin" uk-grid>
                                <div class="uk-width-1-2@m uk-width-1-1@s">
                                    <label class="uk-form-label" for="form-stacked-text">Your Email</label>
                                    <span style="font-size: 12px">You'll receive an email from Transferwise about your payout</span>
                                    <input required v-model="wallet.email" type="email" class="uk-input" id="form-stacked-text" placeholder="Enter your email"/>
                                </div>
                            </div>
                            <div class="uk-margin">
                                <div class="important-notice">
                                    <div>Important Note <i class="fa fa-info-circle"></i>:</div>
                                    <ul class="important-list">
                                        <li>All taxes would be handled by influencers based on the tax laws of the country they reside.</li>
                                        <li>Payouts would be made to your local bank account in your selected currency.</li>
                                        <li>Transferwise support a limited number of <a href="https://transferwise.com/help/article/1569835/basic-information/supported-currencies" target="_blank">currencies</a>.</li>
                                        <li>We will send your exact payout amount (USD) to TransferWise. Please note that influencers will absorb any currency conversion and TransferWise fees.</li>
                                        <li>TransferWise fee not included. Payouts should arrive in 1-4 business days.</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="uk-grid-small" uk-grid>
                                <div class="uk-width-1-2">
                                    <button @disabled="updating" type="submit" class="btn">
                                        {{ updating ? 'Updating' : 'Update' }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
  layout: 'main',
  middleware: ['auth'],
  head: {
    title: 'Payouts - Makertap'
  },
  data () {
    return {
      updating: false,
      withdrawAmount: null,
      withdrawError: {
        status: false,
        message: ''
      }
    }
  },
  asyncData ({ app }) {
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer', ['get'])
    return app.$axios
      .get('/api/user/wallet')
      .then(res => {
        return {
          wallet: res.data.wallet
        }
      })
  },
  created () {
    if (this.wallet.currency === null) {
      this.wallet.currency = 'AUD'
    }
  },
  watch: {
    withdrawAmount (val) {
      if (val.length) {
        if (Number(val) < 4) {
          this.withdrawError = {
            status: true,
            message: 'Amount should be equal or greater than $4.'
          }
          return
        }
        if (Number(val) > this.wallet.totalAmountAvailable) {
          this.withdrawError = {
            status: true,
            message: 'Exceeding wallet balance.'
          }
          return
        }
        this.withdrawError = {
            status: false,
            message: ''
        }
        return
      }
      this.withdrawError = {
        status: true,
        message: 'Please provide a valid number.'
      }
    }
  },
  methods: {
    updateSettings () {
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer')
      this.updating = true
      return this.$axios
        .put('/api/user/wallet/update', {
          currency: this.wallet.currency,
          email: this.wallet.email
        })
        .then(res => {
          this.updating = false
        })
    },
    requestPayout () {
      const amount = this.withdrawAmount
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer')
      this.updating = true
      return this.$axios
        .post('/api/user/wallet/request-payout', {
          amount
        })
        .then(res => {
          this.updating = false
          this.$axios
            .get('/api/user/wallet')
            .then(res => {
              this.wallet = res.data.wallet
            })
          return window.UIkit.notification({
            message: res.data.message,
            status: 'success',
            pos: 'bottom-left',
            timeout: 7000
          })
        })
        .catch(err => {
          return window.UIkit.notification({
            message: err.response.data.message,
            status: 'danger',
            pos: 'bottom-left',
            timeout: 9000
          })
        })
    }
  }
}
</script>

<style>

</style>
