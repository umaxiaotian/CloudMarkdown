<template>
  <v-app>
    <!-- <Header /> -->
    <MainBar />
    <v-main>
      <div style="display: flex; min-height: min-content">
        <div style="height: 100vh; overflow: auto">
          <Toolbar
            v-if="isShowToolbar"
            :article_detail="article"
            :tags_all="tags_all"
            @save="saveArticle"
          />
        </div>
        <div
          id="main-content"
          style="height: 100vh; width: 100%; overflow: auto"
        >
          <Editor :article_detail="article" />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MainBar from "@/components/MainBar";
import Header from "@/components/MainComponents/Header.vue";
import Editor from "@/components/EditorComponents/Editor";
import Toolbar from "@/components/EditorComponents/Toolbar";
export default {
  components: {
    Editor,
    Toolbar,
    MainBar,
    Header,
  },
  data: () => ({
    isShowToolbar: true,
    article: [],
    article_id: null,
    tags_all: [],
  }),
  async created() {
    this.$vuetify.theme.dark = true;

    this.tags_all = await this.$api.apiGet("/article/tags/list_all");
    //外部から来た人向けのサーチパラムGET
 
      this.getArticleID();
      await this.getArticle();
    
  },

  methods: {
    getArticleID(){
   this.article_id = this.$route.query.id;
    },
    async saveArticle(title, filename, selection_tag, define_editor_text) {
      let params = new FormData();
      params.append("title", title);
      params.append("filename", filename);
      params.append("selection_tag", JSON.stringify(selection_tag));
      params.append("define_editor_text", define_editor_text);

      if(!this.article_id){
      const article_id = await this.$util.authPost("/post_article/", params);
      this.article_id = article_id;
      this.$router.push("/user/editor?id="+article_id);

      }else{
        console.log("ID_INNN")
      }
    },
    async getArticle() {
      if (await this.$util.isLogin() && this.article_id) {
        this.article = await this.$util.authGet(
          "/user/article/" + this.article_id
        );

        if (this.article.is_publish) {
          this.$router.push("/");
        }
      }
    },
    clickToolBar() {
      if (this.isShowToolbar == false) {
        this.isShowToolbar = true;
      } else {
        this.isShowToolbar = false;
      }
    },
  },
};
</script>
