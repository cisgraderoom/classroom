<template>
  <v-sheet class="px-7 py-7 rounded white mb-5" elevation="3">
    <v-row align="center">
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
    <p>{{ notitext }}</p>
  </v-sheet>
</template>

<script>
export default {
  name: "Notification",
  props: ["notiid", "notitext", "who", "date"],
  data: () => ({}),
};
</script>

<style></style>
