<template>
  <div>
    <div v-for="item in viewLists" :key="item.id">
      <v-card class="mx-auto elevation-12" color="black" outlined>
        <v-card-actions>
          <v-row align="center">
            <v-card v-if="item.is_publish == true" color="green darken-1">
              <h2>公開コンテンツ</h2>
            </v-card>
            <v-card v-if="item.is_publish == false" color="orange darken-1">
              <h2>非公開コンテンツ</h2>
            </v-card>
          </v-row>
        </v-card-actions>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-3">
              <h3>記事作者：{{ item.relate_user_name }}</h3>
            </div>
            <div class="text-overline mb-4">投稿日：{{ item.post_date }}</div>
            <v-list-item-title class="text-h5 mb-1">
              <nuxt-link
                style="color: inherit; text-decoration: none"
                :to="'/user/article_detail?article_id=' + item.id"
                >{{ item.title }}</nuxt-link
              >
            </v-list-item-title>
            <v-list-item-subtitle>{{ item.detail }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="grey">
            <img :src="item.img | changeImgPath"
          /></v-list-item-avatar>
        </v-list-item>
        <div class="text-left">
          <v-chip
            class="ma-2"
            color="primary"
            v-for="tag in item.tags"
            :key="tag.id"
            :href="'/tags?id=' + tag.tag_id"
          >
            {{ tag.tag_name }}
          </v-chip>
        </div>
        <v-card-actions>
          <v-btn rounded color="pink" dark disabled>
            {{ item.good_count }}
            <v-icon dark right> mdi-heart </v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-row align="center" justify="end">
            <v-btn v-if="item.is_publish == false" icon @click="publish(item)">
              <v-avatar color="orange darken-1" size="56">
                <v-icon dark> mdi-cloud-upload </v-icon>
              </v-avatar>
            </v-btn>

            <v-avatar size="26" />
            <v-btn
              icon
              v-if="item.is_publish == false"
              @click="deleteArticle(item)"
            >
              <v-avatar color="red darken-1" size="56">
                <v-icon dark> mdi-delete </v-icon>
              </v-avatar>
            </v-btn>
            <v-avatar size="26" />
            <v-btn
              icon
              v-if="item.is_publish == false"
              :href="'/user/editor?id=' + item.id"
            >
              <v-avatar color="primary darken-1" size="56">
                <v-icon dark> mdi-draw </v-icon>
              </v-avatar>
            </v-btn>

            <v-btn
              v-if="item.is_publish == true"
              icon
              @click="disPublish(item)"
            >
              <v-avatar color="pink" size="56">
                <v-icon dark> mdi-web-cancel </v-icon>
              </v-avatar>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
      <div class="mx-3 my-5" />
    </div>
    <v-pagination
      v-model="page"
      :length="length"
      color="primary"
      @input="pageChange"
    ></v-pagination>
  </div>
  <!-- ここまで記事リスト -->
</template>

<script>
import MainBar from "@/components/MainBar";
export default {
  components: {
    MainBar,
  },
  props: {
    articles: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      page: 1,
      length: 0,
      lists: [],
      viewLists: [],
      pageSize: 10,
    };
  },
  watch: {
    //親コンポーネントからVALUEを取得
    articles(val) {
      this.lists = val;
    },
    //listsに値が入力されたら
    lists(lists) {
      this.length = Math.ceil(lists.length / this.pageSize);
      this.viewLists = lists.slice(0, this.pageSize);
    },
  },
  filters: {
    changeImgPath(img) {
      var BaseUrl = process.env.baseUrl;
      return BaseUrl + "/extraResource/" + img;
    },
  },

  async created() {
    
  },

  methods: {
    async publish(val) {
      await this.$util.authPut("/user/article/publish/" + val.id);

      //親コンポーネントの情報を更新させる
      this.$emit("refresh", null);
    },
    refresh(){},
    async deleteArticle(val) {
      this.$swal
        .fire({
          title: "削除",
          html: "本当にこの記事を削除しますか？</br>削除すると二度と修復できません！",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "削除",
          cancelmButtonText: "キャンセル",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$util.authDelete("/user/article/delete/" + val.id);
            this.$emit("refresh", null);
          }
        });

      //親コンポーネントの情報を更新させる
    
    },

    async disPublish(val) {
      await this.$util.authPut("/user/article/dispublish/" + val.id);

      //親コンポーネントの情報を更新させる
      this.$emit("refresh", null);
    },

    pageChange(pageNumber) {
      this.viewLists = this.lists.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>