<template>
  <div>
    <div class="container">
      <v-form>
        <v-row>
          <v-col
            md="6"
            offset-md="3"
            class="px-12 py-16 rounded-lg white"
            elevation="12"
            xl="4"
            offset-xl="4"
          >
            <v-img
              alt="CISClassroom Logo"
              class="shrink mx-auto"
              contain
              src="../assets/ciskmutnb.png"
              transition="scale-transition"
              width="70"
            />
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              required
            ></v-text-field>

            <v-btn router-link to="/index" elevation="2" color="primary" block
              >login</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
