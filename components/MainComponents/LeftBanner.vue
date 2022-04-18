<template>
  <div class="toc-view">
    <v-card elevation-12>
      <v-list v-if="isShow">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="user.avater"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list flat color="grey darken-2 shrink">
        <v-subheader>人気タグ</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in tags" :key="i" :href="'/tags?id=' + item.id">
            
            <v-list-item-icon>
              <v-img max-height="30" max-width="30" :src="item.img"></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.tag_name"></v-list-item-title>
              <v-list-item-subtitle
                >投稿：{{ item.post_count }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
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
      tags: [],
      user: [],
      isShow: false,
    };
  },
  async created() {
    this.$vuetify.theme.dark = true;

    const tags = await this.$api.apiGet("/article/tags/list");
    this.tags = tags;
    const isLogin = await this.$util.isLogin();
    if (isLogin) {
      const acsessToken = this.$store.getters.accessToken;
      const header = { Authorization: "Bearer " + acsessToken };
      const user = await this.$api.apiGet("/user/me/", header);
      this.isShow = await this.$util.isLogin();
      this.user = user;
    }
  },

  methods: {},
};
</script>