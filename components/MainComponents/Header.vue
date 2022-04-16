<template>
  <v-app-bar app class="darken-4" flat>
    <v-tabs class="ml-n9" color="grey darken-1" v-model="model">
      <v-tab v-for="(link, index) in links" :key="index" :href="link.address">
        {{ link.title }}
      </v-tab>
    </v-tabs>

    <v-text-field
      v-model="search"
      clearable
      flat
      solo-inverted
      hide-details
      label="記事を探す"
      style="min-width: 300px"
    ></v-text-field>
    <v-btn icon @click="searchText()">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn class="ma-2" color="blue" href="/login"> ログイン </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      article_list: [],
      model: this.$route.path,
      links: [
        { title: "TREND", address: "/" },
        { title: "SEARCH", address: "/search" },
        { title: "TAGS", address: "/tags" },
        { title: "MEMBER", address: "/member" },
      ],
    };
  },
  methods: {
    searchText() {
      //   this.$router.push({ name: 'search', params: { search } })
      this.$router.push({
        path: "/search",
        query: { searchText: this.search },
      });
    },
  },
};
</script>