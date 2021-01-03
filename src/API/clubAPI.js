import config from "../config";
const url = `${config.SERVER}/club`;

export const clubAPI = {
  async getClubs(){},
  async getClubById(id){
    const response = await fetch(`${url}/${id}`)
    if (!response.ok) throw new Error(response.statusText);
    const clubData = await response.json();
    return clubData
  }
}