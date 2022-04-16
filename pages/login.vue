<template>
  <v-app>
    <Header />
    <v-main class="grey darken-3">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="blue" dark flat>
                <v-toolbar-title>ログイン</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="ユーザー名"
                    name="user"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="user"
                  />

                  <v-text-field
                    id="password"
                    label="パスワード"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="postLogin" color="blue">ログイン</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/MainComponents/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    async postLogin() {
      if (
        !this.$store.getters.accessToken &&
        !this.$store.getters.refresh_token
      ) {
        const login_result = await this.$api.apiLogin("/token/", {
          username: this.user,
          password: this.password,
        });
        this.$store.commit("accessToken", login_result.access_token);
        this.$store.commit("refreshToken", login_result.refresh_token);
      } else {
        console.log("はいって");
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    const acsessToken = this.$store.getters.accessToken;
    const refreshToken =this.$store.getters.refreshToken;

    if (acsessToken && refreshToken) {
    console.log("INNNNN");
    }
  },
};
</script>