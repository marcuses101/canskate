import config from "../config";
const url = `${config.SERVER}/skater`;

export const skaterAPI = {
  async getSkaters() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const skaters = await response.json();
      return skaters;
    } catch (error) {
      console.error(error);
    }
  },

  async addSkater(skater) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skater),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
  async editSkater(skater) {
    const { id } = skater;
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skater),
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
};
