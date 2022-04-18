<template>
  <div v-if="isLogin">
    <v-navigation-drawer
      mini-variant
      app
      class="darken-4"
      permanent
      disable-route-watcher
      >
      <div class="d-block text-center mx-auto mt-4">
        <v-btn icon href="/user/editor">
          <v-avatar color="blue darken-1" size="36">
            <v-icon dark> mdi-draw </v-icon>
          </v-avatar>
        </v-btn>
      </div>
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
              <v-icon dark> mdi-account-cog </v-icon>
            </v-avatar>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  async created() {
    this.isLogin =await this.$util.isLogin();
  },
};
</script>