<template>
  <v-app id="inspire">
    <Header />
    <MainBar />
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
                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  ></v-list-item-avatar>
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

export default {
  components: {
    MainBar,
    ListView,
    Header,
    MdViewr,
  },
  data() {
    return {
      article: [],
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