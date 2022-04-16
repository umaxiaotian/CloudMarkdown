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
            <v-card class="mx-auto">
              <v-sheet rounded="lg" min-height="300" />
            </v-card>
          </v-col>
          <ListView :articles="article_list" />
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
    Header
  },
  data() {
    return {
      article_list: [],
      model: this.$route.path,
      links: [
        {title: "TREND", address : "/"},
        {title: "SEARCH", address : "/search"},
        {title: "Profile", address : "/profile"},
        {title: "ReleaseNote", address : "/releasenote"},
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