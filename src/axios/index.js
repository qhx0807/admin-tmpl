import axios from 'axios'

const apiUrl = 'http://120.76.167.113:9001/HandlerESY.ashx'

export const postApi = (methodName, params, succFoo, errorFoo) => {
  axios({
    method: 'post',
    url: apiUrl,
    data: {
      GoWay: methodName,
      PostJson: JSON.stringify(params)
    },
    transformRequest: [
      function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ]
  })
    .then(response => {
      succFoo(response)
    })
    .catch(error => {
      errorFoo(error)
    })
}
