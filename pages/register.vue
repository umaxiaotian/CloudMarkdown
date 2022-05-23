<template>
  <v-app>
    <Header />
   



<v-container fill-height>


  <v-card class="d-flex flex-column my-6 mx-auto" width="374" color="gray">
    <v-form ref="form" v-model="valid">
      <v-card-title class="d-flex justify-center pa-0 mt-6 mb-3"
        >新規登録</v-card-title
      >
      <v-card-text class="d-flex justify-center flex-column">
        <div class="mx-9">
          <v-text-field
            label="ユーザー名"
            placeholder="15文字以内"
            outlined
            dense
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            label="メールアドレス"
            placeholder="mail@example.com"
            outlined
            dense
            :rules="mailRules"
          ></v-text-field>
          <v-text-field
            label="パスワード"
            placeholder="8文字以上の半角英数記号"
            outlined
            dense
            :rules="pwRules"
          ></v-text-field>
        </div>
        <div class="text-center">
          <v-btn class="primary" :disabled="!valid">登録</v-btn>
        </div>
        <p class="signUp-border-top text-center mt-6 mb-0 pt-6">
          ソーシャルアカウントでログイン
        </p>
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
      </v-card-text>
    </v-form>
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
  created(){
        this.$vuetify.theme.dark = true;
  },
   data() {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || "ユーザー名は必須です",
        (v) => (v && v.length <= 15) || "最大15文字です。",
      ],
      mailRules: [
        (v) => !!v || "メールアドレスは必須です",
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      pwRules: [(v) => !!v || "パスワードは必須です"],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    submitTwitter() {
      // ツイッターログインの処理
    },
    submitGoogle() {
      // グーグルログインの処理
    },
  },
};
</script>