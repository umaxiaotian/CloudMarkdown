<template>
  <v-app>
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
          <v-btn
            class="fill-width mt-6 text-capitalize caption mx-4"
            rounded
            color="#00ACEE"
            dark
            depressed
            height="48px"
            @click="submitTwitter"
          >
            <img
              class="button-logo-img mr-4"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
              style="height: 20px"
            />
            twitterでログイン
          </v-btn>
          <v-btn
            class="fill-width mt-6 text-capitalize caption mx-4 mb-6"
            rounded
            height="48px"
            outlined
            style="border-color: #979797"
            @click="submitGoogle"
          >
            <img
              class="button-logo-img mr-4"
              src="https://madeby.google.com/static/images/google_g_logo.svg"
              style="height: 24px"
            />
            Googleでログイン
          </v-btn>
          <p class="text-center pt-3 mt-3 text-subtitle-1 siginIn-border-top">
            メールアドレスでログイン
          </p>
          <v-form class="mx-9" ref="form" v-model="valid">
            <v-text-field
              placeholder="メールアドレス"
              outlined
              dense
              v-model="user"
              :rules="mailRules"
            ></v-text-field>
            <v-text-field
              placeholder="パスワード"
              outlined
              dense
              v-model="password"
              :rules="pwRules"
            ></v-text-field>
            <p class="pointer" @click="forgetPw">パスワードを忘れた方</p>
            <div class="text-center">
              <v-btn class="primary" :disabled="valid" @click="postLogin()"
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
      mailRules: [
        (v) => !!v || "メールアドレスは必須です",
        (v) => /.+@.+\..+/.test(v) || "正しいメールアドレスを入力してください",
      ],
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
    submitTwitter() {
      // ツイッターログインの処理
    },
    submitGoogle() {
      // グーグルログインの処理
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

        if (login_result.data) {
          this.$store.commit("accessToken", login_result.data.access_token);
          this.$store.commit("refreshToken", login_result.data.refresh_token);
        } else {
          this.$swal.fire({
            icon: "error",
            title: "エラー",
            text: login_result.data.detail,
          });
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