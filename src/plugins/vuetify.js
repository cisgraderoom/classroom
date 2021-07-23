import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#F4511E",
        secondary: "#1E88E5",
        background: "#1E88E5",
      },
    },
  },
});

export default vuetify;
