/** fetches player info then adds it to selectedPlayers Array */
export async function searchPlayerName(name: string): Promise<any> | null {
  if (!name) return null;
  var API = "https://www.balldontlie.io/api/v1/players?search=";
  // Replace spaces with underscores
  let query = name.trim().split(" ").join("_");
  try {
    const response = await fetch(API + query + "&per_page=5");
    // TODO: map out this reponse interface
    const resultObj = await response.json();
    return resultObj.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
