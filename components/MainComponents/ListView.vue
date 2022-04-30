<template>
  <div>
    <div v-for="item in viewLists" :key="item.id">
      <v-card class="mx-auto elevation-12" color="grey darken-2" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-3">
              <h3>
                <a
                  style="text-decoration: none; color: white"
                  :href="'/member?id=' + item.relate_user_id"
                  >記事作者：{{ item.relate_user_name }}</a
                >
              </h3>
            </div>
            <div class="text-overline mb-4">投稿日：{{ item.post_date }}</div>
            <v-list-item-title class="text-h5 mb-1">
              <nuxt-link
                style="color: inherit; text-decoration: none"
                :to="'/article?article_id=' + item.id"
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
            color="blue"
            v-for="tag in item.tags"
            :key="tag.id"
            :href="'/tags?id=' + tag.tag_id"
          >
            {{ tag.tag_name }}
          </v-chip>
        </div>
        <v-card-actions>
          <v-card-title>
            <v-icon large left color="red"> mdi-heart </v-icon>
            <span class="text-h6 font-weight-light">いいね：{{ item.good_count }}</span>
          </v-card-title>
        </v-card-actions>
      </v-card>
      <div class="mx-3 my-5" />
    </div>
    <v-pagination
      v-model="page"
      :length="length"
      color="blue"
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
    this.$vuetify.theme.dark = true;
  },

  methods: {
    pageChange(pageNumber) {
      this.viewLists = this.lists.slice(
        this.pageSize * (pageNumber - 1),
        this.pageSize * pageNumber
      );
    },
  },
};
</script>