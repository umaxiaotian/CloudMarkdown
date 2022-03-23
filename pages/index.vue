<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant
      app
      :class="appBarColor"
      class="darken-4"
      permanent
      disable-route-watcher
    >
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey darken-1"
        size="36"
      />
      <v-divider class="mx-3 my-5" />
      <div class="mb-5 d-flex justify-center align-center">
        <v-btn icon @click="clickToolBar">
          <v-avatar :size="26">
            <v-icon dark> mdi-hammer-wrench </v-icon>
          </v-avatar>
        </v-btn>
      </div>
      <template #append>
        <div class="mb-5 d-flex justify-center align-center">
          <v-btn icon>
            <v-avatar :size="26">
              <img src="//www.gravatar.com/avatar/none?f=y&d=mm">
            </v-avatar>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
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
import Editor from '@/components/Editor'
import Toolbar from '@/components/Toolbar'
export default {
  components: {
    Editor,
    Toolbar
  },
  data: () => ({
    isShowToolbar: false,
    drawer: true,
    appBarColor: 'grey',
    appBarTitle: 'Tasks',
    appBarIcon: 'mdi-lightbulb',
    isSearching: false,
    links: [
      { label: 'Inbox', icon: 'mdi-inbox', color: 'background' },
      {
        label: 'Planned',
        icon: 'mdi-clock-outline',
        color: 'background'
      }
    ],
    projects: [
      { label: 'Accounting', color: 'cyan', due_count: 1 },
      { label: 'Secret Game', color: 'green' },
      { label: 'Dashboard', color: 'blue', due_count: 1 }
    ],
    issues: [
      {
        title: 'テーブル',
        order: 1,
        description: '表機能を追加します。デフォルトでは4x4'
      },
      {
        title: '画像挿入',
        order: 2,
        description: '画像挿入タグを挿入します。'
      }
    ]
  }),
  head () {
    return {
      title: 'MsdMD Code'
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    clickToolBar () {
      if (this.isShowToolbar == false) {
        this.isShowToolbar = true
      } else {
        this.isShowToolbar = false
      }
    }
  }
}
</script>
<style >
/* ::-webkit-scrollbar {
    display: none;
} */
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
