import { pokeApi } from "../httpService";

const apiEndpoint = "/type";

export function typeUrl(identifier: any) {
  return `${apiEndpoint}/${identifier}`;
}

export async function getTypes() {
  const { data } = await pokeApi.get(apiEndpoint, {
    params: {
      limit: 20,
      offset: 0,
    },
  });

  let results: any[] = data.results;
  for (let i = 1; i <= results.length; i++) {
    results[i - 1]._id = i;
  }

  return results;
}
