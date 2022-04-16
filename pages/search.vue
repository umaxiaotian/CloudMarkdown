<template>
  <v-app id="inspire">
    <v-app-bar app class="darken-4" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>
      <Header />
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
            <v-card class="mx-auto" max-width="300" tile light>
              <v-list flat>
                <v-subheader>REPORTS</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <!-- コンテンツ一覧 -->
          <v-col cols="12" lg="8">
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
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
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