export var API_URL = 'https://api.dev.sarl:443'

export function getArticle (hlink) {
  return fetch(API_URL + '/article/' + hlink)
    .then(function (response) {
    // handle success
      return response.json()
    })
}
