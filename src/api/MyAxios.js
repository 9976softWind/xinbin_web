import axios from "axios";
const instance = axios.create();

import store from "../store";
import { ElNotification } from "element-plus";

import router from "@/router";

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // 从vuex中获取token，如果有，则设置header一起发送请求
  // let token = store.state.token;
  config.withCredentials = true;
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  } /*  else {
    ElMessageBox.alert("登陆状态过期", "提示", {});
  } */
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  if (response.data.code == 0) {
    return response;
  } else if (response.data.code == 5000) {
    ElNotification({
      title: "提示",
      message: "服务器内部异常",
      type: "error",
    });
  } else if (
    response.data.code == 4006 ||
    response.data.code == 4007 ||
    response.data.code == 4008
  ) {
    ElNotification({
      title: "提示",
      message: response.data.msg,
      type: "error",
    }).then(() => {
      router.push({
        path: "/",
      });
    });
  } else {
    ElNotification({
      title: "提示",
      message: response.data.msg,
      type: "error",
    });
  }
});

const myAxios = {
  /**
   * 用于发送get请求
   * @param {String} url 请求资源路径
   * @param {Object} params  请求参数对象{参数名1：参数值1，参数名2：参数值2}
   */
  get(url, params) {
    return instance({
      method: "get",
      url: url,
      params: params,
    });
  },
  /**
   * 用于发送login请求
   * @param {String} url 请求资源路径
   * @param {Object} params  请求参数对象{参数名1：参数值1，参数名2：参数值2}
   */
  login(url, params) {
    return instance({
      method: "post",
      url: url,
      data: params,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  /**
   * 用于发送post请求
   * @param {String} url 请求资源路径
   * @param {Object} params  请求参数对象{参数名1：参数值1，参数名2：参数值2}
   */
  post(url, params) {
    return instance({
      method: "post",
      url: url,
      data: params,
      headers: { "Content-Type": "application/json" },
    });
  },
  /**
   * 用于发送put请求
   */
  put(url, params) {
    return instance({
      method: "put",
      url: url,
      data: params,
      headers: { "Content-Type": "application/json" },
    });
  },
  /**
   * 用于发送put请求
   */
  login(url, params) {
    return instance({
      method: "post",
      url: url,
      data: params,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  /**
   * 用于发送delete请求
   */
  delete(url, params) {
    return instance({
      method: "delete",
      url: url,
      data: params,
    });
  },
};

export default myAxios;
