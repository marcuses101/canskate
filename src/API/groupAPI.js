import config from "../config";
const url = `${config.SERVER}/group`;

export const groupAPI = {
  async addgroup(group){
   try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(group)
    })
    const responseGroup = await response.json();
    return responseGroup;
   } catch (error) {
    console.error(error)
    return false
   }
  },
  async editgroup(group){
    try {
      const response = await fetch(`${url}/${group.id}`,{
        method:'PATCH',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
      })
      const responseGroup = await response.json();
      return responseGroup
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
