<template>
    <section id="payouts">
        <div class="uk-container uk-container-small">
            <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                <li class="active">
                    <a href="#">Wallet</a>
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
                                            <td>{{ $moment(new Date(trans.date)).format('lll') }}</td>
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
                                    <span style="font-size: 12px">You'll receive an email from Transferwise after your first payout</span>
                                    <input required v-model="wallet.email" type="email" class="uk-input" id="form-stacked-text" placeholder="Enter your email"/>
                                </div>
                            </div>
                            <div class="uk-margin">
                                <div class="important-notice">
                                    <div>Important Note <i class="fa fa-info-circle"></i>:</div>
                                    <ul class="important-list">
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
      updating: false
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
  methods: {
    updateSettings () {
      const token = this.$auth.token
      this.$axios.setToken(token, 'Bearer', ['get'])
      this.updating = true
      return this.$axios
        .put('/api/user/wallet/update', {
          currency: this.wallet.currency,
          email: this.wallet.email
        })
        .then(res => {
          this.updating = false
        })
    }
  }
}
</script>

<style>

</style>
