<template>
  <div class="toc-view">
    <v-card elevation-12>
      <v-list flat color="grey darken-2 shrink">
        <v-subheader>
          <v-icon large color="red darken-2"> mdi-message-alert-outline </v-icon
          >お知らせ</v-subheader
        >
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in notice"
            :key="i"
            @click="showModal(item)"
          >
            <v-list-item-content>
              <v-list-item-title class="text-h9 mb-1">
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.post_date }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<style scoped>
.toc-view {
  position: sticky;
  top: 5rem;
}
</style>

<script>
import MainBar from "@/components/MainBar";
import ListView from "@/components/MainComponents/ListView.vue";
import Header from "@/components/MainComponents/Header.vue";
export default {
  components: {
    MainBar,
    ListView,
    Header,
  },
  data() {
    return {
      notice: [],
    };
  },
  async created() {
    this.notice = await this.$api.apiGet("/notice/list/");
  },

  methods: {
    showModal(item) {
      var extrafile = process.env.extrafile;
      this.$swal.fire({
        title: item.title,

        width: 600,
        padding: "3em",
        color: "#716add",

        backdrop: `
    rgba(0,0,123,0.4)
    url("")
    left top
    no-repeat
  `,
        html: item.detail,
        focusConfirm: false,
      });
    },
  },
};
</script>