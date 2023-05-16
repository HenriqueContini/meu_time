// API Key: 1687c9a27e461e39db1d702bf9df57ec

interface CheckStatusTypes {
  errors: []
  response: {
    subscription: {
      active: boolean
    }
  }
}

async function checkStatus(apiKey: string): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  const response: Response = await fetch(`https://v3.football.api-sports.io/status`, {
    method: 'GET',
    headers: myHeaders
  })

  const data: CheckStatusTypes = await response.json();
  
  return data.errors.length === 0 ? true : false;
}

export default checkStatus