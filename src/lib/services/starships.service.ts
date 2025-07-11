export const fetchStarships = async (page = 1) => {
  const res = await fetch(`https://swapi.tech/api/starships/?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch starships");

  const data = await res.json();

  const starships = await Promise.all(
    data.results.map(async (result: any) => {
      const res = await fetch(result.url);
      const shipData = await res.json();
      return shipData.result.properties; 
    })
  );

  return starships;
};


export const searchStarships = async (query: string) => {
  if (!query) return [];

  const res = await fetch(`https://swapi.py4e.com/api/starships/?search=${query}`);
  if (!res.ok) throw new Error("Failed to search starships");

  const data = await res.json();

  return data.results;
};


