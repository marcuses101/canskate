import config from "../config";
const url = `${config.SERVER}/session`;

export const sessionAPI = {
  async addSession(session){
    console.log(url)
   try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(session)
    })
    const responseSession = await response.json();
    return responseSession;
   } catch (error) {
    console.error(error)
    return false
   }
  },
  async editSession(session){
    try {
      const response = await fetch(`${url}/${session.id}`,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(session)
      })
      const responseSession = await response.json();
      return responseSession
    } catch (error) {
      console.error(error)
      return false
    }
  }
}


