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
                <v-card-actions>
                  <v-row align="center">
                    <v-card
                      v-if="article.is_publish == true"
                      color="green darken-1"
                    >
                      <h2>公開コンテンツ</h2>
                    </v-card>
                    <v-card
                      v-if="article.is_publish == false"
                      color="orange darken-1"
                    >
                      <h2>非公開コンテンツ</h2>
                    </v-card>
                  </v-row>
                </v-card-actions>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">
                      <h3>
                        <a
                          style="text-decoration: none; color: white"
                          :href="'/member?id=' + article.relate_user_id"
                          >記事作者：{{ article.relate_user_name }}</a
                        >
                      </h3>
                    </div>
                    <div class="text-overline mb-4">
                      投稿日：{{ article.post_date }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                      {{ article.title }}
                    </v-list-item-title>

                    <!-- mdviewr -->
                  </v-list-item-content>
                  <v-list-item-avatar tile size="80" color="grey"
                    ><img :src="article.img | changeImgPath"
                  /></v-list-item-avatar>
                </v-list-item>

                <div class="text-left">
                  <v-chip
                    class="ma-2"
                    color="primary"
                    v-for="tag in article.tags"
                    :key="tag.id"
                    :href="'/tags?id=' + tag.tag_id"
                  >
                    {{ tag.tag_name }}
                  </v-chip>
                </div>
                <v-card-actions>
                  <v-btn rounded color="pink" dark disabled>
                    {{ article.good_count }}
                    <v-icon dark right> mdi-heart </v-icon>
                  </v-btn>
                </v-card-actions>

                <MdViewr :markdown="article.detail" />
              </v-card>
            </div>
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
import MdViewr from "@/components/MainComponents/MdViewr.vue";
import LeftBanner from "@/components/MainComponents/LeftBanner.vue";
import RightBanner from "@/components/MainComponents/RightBanner.vue";
export default {
  components: {
    MainBar,
    ListView,
    Header,
    MdViewr,
    LeftBanner,
    RightBanner,
  },
  data() {
    return {
      article: [],
    };
  },
  head() {
    return {
      title: this.article.title,
    };
  },
  filters: {
    changeImgPath(img) {
     if(img){
      var BaseUrl = process.env.baseUrl;
      return BaseUrl + "/extraResource/" + img;
     }
    },
  },
  created() {
    

    //外部から来た人向けのサーチパラムGET
    this.article_id = this.$route.query.article_id;
    if (this.article_id) {
      this.getArticle();
    }
  },

  methods: {
    async getArticle() {
      if (await this.$util.isLogin()) {
        this.article = await this.$util.authGet(
          "/user/article/" + this.article_id
        );
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>