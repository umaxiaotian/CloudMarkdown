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
            <h1 v-if="is_search" v-text="result_text"></h1>
            <ListView :articles="article_list" />
          </v-col>
          <v-col cols="12" lg="2">
            <righrBanner />
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
import righrBanner from "@/components/MainComponents/righrBanner.vue";
export default {
  components: {
    MainBar,
    ListView,
    Header,
    LeftBanner,
    righrBanner
  },
  data() {
    return {
      article_list: [],
      model: this.$route.path,
      is_search: true,
      user_info: [],
      member_id: null,
      result_text: "メンバーが選択されていません",
    };
  },
  head() {
    return {
      title: this.user_info.nickname+"の記事",
    };
  },
  watch: {
    //当子コンポーネントからのパラムGET
    $route(param) {
      console.log(param.query.id);
      if (param.query.id) {
        this.member_id = param.query.id;
        this.search();
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;

    //外部から来た人向けのサーチパラムGET
    this.member_id = this.$route.query.id;
    if (this.member_id) {
      this.search();
    }
    this.user_info.nickname= "ななし"
  },

  methods: {
    async search() {
      const article_list = await this.$api.apiGet(
        "/article/user/" + this.member_id
      );
      this.article_list = article_list;

      const member = await this.$api.apiGet(
        "/member/user/" + this.member_id
      );

      this.user_info = member;
      this.result_text = this.user_info.nickname+"の記事一覧";
    },
  },
};
</script>