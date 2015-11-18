import isEmpty from 'lodash.isempty'

export default function callDictionary (word) {
  var apiURL = 'http://api.wordnik.com:80/v4/word.json/' + word + '/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

  fetch(apiURL).then(function (response) {
    return response.json()
  }).then(function (data) {
    return !isEmpty(data)
  }).catch(error => {
    console.error(error)
  })
}
