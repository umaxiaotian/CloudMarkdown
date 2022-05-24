<template>
  <v-app
    style="
      background-image: url('https://gochiusa.com/core_sys/images/main/cont/special/43/chino_1920.jpg');
      background-size: cover;
    "
  >
    <Header />
    <v-container fill-height>
      <v-card
        class="d-flex flex-column mx-auto my-6 flat"
        width="374"
        color="gray"
      >
        <v-card-title class="d-flex justify-center pa-0 mt-6"
          >ログイン</v-card-title
        >
        <v-card-text class="d-flex justify-center flex-column">
          <p class="text-center pt-3 mt-3 text-subtitle-1 siginIn-border-top">
            ユーザー名でログイン
          </p>
          <v-form class="mx-9" ref="form" v-model="valid">
            <v-text-field
              placeholder="ユーザー名"
              outlined
              dense
              v-model="user"
              :rules="usrRules"
            ></v-text-field>
            <v-text-field
              placeholder="パスワード"
              outlined
              dense
              type="password"
              v-model="password"
              :rules="pwRules"
            ></v-text-field>
            <p class="pointer" @click="forgetPw">パスワードを忘れた方</p>
            <div class="text-center">
              <v-btn color="blue" :disabled="!valid" @click="postLogin()"
                >ログイン</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
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
      valid: false,
      usrRules: [(v) => !!v || "ユーザー名は必須です"],
      pwRules: [(v) => !!v || "パスワードは必須です"],
      user: "",
      password: "",
    };
  },
  head() {
    return {
      title: "ログイン",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    forgetPw() {
      // パスワードを忘れた時の処理
    },

    async postLogin() {
      //認証情報が入っていない時だけ実行
      if (
        !this.$store.getters.accessToken &&
        !this.$store.getters.refresh_token
      ) {
        const login_result = await this.$api.apiLogin("/token", {
          username: this.user,
          password: this.password,
        });

        if (login_result && login_result.data) {
          this.$store.commit("accessToken", login_result.data.access_token);
          this.$store.commit("refreshToken", login_result.data.refresh_token);
        } else {
          console.log("Authenticate Error");
        }
      }

      //認証したら/へジャンプする。
      const acsessToken = this.$store.getters.accessToken;
      const refreshToken = this.$store.getters.refreshToken;
      if (acsessToken && refreshToken) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;

    //認証したら/へジャンプする。
    const acsessToken = this.$store.getters.accessToken;
    const refreshToken = this.$store.getters.refreshToken;
    if (acsessToken && refreshToken) {
      this.$router.push("/");
    }
  },
};
</script>