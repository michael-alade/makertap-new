<template>
    <section> 
        <div class="uk-offcanvas-content">
                <div class="uk-navbar-container uk-navbar-transparent uk-sticky uk-sticky-fixed">
                    <div class="uk-container uk-container-expand">
                        <nav uk-navbar>
                            <div class="uk-navbar-left uk-hidden@s">
                                <a class="uk-navbar-toggle" uk-toggle="target: #mobile-nav-menu; cls: uk-hidden;" uk-navbar-toggle-icon href="#"></a>
                            </div>
                            <div class="uk-navbar-left uk-visible@s">
                                <a href="/" class="uk-navbar-item uk-logo">
                                    UNKNOWN
                                </a>
                            </div>
                            <div class="uk-navbar-center uk-hidden@s">
                                <a href="/" class="uk-navbar-item uk-logo">
                                    UNKNOWN
                                </a>
                            </div>
                            <div class="uk-navbar-center uk-visible@s">
                                <ul class="uk-navbar-nav">
                                    <li class="uk-active"><a href="">Sponsors</a></li>
                                    <li class="uk-parent"><a href="">Publishers</a></li>
                                </ul>
                            </div>
                            <div v-if="!$auth.state.user" class="uk-navbar-right uk-visible@s">
                                <ul class="uk-navbar-nav auth">
                                    <li class="uk-active"><a class="login" href="/login">Log in</a></li>
                                </ul>
                                <div class="uk-navbar-item">
                                    <a class="btn signup-cta" href="/signup">
                                        Sign up
                                    </a>
                                </div>
                            </div>
                            <div v-if="$auth.state.user" class="uk-navbar-right uk-visible@s">
                                <div class="uk-navbar-item">
                                    <a class="btn signup-cta" href="#">
                                        {{ $auth.state.user.fullName.split(' ')[0] }}
                                    </a>
                                    <div uk-dropdown="mode: click">
                                        <ul class="uk-nav uk-dropdown-nav user-avatar-dropdown">
                                            <li v-if="$auth.state.user.userType === 'publisher'">
                                                <a href="/publisher/dashboard">
                                                    <span class="fa fa-tachometer"></span>
                                                    <span class="text">Dashboard</span>
                                                </a>
                                            </li>
                                            <li v-if="$auth.state.user.userType === 'sponsor'">
                                                <a href="/sponsor/campaign">
                                                    <span uk-icon="icon: bolt"></span>
                                                    <span class="text">Campaigns</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a @click="$auth.logout()">
                                                    <span uk-icon="icon: sign-out"></span>
                                                    <span class="text">Logout</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="mobile-nav-menu" class="uk-animation-slide-top uk-hidden@s uk-hidden uk-container uk-container-expand mobile-navigation">
                        <ul class="mobile-nav">
                            <li>
                                <a href="/sponsors">
                                    <span>Sponsors</span>
                                    <span class="after">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10.0401 17.9909" enable-background="new 0 0 10.0401 17.9909" xml:space="preserve"><path fill="%231d1d1f" fill-rule="evenodd" clip-rule="evenodd" d="M9.6564,8.04c0.5116,0.5277,0.5116,1.3842,0,1.9121l-7.4175,7.6438c-0.5132,0.5267-1.3433,0.5267-1.8545,0c-0.5125-0.5278-0.5125-1.3845,0-1.9124l6.4901-6.6882L0.3844,2.3072c-0.5125-0.5279-0.5125-1.3845,0-1.9124c0.5112-0.5264,1.3413-0.5264,1.8545,0L9.6564,8.04z"/></svg>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="/publishers">
                                    <span>Publishers</span>
                                    <span class="after">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10.0401 17.9909" enable-background="new 0 0 10.0401 17.9909" xml:space="preserve"><path fill="%231d1d1f" fill-rule="evenodd" clip-rule="evenodd" d="M9.6564,8.04c0.5116,0.5277,0.5116,1.3842,0,1.9121l-7.4175,7.6438c-0.5132,0.5267-1.3433,0.5267-1.8545,0c-0.5125-0.5278-0.5125-1.3845,0-1.9124l6.4901-6.6882L0.3844,2.3072c-0.5125-0.5279-0.5125-1.3845,0-1.9124c0.5112-0.5264,1.3413-0.5264,1.8545,0L9.6564,8.04z"/></svg>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="/login">
                                    <span>Log in</span>
                                    <span class="after">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10.0401 17.9909" enable-background="new 0 0 10.0401 17.9909" xml:space="preserve"><path fill="%231d1d1f" fill-rule="evenodd" clip-rule="evenodd" d="M9.6564,8.04c0.5116,0.5277,0.5116,1.3842,0,1.9121l-7.4175,7.6438c-0.5132,0.5267-1.3433,0.5267-1.8545,0c-0.5125-0.5278-0.5125-1.3845,0-1.9124l6.4901-6.6882L0.3844,2.3072c-0.5125-0.5279-0.5125-1.3845,0-1.9124c0.5112-0.5264,1.3413-0.5264,1.8545,0L9.6564,8.04z"/></svg>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="/signup" class="btn" style="color:#fff">
                                    Sign up
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style="height: 80px"></div>
        </div>
        <nuxt />
   </section>
</template>

<script>
export default {
};
</script>

<style>
    .uk-navbar-container {
        width: 100%;
        position: fixed;
        background: #fff;
        top: 0px;
    }
</style>
