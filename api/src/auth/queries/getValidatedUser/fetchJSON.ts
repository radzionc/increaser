import fetch from 'node-fetch'

export const fetchJSON = (url: string, body?: Object) =>
  fetch(url, body).then((r) => r.json())
