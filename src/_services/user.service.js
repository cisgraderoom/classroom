// import config from "../config/config";
import { authHeader } from "../_helpers";
import httpClient from "../_helpers/httpClient";

export const userService = {
  login,
  logout,
  // getAll,
  changepassword,
};

async function login(username, password) {
  const { data } = await httpClient
    .post(`/login`, {
      username,
      password,
    })
    .catch((err) => {
      alert(err?.response?.data?.error);
    });
  if (data.status) {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// function getAll() {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`${config.backendURL}/users`, requestOptions).then(
//     handleResponse
//   );
// }

async function changepassword(oldpassword, newpassword) {
  let response = {};
  const { data } = await httpClient
    .put(
      `/user/changepassword`,
      {
        oldpassword,
        newpassword,
      },
      { headers: authHeader() }
    )
    .catch((err) => {
      response = err?.response?.data;
      return response;
    });
  if (data?.status) {
    response = data;
    alert("Password changed");
    location.reload(true);
  }
  return response;
}

// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
