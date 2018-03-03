<template>
    <div class="article uk-card uk-card-default" :class="randomBorder">
            <div class="description">
                <div class="title">{{ ellipsis('Why Google Stories will save, not screw, Snapchat Discover', 56) }}</div>
                <div class="written-by">Written by Michael</div>
            </div>
            <div class="actions">
                <div class="view">View</div>
            </div>
    </div>
</template>

<script>
export default {
  computed: {
    randomBorder () {
      const items = [
        'border-blue-left',
        'border-red-left',
        'border-green-left',
        'border-yellow-left',
        'border-purple-left',
      ]
      return items[Math.floor(Math.random()*items.length)];
    }
  },
  methods: {
    ellipsizeHelper(str, max, ellipse, chars, truncate) {
      var last = 0,
        c = "";
      if (str.length < max) return str;
      for (var i = 0, len = str.length; i < len; i++) {
        c = str.charAt(i);
        if (chars.indexOf(c) !== -1) {
          last = i;
        }
        if (i < max) continue;
        if (last === 0) {
          return !truncate ? "" : str.substring(0, max - 1) + ellipse;
        }
        return str.substring(0, last) + ellipse;
      }
      return str;
    },
    ellipsis(str, max, opts) {
      var defaults = {
        ellipse: "…",
        chars: [" ", "-"],
        max: 140,
        truncate: true
      };
      if (typeof str !== "string" || str.length === 0) return "";
      if (max === 0) return "";
      opts = opts || {};
      for (var key in defaults) {
        if (opts[key] === null || typeof opts[key] === "undefined") {
          opts[key] = defaults[key];
        }
      }
      opts.max = max || opts.max;
      return this.ellipsizeHelper(
        str,
        opts.max,
        opts.ellipse,
        opts.chars,
        opts.truncate
      );
    }
  }
};
</script>

<style>

</style>
