<template>
  <v-app>
    <Header />
    <MainBar />
    <v-main>
      <div style="display: flex; min-height: min-content">
        <div style="height: 100vh; overflow: auto">
          <Toolbar v-if="isShowToolbar" />
        </div>
        <div
          id="main-content"
          style="height: 100vh; width: 100%; overflow: auto"
        >
          <Editor />
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
 

  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
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
<style >

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(rgb(211, 211, 211), rgb(211, 211, 211));
}

::-webkit-scrollbar-thumb {
  background: #7c7c7c;
  border-radius: 5px;
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
