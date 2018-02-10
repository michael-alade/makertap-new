<template>
    <section id="new-campaign">
        <div class="uk-container">
            <div class="header">
                <div>
                    <h3 class="title uk-text-center">{{ campaign.title }}</h3>
                </div>
                <span @click="$router.go(-1)" uk-icon="icon: arrow-left; ratio: 2"></span>
            </div>
            <div class="body">
                <div class="form-box">
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-name">Product name</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productName" class="uk-input" id="product-name" maxlength="20" placeholder='For example: Mastercard' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-tagline">Product tagline</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productTagline" class="uk-input" id="product-tagline" maxlength="50" placeholder='e.g The best credit card provider' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-website">Product website</label>
                        <div class="uk-form-controls">
                            <input type="text" v-model="form.productWebsite" class="uk-input" id="product-website" maxlength="50" placeholder='https://example.com' />
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Select category</label>
                        <div class="uk-grid-small uk-grid categories" uk-grid>
                            <div v-for="category in categories" :key="category.name" class="uk-width-1-4@m uk-width-1-2">
                                <div @click="selectCategory(category.name)" class="category" :class="{ 'selected': selectedCategory === category.name.toLowerCase() }">
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label" for="product-website">Product Description</label>
                        <div class="subtitle">This would give more clarity about your product to writers</div>
                        <div class="uk-form-controls">
                            <div class="quill-editor" 
                                :content="content"
                                @change="onEditorChange($event)"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)"
                                v-quill:myQuillEditor="editorOption">
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Select pricing</label>
                        <div class="subtitle">The sponsored post would be shown for 7 days</div>
                        <div class="uk-grid-small categories" uk-grid>
                            <div class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div class="category" uk-tooltip="title: Estimated reach: 10,000 - 20,000">
                                    $500 - 5 publishers
                                </div>
                            </div>
                            <div class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div class="category" uk-tooltip="title: Estimated reach: 20,000 - 30,000">
                                    $1000 - 10 publishers
                                </div>
                            </div>
                            <div class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div class="category" uk-tooltip="title: Estimated reach: 30,000 - 50,000">
                                    $1500 - 15 publishers
                                </div>
                            </div>
                            <div class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div class="category" uk-tooltip="title: Estimated reach: 40,000 - 50,000;">
                                    $2000 - 20 publishers
                                </div>
                            </div>
                            <div class="uk-width-1-3@m uk-width-1-1 uk-width-1-2@s">
                                <div class="category" uk-tooltip="title: Estimated reach: 50,000 - 150,000;">
                                    $3000 - 30 publishers
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label class="uk-form-label">Cover photo</label>
                        <div class="subtitle">Upload a cool cover photo with 170 * 80 in size</div>
                        <div class="uk-placeholder cover-photo">
                            <span uk-icon="icon: cloud-upload"></span>
                            <span class="uk-text-middle">Attach binaries by dropping them here or</span>
                            <div uk-form-custom>
                                <input type="file" multiple>
                                <span class="uk-link">selecting one</span>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <button type="submit" class="btn">Publish</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  head () {
    return {
      title: `Edit | ${this.campaign.title}`
    }
  },
  asyncData ({ app, params, redirect }) {
    if (!app.$auth.hasScope('sponsor')) {
      return redirect(302, '/publisher/dashboard/requests')
    }
    const token = app.$auth.token
    app.$axios.setToken(token, 'Bearer', ['get'])
    return app.$axios.get(`/api/campaign/${params.id}`)
     .then(res => {
       const { data } = res
       return { campaign: data.campaign }
     })
     .catch(err => {
        redirect(302, '/sponsor/campaign')
     })
  },
  data () {
    return {
      content: "<p><strong style=\"color: rgb(34, 34, 34);\">A headline for your release</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Discuss the larger mission of your product, i.e. what it does and what it is for. Include a date and location at the very beginning.</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">What are the specifics of your product / announcement.</strong></p><p>Your answer here...</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">A quote from your CEO or a business co-founder explaining the announcement. This means that journalists won’t have to waste their time – or your company’s time – finding quotes for the article.</strong></p><p>Your answer here</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Bring in trends to explain why this product is relevant to the larger industry / community that your business is a part of. Ideally this will include at least one data point (ex: how large the industry is)</strong></p><p>Your answer here</p><p><br></p><p><strong style=\"color: rgb(34, 34, 34);\">Wrap up with a final quote from CEO or founder</strong></p><p>Your answer here</p>",
      selectedCategory: '',
      form: {
        productName: '',
        productTagline: '',
        productWebsite: '',
        productDescription: '',
        campaignCategory: '',
        campaignPricing: {},
        spots: 0,
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      },
      categories: [
        {
          name: 'Creativity',
        },
        {
          name: 'Technology'
        },
        {
          name: 'Sports'
        },
        {
          name: 'Education'
        },
        {
          name: 'Cryptocurrency'
        },
        {
          name: 'Travel'
        },
        {
          name: 'Finance'
        },
        {
          name: 'Fashion'
        }
      ]
    }
  },
  methods: {
    selectCategory (name) {
      this.selectedCategory = name.toLowerCase()
      this.form.campaignCategory = name.toLowerCase()
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>

<style>

</style>
