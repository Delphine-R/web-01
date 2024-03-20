// TODO #export-functions: export function parseUrl
export function parseUrl(url = window.location.href) {
  const query = url.split("?")[1] || "";
  
  const result = query.split("&")
      .map(item => item.split("="))
      .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
      }, {});

  return result;
}
