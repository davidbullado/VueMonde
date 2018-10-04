var API_URL = 'http://127.0.0.1:5001'

export function getArticle (hlink) {
  return fetch(API_URL + '/article/' + hlink)
    .then(function (response) {
    // handle success
      return response.json()
    })
}
