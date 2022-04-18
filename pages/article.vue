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
            <!-- <ListView :articles="article_list" /> -->
            <div>
              <v-card class="mx-auto" color="grey darken-2" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">
                      記事作者：{{ article.relate_user_name }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                      {{ article.title }}
                    </v-list-item-title>

                    <!-- mdviewr -->
                  </v-list-item-content>
                  <v-list-item-avatar tile size="80" color="grey"
                    ><img :src="article.img"
                  /></v-list-item-avatar>
                </v-list-item>

                <div class="text-left">
                  <v-chip
                    class="ma-2"
                    color="blue"
                    v-for="tag in article.tags"
                    :key="tag.id"
                  >
                    {{ tag.tag_name }}
                  </v-chip>
                </div>
                <v-card-actions>
                  <v-btn rounded color="pink" dark>
                    {{ article.good_count }}
                    <v-icon dark right> mdi-heart </v-icon>
                  </v-btn>
                </v-card-actions>

                <MdViewr :markdown="article.detail" />
              </v-card>
            </div>
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
import MdViewr from "@/components/MainComponents/MdViewr.vue";
import LeftBanner from "@/components/MainComponents/LeftBanner.vue";
export default {
  components: {
    MainBar,
    ListView,
    Header,
    MdViewr,
    LeftBanner,
  },
  data() {
    return {
      article: [],
    };
  },
  created() {
    this.$vuetify.theme.dark = true;

    //外部から来た人向けのサーチパラムGET
    this.article_id = this.$route.query.article_id;
    if (this.article_id) {
      this.getArticle();
    }
  },

  methods: {
    async getArticle() {
      this.article = await this.$api.apiGet("/article/" + this.article_id);
    },
  },
};
</script>