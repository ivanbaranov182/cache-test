function Cache() {
  const cacheStorage = new Map();

  return cacheStorage;
}

const bondsFetchCache = Cache("bonds");

export const boundsCachedFetch = async (url, ...rest) => {
  const key = JSON.stringify({ url, rest });
  if (bondsFetchCache.has(key)) {
    return bondsFetchCache.get(key);
  }
  const res = await fetch(url, ...rest);
  const responseValue = res.json();
  bondsFetchCache.set(key, responseValue);

  return responseValue;
};

const http = {
  post: async ({ url, body }) => {
    return await boundsCachedFetch(url, {
      body: JSON.stringify(body),
      method: "POST",
    });
  },
};

export const getBondsData = async ({ date, isins }) => {
  const result = await http.post({
    url: `http://localhost:3000/bonds/${date}`,
    body: isins,
  });
  return result;
};

getBondsData({
  date: "20180120",
  isins: ["XS0971721963", "RU000A0JU4L3"],
}).then(console.log);
