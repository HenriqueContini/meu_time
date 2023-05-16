async function api<T>(endpoint: string): Promise<T> {
  const apiKey = sessionStorage.getItem('apiKey');

  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", apiKey!);
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  const response: Response = await fetch(`https://v3.football.api-sports.io/${endpoint}`, {
    method: 'GET',
    headers: myHeaders
  })

  const data = await response.json();
  return data
}

export default api