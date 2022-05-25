<template>
  <v-app
    style="
      background-image: url('https://gochiusa.com/core_sys/images/main/cont/special/43/chino_1920.jpg');
      background-size: cover;
    "
  >
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
                v-model="registerForm.user"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="ニックネーム"
                placeholder="15文字以内"
                outlined
                dense
                v-model="registerForm.nickname"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="メールアドレス"
                placeholder="mail@example.com"
                outlined
                dense
                v-model="registerForm.email"
                :rules="mailRules"
              ></v-text-field>
              <v-text-field
                label="パスワード"
                placeholder="8文字以上の半角英数記号"
                outlined
                dense
                type="password"
                v-model="registerForm.password_first"
                :rules="pwRules"
              ></v-text-field>
              <v-text-field
                label="パスワード確認"
                placeholder="8文字以上の半角英数記号"
                outlined
                dense
                type="password"
                v-model="registerForm.password_last"
                :rules="pwRules"
              ></v-text-field>
            </div>
            <div class="text-center">
              <v-btn class="primary" :disabled="!valid" @click="register()"
                >登録</v-btn
              >
            </div>
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
  created() {},
  data() {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || "ユーザー名は必須です",
        (v) => (v && v.length <= 15) || "最大15文字です。",
      ],
      mailRules: [
        (v) => !!v || "メールアドレスは必須です",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      pwRules: [(v) => !!v || "パスワードは必須です"],
      registerForm: [],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async register() {
      console.log(this.registerForm.user);
      //パスワード突合チェック
      if (this.registerForm.password_first != this.registerForm.password_last) {
        this.$swal.fire({
          icon: "error",
          title: "バリデーションエラー",
          text: "パスワードが一致していません。",
        });
      } else {
        //OK

        var user_params = new URLSearchParams();
        user_params.append("username", this.registerForm.user);
        user_params.append("password", this.registerForm.password_first);
        user_params.append("nickname", this.registerForm.nickname);
        user_params.append("email", this.registerForm.email);

        const token = await this.$api.apiPost("/register", null, user_params);

        if (token) {
          this.$store.commit("accessToken", token.access_token);
          this.$store.commit("refreshToken", token.refresh_token);
          this.$router.push("/user/article");
        } else {
          console.log("Authenticate Error");
        }
      }
    },
  },
};
</script>