<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import { logger } from "@cisclassroom/logger";
export default {
  name: "App",
  mounted() {
    // logger.fail("Fail")
  },
  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  background-color: #f5f5f5;
}
</style>
