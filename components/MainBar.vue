<template>
  <div v-if="isLogin">
    <v-navigation-drawer
      mini-variant
      app
      class="darken-4"
      permanent
      disable-route-watcher
    >
      <div class="d-block text-center mx-auto mt-4">
        <v-btn icon :href="'/user/editor'">
          <v-avatar color="blue darken-1" size="36">
            <v-icon dark> mdi-draw </v-icon>
          </v-avatar>
        </v-btn>
      </div>
      <v-divider class="mx-3 my-5" />
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item v-for="(item, i) in items" :key="i" :href="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template #append>
        <div class="mb-5 d-flex justify-center align-center">
          <v-btn color="primary" dark @click="openUserProfile()">
            <v-avatar :size="26">
              <v-icon dark> mdi-account-cog </v-icon>
            </v-avatar>
          </v-btn>
        </div>
      </template>
      <UserProfile v-model="dialog" />
    </v-navigation-drawer>
  </div>
</template>
<script>
import UserProfile from "@/components/UserComponents/UserProfile";
export default {
  components: {
    UserProfile,
  },
  data() {
    return {
      isLogin: false,
      model: null,
      dialog: false,
      items: [
        {
          text: "自分の記事",
          icon: "mdi-file-document-multiple",
          link: "/user/article",
        },
      ],
    };
  },
  methods: {
    openUserProfile() {
      this.dialog = true;
    },
  },
  async created() {
    this.isLogin = await this.$util.isLogin();

    //現在の選択されている位置を取得する
    const path = this.$route.path;
    this.items.forEach((element, index) => {
      if (element.link == path) {
        this.model = index;
      }
    });
  },
};
</script>