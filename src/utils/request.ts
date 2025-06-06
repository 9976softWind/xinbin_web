import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
      config.headers["token"] = userStore.token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
// service.interceptors.response.use(
// (response: any) => {
//   const { code, msg } = response.data;
//   if (code === 0 || code === "00000") {
//     return response.data;
//   }
//   // 响应数据为二进制流处理(Excel导出)
//   if (response.data instanceof ArrayBuffer) {
//     return response;
//   }
//   if (response == "Result(code=A0001, data=null, msg=没有登录") {
//     ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
//       confirmButtonText: "确定",
//       type: "warning",
//     }).then(() => {
//       const userStore = useUserStoreHook();
//       userStore.resetToken().then(() => {
//         location.reload();
//       });
//     });
//     ElMessage.error(msg || "系统出错");
//     return Promise.reject(new Error(msg || "Error"));
//   }
// },
service.interceptors.response.use(
  response => {
    console.log(response);
    const { code, msg } = response.data;
    if (response.data == "Result(code=A0001, data=null, msg=没有登录)") {
      ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        location.reload();
        return
      })
    } else if (response.data instanceof ArrayBuffer) {
      return response;
    } else if (code === 0 || code === "00000") {
      return response.data;
    } else {
      ElMessage.error(msg || "系统出错");
      return Promise.reject(new Error(msg || "Error"));
    }
  },
  (error: any) => {
    if (error.response.data) {
      const { code, msg } = error.response.data;
      // token 过期,重新登录
      if (code === "A0001") {
        ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        }).then(() => {
          const userStore = useUserStoreHook();
          userStore.resetToken().then(() => {
            location.reload();
          });
        });
      } else {
        ElMessage.error(msg || "系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
