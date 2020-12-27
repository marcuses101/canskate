import config from "../config";
const url = `${config.SERVER}/group`;

export const groupAPI = {
  async addGroup(group){
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
  async editGroup(group){
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
