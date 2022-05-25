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
            <v-icon large color="primary darken-2">
              mdi-card-account-details-outline
            </v-icon>
            <h1 v-text="result_text"></h1>
            <UserListView :articles="article_list" @refresh="readContents()" />
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
import UserListView from "~/components/UserComponents/UserListView.vue";
import Header from "@/components/MainComponents/Header.vue";
import LeftBanner from "@/components/MainComponents/LeftBanner.vue";
import RightBanner from "@/components/MainComponents/RightBanner.vue";
export default {
  components: {
    MainBar,
    UserListView,
    Header,
    LeftBanner,
    RightBanner,
  },
  data() {
    return {
      article_list: [],
      result_text: "自分の記事リスト一覧（最新順）",
    };
  },
  head() {
    return {
      title: "自分の記事一覧",
    };
  },
  methods: {
    async readContents() {
      const article_list = await this.$util.authGet("/user/article/list/");
      if (article_list && article_list.noResponse != true) {
        this.article_list = article_list;
      }else{
        this.article_list = [];
      }
    },
  },
  async created() {
    
    if (await this.$util.isLogin()) {
      this.readContents();
    } else {
      this.$router.push("/");
    }
  },
};
</script>