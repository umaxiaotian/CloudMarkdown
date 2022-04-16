<template>
  <v-tabs centered class="ml-n9" color="grey darken-1" v-model="model">
    <v-tab v-for="(link, index) in links" :key="index" :href="link.address">
      {{ link.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      article_list: [],
      model: this.$route.path,
      links: [
        { title: "TREND", address: "/" },
        { title: "SEARCH", address: "/search" },
        { title: "Profile", address: "/profile" },
        { title: "ReleaseNote", address: "/releasenote" },
      ],
    };
  },
};
</script>