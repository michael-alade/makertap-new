<template>
    <section>
        <section id="hero">
            <div class="inner-cta">
                <h2>Need Users For Your Startup?<br/> Try A PR Stunt.</h2>
                <p class="tag">
                  Reach users through Influential Writers.<br/>
                  Fast & hassle free.
                </p>
                <div class="ctas">
                    <!-- <button onclick="location.href='#how-it-works';" class="btn btn-outline btn-large btn-multi" href="#how-it-works">
                      How it works
                    </button> -->
                    <button class="btn btn-large btn-multi" @click="$router.push('/signup')">
                      Get Started
                    </button>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
export default {
  layout: 'main',
  // auth: false,
  head: {
    title: 'Home | Makertap'
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
