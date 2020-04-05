import axios from 'axios'
// 请求拦截器
axios.interceptors.request.use(function (config) {
//   console.log('请求拦截器')
//   console.log(config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use(function (response) {
//   console.log('响应拦截器')
//   console.log(response)

  return response.data;
}, function (error) {
  return Promise.reject(error);
});
export default axios
//                                                       0007MOiS0drXIg
//                                                       003cQjzA1w75aS
// http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C4000007MOiS0drXIg.m4a?guid=5718760990&vkey=68A26FA551BC6C86A601973EC0FC34BFB8FDB2F0168A2386336FB0E8D0F82C428E7C32598038C414AAF7BD30652805385DC32F1B8BB80886&uin=0&fromtag=38