<template>
  <v-app id="inspire">
    <Header />
    <v-main class="grey darken-3">
      <v-container>
        <v-row>
          <v-col cols="12" lg="2">
            <v-card>
              <v-list flat color="grey darken-2 shrink">
                <v-subheader>人気タグ</v-subheader>
                <v-list-item-group>
                  <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                      <v-img
                        max-height="30"
                        max-width="30"
                        :src="item.avatar"
                      ></v-img>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                      <v-list-item-subtitle
                        >{{ item.post_count }}の投稿</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
            <h1 v-if="is_search" v-text="result_text"></h1>
            <ListView :articles="article_list" />
          </v-col>
          <v-col cols="12" lg="2">
            <v-sheet rounded="lg" min-height="300">
              <!--  -->
            </v-sheet>
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
export default {
  components: {
    MainBar,
    ListView,
    Header,
  },
  data() {
    return {
      article_list: [],
      model: this.$route.path,
      is_search: true,
      search_result: null,
      result_text: "検索結果がありませんでした。",
      items: [
        {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
          text: "Python",
          post_count: 3222,
        },
        {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
          text: "Apache",
          post_count: 3222,
        },
        {
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
          text: "Ansible",
          post_count: 3222,
        },
      ],
    };
  },
  watch: {
    //当子コンポーネントからのパラムGET
    $route(param) {
      console.log(param.query.searchText);
      if (param.query.searchText) {
        this.search_result = param.query.searchText;
        this.search();
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;

    //外部から来た人向けのサーチパラムGET
    this.search_result = this.$route.query.searchText;
    if (this.search_result) {
      this.search();
    }
  },

  methods: {
    async search() {
      console.log("検索ワード："+ this.search_result);

      this.result_text = "検索結果:" + this.search_result;
      const article_list = await this.$api.apiGet("/article/list/");
      this.article_list = article_list;
    },
  },
};
</script>