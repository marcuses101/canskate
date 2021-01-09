import config from '../config'
const url = `${config.SERVER}/skater-session`

export const skaterSessionAPI = {
  async addSkaterToSession(skater_id,session_id){
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({skater_id,session_id})
    })
    if (!response.ok) throw new Error(response.statusText)
    const responseData = await response.json();
    return responseData
  },
  async removeSkaterFromSession(skater_id,session_id){
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({skater_id,session_id})
    })
    if (!response.ok) throw new Error(response.statusText)
    const responseData = await response.text();
    return responseData
  }
}