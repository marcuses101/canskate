import config from "../config";
const url = `${config.SERVER}/skater`;

export const skaterAPI = {
  async addSkater(skater) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skater),
      });
      if (!response.ok) throw new Error(response.statusText)
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  async editSkater(skater) {
    try {
       const { id } = skater;
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skater),
    });
    if (!response.ok) throw new Error(response.statusText)
    const data = await response.json();
    console.log(data)
    return data;
    } catch (error) {
      console.error(error)
      return false;
    }

  },
};
