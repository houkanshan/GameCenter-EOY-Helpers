
export default function fetcher(url) {
  return fetch(url).then(r => {
    return r.text()
  });
}
