import config from "../config";
const url = `${config.SERVER}/group`;

export const groupAPI = {
  async addGroup(group) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseGroup = await response.json();
    return responseGroup;
  },
  async editGroup(group) {
    const response = await fetch(`${url}/${group.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseGroup = await response.json();
    return responseGroup;
  },
  async deleteGroup(group) {
    const response = await fetch(`${url}/${group.id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseText = await response.text();
    return responseText;
  },
};
