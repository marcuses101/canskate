import config from "../config";
const url = `${config.SERVER}/log`;

export const logAPI = {
  async getLogs(){
   try {
     const response = await fetch(url);
     if (!response.ok) throw new Error(response.statusText);
     const logs = await response.json();
     return logs;
   } catch (error) {
    console.error(error)
   }
  },
  async addElementLog(log){
    const response = await fetch(url, {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(log)
    })
    if (!response.ok) throw new Error(response.statusText)
    const responseLog = response.json();
    return responseLog
  }
}