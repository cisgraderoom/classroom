<template>
  <v-app-bar app color="#FFFFFF">
    <div class="d-flex align-center">
      <v-img
        alt="CISClassroom Logo"
        class="shrink mr-2 ml-2"
        contain
        src="../assets/ciskmutnb.png"
        transition="scale-transition"
        width="45"
      />
    </div>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon large>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          link
          v-for="(link, index) in link"
          :key="index"
          :to="link.route"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    link: [
      { title: "Account", route: "/Account" },
      { title: "Logout", route: "/" },
    ],
  }),
};
</script>

<style></style>
