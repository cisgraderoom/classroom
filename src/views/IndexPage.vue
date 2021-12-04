<template>
  <div>
    <Navbar />
    <v-container>
      <v-row>
        <v-col v-show="checkAddClassroom == 0" md="2" class="my-13">
          <Joinclassroom />
        </v-col>
        <v-col
          v-show="checkAddClassroom == 1 || checkAddClassroom == 2"
          md="2"
          class="my-13 mx-2"
        >
          <Addclassroom />
        </v-col>
      </v-row>
      <v-row class="mt-0 mb-10">
        <v-col
          md="3"
          elevation="12"
          xl="2"
          v-for="(classroom, index) in classroom"
          :key="index"
        >
          <Classcard
            :title="classroom.title"
            :section="classroom.section"
            :teacher="classroom.teacher"
            :path="classroom.path"
          />
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
  computed: {
    user() {
      return this.$store.state.authentication.user;
    },
    users() {
      return this.$store.state.users.all;
    },
  },
  created() {
    this.$store.dispatch("users/getAll");
  },
  data: () => ({
    checkAddClassroom: JSON.parse(localStorage.getItem("user")).role,
    classroom: [
      { title: "CS1", section: "1", teacher: "a", path: "/classroom/1" },
      { title: "CS2", section: "2", teacher: "b", path: "/classroom/2" },
      { title: "CS3", section: "3", teacher: "c", path: "/classroom/3" },
      { title: "CS4", section: "4", teacher: "d", path: "/classroom/4" },
    ],
  }),
};
</script>
