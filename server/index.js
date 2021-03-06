2
var axios = require('axios');
var localStorage = require('localStorage');
let api = axios.create({
  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  // baseURL: process.env.API_LOCATION,
  // `headers` are custom headers to be sent
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'Authorization': localStorage.getItem('Auth')
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 40000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000000,

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 3, // default


});

export const registerParent = async (parentInfo) => {
  try {
    // const res = await api.post(`http://192.168.0.140:5000/api/v1/fathers/register`, parentInfo)
    const res = await api.post(`http://localhost:5000/api/v1/fathers/register`, parentInfo)
    Object.assign(api.defaults, { headers: { Authorization: res.data.id } })
    return res
  } catch (error) {
    return error
  }
}

export const updateParent = async (id, form) => {
  // return await api.put(`http://192.168.0.140:5000/api/v1/fathers/${id}`, form)
  return await api.put(`http://localhost:5000/api/v1/fathers/${id}`, form)
}

export const registerChildToParent = async (data, profileId) => {
  console.log('newChild ' + JSON.stringify(data))
  const newChild = {
    child: data._id,
    names: data.names,
    surname: data.surname,
    birthday: data.birthday,
    relative: data.relative,
    identityDocumentNumber: data.identityDocumentNumber,
    age: data.age
  }
  // return await api.post(`http://192.168.0.140:5000/api/v1/fathers/child/${profileId}`, newChild)
  return await api.post(`http://localhost:5000/api/v1/fathers/child/${profileId}`, newChild)
}

export const registerChild = async (child) => {
  console.log(JSON.stringify(child) + 'child')
  // return await api.post(`http://192.168.0.140:5000/api/v1/childs/register`, child)
  return await api.post(`http://localhost:5000/api/v1/childs/register`, child)
}

export const getFatherByEmail = async (searchForm) => {
  const parentEmail = { "email": searchForm.email, "birthday": searchForm.birthday }
  console.log(parentEmail)
  // return await api.post(`http://192.168.0.140:5000/api/v1/fathers/email/findByEmail`, parentEmail)
  return await api.post(`http://localhost:5000/api/v1/fathers/email/findByEmail`, parentEmail)
}
export const getFatherById = async (id) => {
  let res = null
  // await api.get(`http://192.168.0.140:5000/api/v1/fathers/${id}`).then(function (rs) {
  //   console.log(JSON.stringify(rs)+ 'rs')
  //   res = rs
  // })
  await api.get(`http://localhost:5000/api/v1/fathers/${id}`).then(function (rs) {
    res = rs
  })
  return res
}

export const deleteChild = async (idCHild) => {
  // const endpoint = `http://192.168.0.140:5000/api/v1/childs/${idCHild}`
  const endpoint = `http://localhost:5000/api/v1/childs/${idCHild}`
  return await api.delete(endpoint)
}

export const deleteParentYoung = async (idParent) => {
  // const endpoint = `http://192.168.0.140:5000/api/v1/fathers/${idParent}`
  const endpoint = `http://localhost:5000/api/v1/fathers/${idParent}`
  return await api.delete(endpoint)
}

export const sendEmail = async (email, random, contract) => {
  const dataEmail = {
    email: email.toString(),
    message: random.toString(),
    contract: contract
  }
  // return await api.post(`http://192.168.0.140:5000/api/v1/fathers/sendEmail`, dataEmail)
  return await api.post(`http://localhost:5000/api/v1/fathers/sendEmail`, dataEmail)
}

export const getAllParents = async () => {
  // return await api.get('http://192.168.0.140:5000/api/v1/fathers/')
  return await api.get('http://localhost:5000/api/v1/fathers/')
}


export default api
