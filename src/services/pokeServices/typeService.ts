import { pokeApi } from "../httpService";

const apiEndpoint = "/type";

export async function getGenerations() {
  const res = await pokeApi.get("", {
    params: {
      limit: 20,
      offset: 0,
    },
  });

  console.log(res);
}
