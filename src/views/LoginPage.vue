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
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
            ></v-text-field>
            <v-alert text type="error" v-show="loginfail == true"
              >Username or password is incorrect</v-alert
            >
            <v-btn @click="handleSubmit" elevation="2" color="primary" block
              >login</v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            ><p class="text-center">
              ติดต่อสอบถามและแก้ปัญหาระบบ :
              <a href="https://discord.gg/w9cvvB9yWv" target="_blank"
                >Discord</a
              >
            </p>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      usernameRules: [(v) => !!v || "Username is required"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      submitted: false,
      loginfail: false,
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password });
      } else {
        this.loginfail = true;
      }
    },
  },
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
