<template >
  <v-dialog v-model="_model" persistent max-width="600px">
    <v-card>
      <v-toolbar flat color="blue darken-3" dark>
        <v-toolbar-title>ユーザー設定</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>
            mdi-account
          </v-icon>
          アカウント
        </v-tab>
        <v-tab>
          <v-icon left>
            mdi-lock
          </v-icon>
          パスワード
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              <span class="text-h5">アカウント設定</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="2">
                    <v-list-item-avatar>
                      <v-img :src="user.avater | changeImgPath"></v-img>
                    </v-list-item-avatar>
                  </v-col>
                  <v-col cols="10">
                    <v-file-input :value="user.avater | profileImgToText" accept="image/png, image/jpeg, image/bmp" placeholder="画像を挿入してください"
                      prepend-icon="mdi-plus-box-multiple" label="プロフィール画像" ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="氏名*"  v-model="user.name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="ニックネーム*"   v-model="user.nickname"  hint="このウェブサイトでユーザー名として表示されます。" persistent-hint required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="メールアドレス*"  v-model="user.email" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*は必須項目です。</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="_model = false">
                閉じる
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveUserProfile()"> 保存 </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-title>
              <span class="text-h5">パスワード設定</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="現在のパスワード*" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="新パスワード*" type="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="新パスワード再度入力*" type="password" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*は必須項目です。</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="_model = false">
                閉じる
              </v-btn>
              <v-btn color="blue darken-1" text @click="_model = false"> 保存 </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  model: {
    prop: 'parentModel',
    event: 'input'
  },
  props: {
    parentModel: Boolean
  },
  computed: {
    _model: {
      get () {
        return this.parentModel
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods:{
    saveUserProfile(){
      console.log(this.user.name);
    }
  },
  filters: {
    changeImgPath(img) {
      var BaseUrl = process.env.baseUrl;
      return BaseUrl + "/extraResource/" + img;
    },
    profileImgToText(value){
      return new File(["image"], value, {
        type: "text/plain",
      });
    }
  },
  async created() { 
    const isLogin = await this.$util.isLogin();
    if (isLogin) {
      const acsessToken = this.$store.getters.accessToken;
      const header = { Authorization: "Bearer " + acsessToken };
      this.user = await this.$api.apiGet("/user/me/", header);
    }
  },
};
</script>