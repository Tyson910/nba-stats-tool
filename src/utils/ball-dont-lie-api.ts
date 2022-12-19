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

export async function fetchStatsInADateRange(
  playerID: string,
  startDate: string,
  endDate: string,
): Promise<any[]> {
  const API = `https://www.balldontlie.io/api/v1/stats/?start_date=${
    createAPIDate(startDate)
  }&end_date=${createAPIDate(endDate)}&player_ids[]=`;
  try {
    const response = await fetch(API + playerID);
    const resultObj = await response.json();
    const dataArray = resultObj.data;
    if (dataArray.length < 1) return null;
    //sorts games by date in ascending order
    return dataArray.sort((a, b) =>
      new Date(a.game.date) - new Date(b.game.date)
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * returns date in 'YYYY-MM-DD' numerical format for API reference
 */
function createAPIDate(uglyDate: Date): string {
  // API saves Jan == 1, Feb ==2 so we add 1 to the get Month function
  return uglyDate.getFullYear() + "-" + (uglyDate.getMonth() + 1) + "-" +
    uglyDate.getDate();
}