<template>
  <div>
    <Navbar />
    <v-container>
      <v-form>
        <v-row>
          <v-col
            md="6"
            offset-md="3"
            class="px-12 py-16 rounded-lg white mt-15"
            elevation="12"
            xl="4"
            offset-xl="4"
          >
            <h1>Edit Account</h1>
            <v-text-field
              v-model="oldpassword"
              :type="show1 ? 'text' : 'password'"
              label="Old password"
              required
            ></v-text-field>
            <v-text-field
              v-model="newpassword"
              :type="show1 ? 'text' : 'password'"
              label="New password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmpassword"
              :type="show1 ? 'text' : 'password'"
              label="Confirm password"
              required
            ></v-text-field>

            <v-btn router-link to="/Index" elevation="2" color="primary" block
              >Change Password</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  name: "Editaccount",
  components: {
    Navbar,
  },
};
</script>
