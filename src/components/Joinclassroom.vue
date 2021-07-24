<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn elevation="2" color="primary" block v-bind="attrs" v-on="on">
          Join Classroom
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Join Classroom</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Code Classroom" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="primary" text @click="dialog = false">
            Join Classroom
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Joinclassroom",
  data: () => ({
    dialog: false,
  }),
};
</script>

<style></style>
