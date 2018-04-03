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
                                            <th>Payouts <i style="text-transform: capitalize">(After $1 deduction.)</i></th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="trans in wallet.transactions" :key="trans.date">
                                            <td>{{ trans.product.productName }}</td>
                                            <td>${{ trans.amount }}</td>
                                            <td>{{ trans.date }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
  }
}
</script>

<style>

</style>
