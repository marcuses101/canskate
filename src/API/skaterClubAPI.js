import config from "../config";
const url = `${config.SERVER}/skater-club`;

export const skaterClubAPI = {
  async addSkaterToClub(skater_id, club_id) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skater_id, club_id }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseData = await response.json();
    return responseData;
  },
};
