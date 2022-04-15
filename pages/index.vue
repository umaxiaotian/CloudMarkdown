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
              <v-sheet rounded="lg" min-height="300" />
            </v-card>
          </v-col>
          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
            <div v-for="item in viewLists" :key="item.id">
              <v-card class="mx-auto" color="grey darken-2" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="text-overline mb-4">
                      記事作者：{{ item.relate_user_name }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                      <nuxt-link style="color:inherit;text-decoration:none;" to="/shop/register">{{item.title}}</nuxt-link>
                    </v-list-item-title>
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
                    color="primary"
                    v-for="tag in item.tags"
                    :key="tag.id"
                  >
                    {{ tag.tag_name }}
                  </v-chip>
                </div>
                <v-card-actions>
                  <v-btn  rounded   color="pink darken-3" dark >
                    {{item.good_count}}
                    <v-icon dark right> mdi-heart </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <div class="mx-3 my-5" />
            </div>
            <v-pagination
              v-model="page"
              :length="length"
              @input="pageChange"
            ></v-pagination>
            <!--  -->
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
export default {
  components: {
    MainBar,
  },
  data() {
    return {
      page: 1,
      length: 0,
      lists: [],
      viewLists: [],
      pageSize: 3,
      links: ["TREND", "Messages", "Profile", "ReleaseNote"],
    };
  },
  async created() {
    this.$vuetify.theme.dark = true;

    const article_list = await this.$api.apiGet("/article/list/");
    this.lists = article_list;
    this.length = Math.ceil(this.lists.length / this.pageSize);
    this.viewLists = this.lists.slice(0, this.pageSize);
  },

  methods: {
    pageChange(pageNumber) {
      this.viewLists = this.lists.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>