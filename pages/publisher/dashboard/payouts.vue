<template>
    <div class="dashboard-main">
        <div class="uk-container">
            <ul class="uk-subnav uk-subnav-pill" uk-switcher>
                <li class="active">
                    <a href="#">Wallet</a>
                </li>
                <li>
                    <a href="#">Request payout</a>
                </li>
            </ul>
            <ul class="uk-switcher uk-margin">
                <li>
                    <div class="body">
                        <div class="uk-card mk-card uk-card-default">
                            <div class="wallet uk-text-center" uk-grid>
                                <div class="uk-width-1-3@m">
                                    <div class="available-balance">
                                        <h3>Available balance</h3>
                                        <span>$5000</span>
                                    </div>
                                </div>
                                <div class="uk-width-1-3@m">
                                    <div class="withdraw-balance">
                                        <h3>Withdrawed</h3>
                                        <span>$1500</span>
                                    </div>
                                </div>
                                <div class="uk-width-1-3@m">
                                    <div class="requested-payout">
                                        <h3>Requested payout</h3>
                                        <span>$500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-card uk-margin mk-card uk-card-default">
                            <div class="header">
                                <h4>Transactions</h4>
                            </div>
                            <div class="body">
                                Me
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: ['auth'],
  head: {
    title: 'Payouts | Makertap'
  }
}
</script>

<style>

</style>
