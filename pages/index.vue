<template>
  <v-app id="inspire">
    <v-app-bar app class="darken-4" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link">
          {{ link }}
        </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
    <v-main class="grey darken-3">
      <v-container>
        <v-row>
          <v-col cols="12" lg="2">
            <v-card class="mx-auto">
              <v-sheet rounded="lg" min-height="1800" />
            </v-card>
          </v-col>
          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
            <div v-for="item in article_list" :key="item.id">
              <div class="mx-3 my-5" />
              <v-card class="mx-auto" color="grey darken-2" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">記事作者：{{item.relate_user_name}}</div>
                    <v-list-item-title class="text-h5 mb-1">
                      {{item.title}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      タグ：{{item.tag}}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                      更新日{{item.post_date}}
                      </v-list-item-subtitle>




                  </v-list-item-content>
                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  ></v-list-item-avatar>
                </v-list-item>
                <v-card-actions>
                  <v-btn outlined rounded text> Button </v-btn>
                </v-card-actions>
              </v-card>
              <div class="mx-3 my-5" />
            </div>

            <!--  -->
          </v-col>

          <v-col cols="12" lg="2">
            <v-sheet rounded="lg" min-height="1800">
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
export default {
  components: {
    MainBar,
  },
  data() {
    return {
      article_list: [],
    };
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  async mounted() {
    const article_list = await this.$api.apiGet("/article/list/");
    console.log(article_list);
    this.article_list = article_list;
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
};
</script>