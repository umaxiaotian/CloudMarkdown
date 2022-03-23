<template>
  <v-navigation-drawer
    width="380px"
    :class="appBarColor"
    class="darken-3"
    permanent
  >
    <v-toolbar
      :class="appBarColor"
      class="darken-3"
      flat
      :extended="isSearching"
      style="position: sticky; top: 0; z-index: 1; margin-right: 1px"
    >
      <v-toolbar-title> 構文定義 </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="isSearching = !isSearching">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-if="isSearching" #extension>
        <v-text-field
          autofocus
          style="margin-bottom: -25px"
          class="mr-2"
          prepend-inner-icon="mdi-magnify"
          clearable
          rounded
          filled
          solo
          flat
          dense
          placeholder="構文検索"
          @keydown.esc="isSearching = false"
        />
      </template>
    </v-toolbar>
    <v-list subheader two-line>
      <v-subheader>構文リスト</v-subheader>

      <v-list-item v-for="(issue, index) in issues" :key="index" link>
        <v-list-item-content>
          <v-list-item-title>
            {{ issue.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ issue.description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  components: {
  },
  data: () => ({
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
  })
}
</script>
