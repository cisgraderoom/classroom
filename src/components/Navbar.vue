<template>
  <v-app-bar app color="#FFFFFF">
    <div class="d-flex align-center">
      <v-img
        alt="CISClassroom Logo"
        class="shrink mr-2"
        contain
        src="../assets/ciskmutnb.png"
        transition="scale-transition"
        width="45"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
