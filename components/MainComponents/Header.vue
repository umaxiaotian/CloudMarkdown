<template>
  <v-app-bar app class="darken-4" flat>
    <v-avatar />
    <v-tabs class="ml-n9" color="grey darken-1" v-model="model">
      <v-tab v-for="(link, index) in links" :key="index" :href="link.address">
        {{ link.title }}
      </v-tab>
    </v-tabs>

    <v-text-field
      v-model="search"
      clearable
      flat
      solo-inverted
      hide-details
      label="記事を探す"
      style="min-width: 300px"
    ></v-text-field>
    <v-btn icon @click="searchText()">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn v-if="!isLogin" class="ma-2" color="green" @click="register()">
      新規登録
    </v-btn>
    <v-btn v-if="!isLogin" class="ma-2" color="primary" @click="login()">
      ログイン
    </v-btn>
    <v-btn v-if="isLogin" class="ma-2" color="primary" @click="logout()">
      ログアウト
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      buttonText: "",
      isLogin: false,
      article_list: [],
      model: this.$route.path,
      links: [
        { title: "TREND", address: "/" },
        { title: "SEARCH", address: "/search" },
        { title: "TAGS", address: "/tags" },
        { title: "MEMBER", address: "/member" },
      ],
    };
  },
  created() {
    const acsessToken = this.$store.getters.accessToken;
    const refreshToken = this.$store.getters.refreshToken;
    if (acsessToken && refreshToken) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },
    async logout() {
      this.$store.commit("accessToken", null);
      this.$store.commit("refreshToken", null);
      this.$router.push("/login");
    },
    searchText() {
      this.$router.push({
        path: "/search",
        query: { searchText: this.search },
      });
    },
  },
};
</script>