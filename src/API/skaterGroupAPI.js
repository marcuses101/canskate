import config from "../config";
const url = `${config.SERVER}/skater-group`;

export const skaterGroupAPI = {
  async addSkaterToGroup(skater_id, group_id) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skater_id, group_id }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseData = await response.json();
    return responseData;
  },
  async changeGroup(skater_id, group_id, new_group_id) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skater_id, group_id, new_group_id }),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseData = await response.json();
    return responseData;
  },
};
