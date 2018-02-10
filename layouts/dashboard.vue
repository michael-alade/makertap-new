<template>
    <div uk-grid class="uk-grid-collapse">
                <div class="uk-visible@m uk-width-1-5">
                    <div class="sidebar-left">
                        <div class="user-account">
                            <img class="user-thumbnail loader" src="https://avatar.tobi.sh/211.svg?text=KO">
                            <div class="user-info">
                                <div class="user-name">Kolawole Alade</div>
                                <div class="user-type">Publisher</div>
                            </div>
                        </div>
                        <div class="side-navigation">
                            <ul>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-tachometer"></i>
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="./requests">
                                        <i class="fa fa-list"></i>
                                        <span>Requests</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="./payouts">
                                        <i class="fa fa-money"></i>
                                        <span>Payouts</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-cogs"></i>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a @click="$auth.logout()">
                                        <i class="fa fa-power-off"></i>
                                        <span>Log out</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="uk-width-expand">
                    <div class="dashboard-nav">
                        <div class="uk-container uk-container-large">
                            <div class="navigation">
                                <div class="account uk-float-right">
                                    <img class="user-thumbnail loader" src="https://avatar.tobi.sh/211.svg?text=KO">
                                </div>
                                <div class="notifications uk-float-right">
                                    <div class="notify">
                                        <i class="fa fa-1x fa-bell-o"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 57px;"></div>
                    <nuxt />
                </div>
            </div>
</template>

<script>
export default {
}
</script>

<style>
    .dashboard-nav {
        position: fixed;
        top: 0px;
        z-index: 1;
        width: 100%;
    }
</style>
