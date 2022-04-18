<template>
  <v-app id="inspire">
    <Header />
    <MainBar />
    <v-main class="grey darken-3">
      <v-container>
        <v-row>
          <v-col cols="12" lg="2">
            <div class="toc-view">
            <v-card elevation-12>
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
            </div>
          </v-col>
          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
            <h1 v-text="header_title"></h1>
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
<style scoped>
.toc-view {
  position: sticky;
  top: 5rem;
}
</style>
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
      header_title: "人気順TOP10",
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
  async created() {
    this.$vuetify.theme.dark = true;

    const article_list = await this.$api.apiGet("/article/list/");
    this.article_list = article_list;
  },

  methods: {},
};
</script>