import config from "../config";
const url = `${config.SERVER}/user`;

export const userAPI = {
  async submitLogin(login) {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
    const jwt = await response.json();
    if (!response.ok) {
      console.error(jwt);
      throw new Error(response.statusText);
    }
    return jwt;
  },
  async addUser(user) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const responseData = await response.text();
    console.log(responseData)
    if (!response.ok) {
      console.error(responseData);
      throw new Error(response.statusText);
    }
    return responseData;
  },
};
