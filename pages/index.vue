<template>
  <v-app id="inspire">
    <Header />
    <MainBar />
    <v-main class="grey darken-3">
      <v-container>
        <v-row>
          <v-col cols="12" lg="2">
            <LeftBanner />
          </v-col>
          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
            <v-icon large color="orange darken-2">
              mdi-arrow-up-bold-box-outline
            </v-icon>
            <h1 v-text="header_title"></h1>
            <ListView :articles="article_list" />
          </v-col>
          <v-col cols="12" lg="2">
            <RightBanner />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>

</style>
<script>
import MainBar from "@/components/MainBar";
import ListView from "@/components/MainComponents/ListView.vue";
import Header from "@/components/MainComponents/Header.vue";
import LeftBanner from "@/components/MainComponents/LeftBanner.vue";
import RightBanner from "@/components/MainComponents/RightBanner.vue";
export default {
  components: {
    MainBar,
    ListView,
    Header,
    LeftBanner,
    RightBanner,
  },
  data() {
    return {
      article_list: [],
      header_title: "人気順TOP10",
    };
  },
  head() {
    return {
      title: "トレンド",
    };
  },
  async created() {
    this.$vuetify.theme.dark = true;

    const article_list = await this.$api.apiGet("/article/list/");
    this.article_list = article_list;
  },

  methods: {},
};
</script>