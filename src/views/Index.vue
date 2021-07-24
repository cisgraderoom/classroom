<template>
  <div>
    <Navbar />
    <v-container>
      <v-row>
        <v-col md="2" class="my-13"> <Joinclassroom /> </v-col>
        <v-col md="2" class="my-13 mx-2">
          <Addclassroom />
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-10">
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
        <v-col md="3" elevation="12" xl="2">
          <Classcard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Classcard from "../components/Classcard";
import Joinclassroom from "../components/Joinclassroom";
import Addclassroom from "../components/Addclassroom";
export default {
  name: "Index",
  components: {
    Navbar,
    Classcard,
    Addclassroom,
    Joinclassroom,
  },
};
</script>
