import config from "../config";
const url = `${config.SERVER}/club`;

export const clubAPI = {
  async getClubs() {
    const token = JSON.parse(localStorage.getItem("jwt"))?.accessToken;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    return responseData;
  },
  async addClub(club) {
    const token = JSON.parse(localStorage.getItem("jwt"))?.accessToken;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(club),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(responseData);
      throw new Error(response.statusText);
    }
    return responseData;
  },
  async getClubById(id) {
    const token = JSON.parse(localStorage.getItem("jwt"))?.accessToken;
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const clubData = await response.json();
    return clubData;
  },
};
