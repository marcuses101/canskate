import config from "../config";
const url = `${config.SERVER}/log`;

export const logAPI = {
  async getLogs() {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const logs = await response.json();
      return logs;
    } catch (error) {
      console.error(error);
    }
  },
  async distributeBadge(id) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        log_type: "badge",
        id,
        date_distributed: new Date(),
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(responseData);
      throw new Error(response.statusText);
    }
    return responseData;
  },
  async distributeRibbon(id) {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        log_type: "ribbon",
        id,
        date_distributed: new Date(),
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error(responseData);
      throw new Error(response.statusText);
    }
    return responseData;
  },
  async addElementLog(log) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(log),
    });
    const responseLog = response.json();
    if (!response.ok) {
      console.error(responseLog);
      throw new Error(response.statusText);
    }
    return responseLog;
  },
};
