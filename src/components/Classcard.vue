<template>
  <v-hover v-slot="{ hover }">
    <v-card link :class="{ 'on-hover': hover }" :elevation="hover ? 5 : 2">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="120px"
      ></v-img>
      <v-card-title router-link to="/"> Classname </v-card-title>
      <v-card-subtitle> Section </v-card-subtitle>
      <v-card-actions>
        <v-card-subtitle> name teacher </v-card-subtitle>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              v-for="(menu, index) in menu"
              :key="index"
              :to="menu.route"
            >
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "Classcard",
  data: () => ({
    menu: [
      { title: "Edit", route: "/" },
      { title: "Delete", route: "/" },
    ],
  }),
};
</script>

<style></style>
