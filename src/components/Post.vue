<template>
  <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
    <v-row align="center">
      <v-col md="1">
        <v-icon large>mdi-account-circle</v-icon>
      </v-col>
      <v-col>
        <h3>{{ who }}</h3>
        <caption>
          {{
            date
          }}
        </caption>
      </v-col>
    </v-row>
    <br />
    <p>{{ posttext }}</p>
    <v-row align="top">
      <v-col md="1">
        <v-icon large>mdi-account-circle</v-icon>
      </v-col>
      <v-col md="11">
        <h5>{{ who }}</h5>
        <p>
          {{ posttext }}
        </p>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col md="9">
        <v-text-field v-model="comment" label="Comment" required></v-text-field>
      </v-col>
      <v-col md="2">
        <v-btn elevation="2" color="primary" class="mr-1">comment</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "Post",
  props: ["postid", "posttext", "who", "date"],
  data: () => ({}),
};
</script>

<style></style>
