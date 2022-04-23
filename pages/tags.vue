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
            <v-icon large color="green   darken-2"> mdi-tag-multiple </v-icon>
            <h1 v-if="is_search" v-text="result_text"></h1>
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
      model: this.$route.path,
      is_search: true,
      tag_info: [],
      search_tag_id: null,
      result_text: "タグが選択されていません",
    };
  },
  head() {
    return {
      title: "検索タグ：" + this.tag_info.tag_name,
    };
  },
  watch: {
    //当子コンポーネントからのパラムGET
    $route(param) {
      console.log(param.query.id);
      if (param.query.id) {
        this.search_tag_id = param.query.id;
        this.search();
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;

    //外部から来た人向けのサーチパラムGET
    this.search_tag_id = this.$route.query.id;
    if (this.search_tag_id) {
      this.search();
    }
    this.tag_info.tag_name = "なし";
  },

  methods: {
    async search() {
      const article_list = await this.$api.apiGet(
        "/article/tag/" + this.search_tag_id
      );
      this.article_list = article_list;

      const tag_info = await this.$api.apiGet(
        "/tag/name/" + this.search_tag_id
      );

      this.tag_info = tag_info;

      this.result_text = "検索タグ:" + this.tag_info.tag_name;
    },
  },
};
</script>