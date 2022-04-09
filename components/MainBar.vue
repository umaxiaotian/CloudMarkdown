<template>
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
      color="blue darken-1"
      size="36"
    >
      <v-icon dark> mdi-draw </v-icon>
    </v-avatar>

    <v-divider class="mx-3 my-5" />
    <div class="mb-5 d-flex justify-center align-center">
      <v-btn icon>
        <v-avatar :size="30" color="green darken-1">
          <v-icon dark> mdi-hammer-wrench </v-icon>
        </v-avatar>
      </v-btn>
    </div>
    <template #append>
      <div class="mb-5 d-flex justify-center align-center">
        <v-btn icon>
          <v-avatar :size="26">
            <v-icon dark> mdi-unicode </v-icon>
          </v-avatar>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {},
};
</script>