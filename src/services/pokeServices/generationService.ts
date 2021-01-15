import { pokeApi } from "../httpService";

const apiEndpoint = "/generation";

export function generationUrl(identifier: any) {
  return `${apiEndpoint}/${identifier}`;
}

export async function getGenerations() {
  const { data } = await pokeApi.get(apiEndpoint);

  let results: any[] = data.results;
  for (let i = 1; i <= results.length; i++) {
    results[i - 1]._id = i;
  }

  return results;
}
