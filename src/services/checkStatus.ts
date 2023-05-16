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

  if (data.errors.length === 0) {
    sessionStorage.setItem('apiKey', apiKey)

    return true
  } else {
    return false
  }
}

export default checkStatus