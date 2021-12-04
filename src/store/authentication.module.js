import { userService } from "../_services";
import router from "../router/index";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit("loginRequest", { username });

      userService.login(username, password).then(
        (user) => {
          commit("loginSuccess", user);
          router.push("/index");
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },

    changepassword({ commit }, { oldpassword, newpassword }) {
      commit("changepasswordRequest", { oldpassword, newpassword });
      userService.changepassword(oldpassword, newpassword).then(
        // (user) => {
        //   // console.log(user);
        //   commit("changepasswordSuccess", user);
        // },
        // (error) => {
        //   console.log(error);
        //   commit("changepasswordFailure", error);
        //   dispatch("alert/error", error, { root: true });
        // }
        (data) => {
          console.log(data);
        }
      );
    },

    logout({ commit }) {
      userService.logout();
      commit("logout");
    },
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    changepasswordRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    changepasswordSuccess(state) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    changepasswordFailure(state) {
      state.status = { loggedIn: true };
      state.user = user;
    },
  },
};
