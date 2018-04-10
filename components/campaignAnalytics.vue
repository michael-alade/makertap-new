<template>
    <div class="analytics">
        <div class="uk-grid uk-child-width-expand@s uk-grid-small" uk-grid>
            <div class="uk-width-1-2@m">
                <div class="uk-card mk-card black">
                    <div class="uk-flex">
                        <div>
                            <span class="number">{{ $abbreviate(todayImpressions, 2) }}</span>
                            <span class="date">{{ getDate(new Date()).month }} {{ getDate(new Date()).day }}</span>
                            <span class="today">Today's Impressions</span>
                        </div>
                        <div style="margin-left: 14px">
                            <div class="icon">
                                <svg>
                                    <use xlink:href="/img/calendar.svg#calendar"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-2@m">
                <div class="uk-card mk-card blue">
                    <div class="uk-flex">
                        <div>
                            <span class="number">{{ $abbreviate(totalImpressions, 2) }}</span>
                            <span class="date">{{ getDate(new Date(campaign.campaignDetails.submittedDate)).month }} {{ getDate(new Date(campaign.campaignDetails.submittedDate)).day }} - Present</span>
                            <span class="today">Total Impressions</span>
                        </div>
                        <div class="uk-margin-left" style="margin-left: 32px !important;">
                            <div class="icon">
                                <svg>
                                    <use xlink:href="/img/laptop.svg#laptop"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['campaign'],
  data () {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  methods: {
    getDate (date) {
      return {
        month: this.months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear()
      }
    }
  },
  computed: {
    todayImpressions () {
      return this.campaign.analytics.impressions.reduce((acc, val) => {
        const today = this.getDate(new Date())
        const impression = this.getDate(new Date(val.time))
        if (
          today.month === impression.month && 
          today.day === impression.day && 
          today.year === impression.year) {
            return acc + 1
          }
          return acc + 0
      }, 0)
    },
    totalImpressions () {
      return this.campaign.analytics.impressions.reduce((acc, val) => {
        return acc + 1
      }, 0)
    }
  }
}
</script>

<style>
  .mk-card {

  }
</style>
