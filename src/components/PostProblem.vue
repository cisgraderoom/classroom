<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="px-7 py-7 rounded white mb-5"
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 5 : 2"
      :to="{ path }"
    >
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
      <p>{{ problemtext }}</p>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "PostProblem",
  props: ["problemid", "problemtext", "who", "date", "path"],
  data: () => ({}),
};
</script>

<style></style>
