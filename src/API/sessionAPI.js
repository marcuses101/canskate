import config from "../config";
const url = `${config.SERVER}/session`;

export const sessionAPI = {
  async addSession(session) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseSession = await response.json();
    return responseSession;
  },
  async editSession(session) {
    const response = await fetch(`${url}/${session.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    if (!response.ok) throw new Error(response.statusText);
    const responseSession = await response.json();
    return responseSession;
  },
};
