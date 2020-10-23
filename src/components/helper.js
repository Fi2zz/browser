import Storage from "@react-native-community/async-storage";

export const ifAboutBlank = (url, callback) => {
  return callback(url == "about:blank");
};
const baidu = `https://baidu.com/s?wd=`;
const bing = `https://bing.com/search?ensearch=1&q=`;
const google = `https://google.com/search?q=`;
const NPM = "https://www.npmjs.com/search?q=";
const github = "https://github.com/search?q=";
const Engines = {
  baidu,
  bing,
  google,
  NPM,
  github,
};
const URLReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
export { URLReg };

export const engine = (search) => {
  if (!search) return "";

  if (search.startsWith("http")) return search;
  if (URLReg.test(search)) return `https://${search}`;
  return `${Engines.baidu}${search}`;
};
export async function tryp(fn, ...args) {
  try {
    let result = await fn(...args);
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}

export async function loadFavorites(def) {
  const [error, result] = await tryp(Storage.getItem, "favorite");
  if (error) return def != undefined ? def : {};
  const parsed = JSON.parse(result);
  if (parsed) {
    if (typeof parsed !== "object") return {};
    return parsed;
  }
  return def != undefined ? def : {};
}
export async function setFavorite(favorites) {
  await tryp(Storage.setItem, "favorite", JSON.stringify(favorites));
}
