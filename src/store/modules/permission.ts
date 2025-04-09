// import { RouteRecordRaw } from "vue-router";
// import { defineStore } from "pinia";
// import { constantRoutes } from "@/router";
// import { store } from "@/store";
// import { listRoutes } from "@/api/menu";

// const modules = import.meta.glob("../../views/**/**.vue");
// const Layout = () => import("@/layout/index.vue");

// /**
//  * Use meta.role to determine if the current user has permission
//  *
//  * @param roles 用户角色集合
//  * @param route 路由
//  * @returns
//  */
// const hasPermission = (roles: string[], route: RouteRecordRaw) => {
//   if (route.meta && route.meta.roles) {
//     // 角色【超级管理员】拥有所有权限，忽略校验
//     if (roles.includes("ROOT")) {
//       return true;
//     }
//     return roles.some((role) => {
//       if (route.meta?.roles) {
//         return route.meta.roles.includes(role);
//       }
//     });
//   }
//   return false;
// };

// /**
//  * 递归过滤有权限的异步(动态)路由
//  *
//  * @param routes 接口返回的异步(动态)路由
//  * @param roles 用户角色集合
//  * @returns 返回用户有权限的异步(动态)路由
//  */
// const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
//   const asyncRoutes: RouteRecordRaw[] = [];
//   console.log(routes);

//   routes.forEach((route) => {
//     const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
//     if (!route.name) {
//       tmpRoute.name = route.path;
//     }
//     // 判断用户(角色)是否有该路由的访问权限
//     if (hasPermission(roles, tmpRoute)) {
//       if (tmpRoute.component?.toString() == "Layout") {
//         tmpRoute.component = Layout;
//       } else {
//         const component = modules[`../../views/${tmpRoute.component}.vue`];
//         if (component) {
//           tmpRoute.component = component;
//         } else {
//           tmpRoute.component = modules[`../../views/error-page/404.vue`];
//         }
//       }

//       if (tmpRoute.children) {
//         tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
//       }

//       asyncRoutes.push(tmpRoute);
//     }
//   });

//   return asyncRoutes;
// };

// // setup
// export const usePermissionStore = defineStore("permission", () => {
//   // state
//   const routes = ref<RouteRecordRaw[]>([]);

//   // actions
//   function setRoutes(newRoutes: RouteRecordRaw[]) {
//     routes.value = constantRoutes.concat(newRoutes);
//   }
//   /**
//    * 生成动态路由
//    *
//    * @param roles 用户角色集合
//    * @returns
//    */
//   function generateRoutes(roles: string[]) {
//     return new Promise<RouteRecordRaw[]>((resolve, reject) => {
//       console.log("generateRoutes");

//       // 接口获取所有路由
//       const asyncRoutes: any = {
//         "code": "00000",
//         "data": [
//           {
//             "path": "/DeviceManagement",
//             "component": "Layout",
//             "redirect": "/DeviceManagement/SiteEntry",
//             "name": "/DeviceManagement",
//             "meta": {
//               "title": "设备管理",
//               "icon": "system",
//               "hidden": false,
//               "roles": [
//                 "ADMIN"
//               ]
//             },
//             "children": [
//               {
//                 "path": "SiteEntry",
//                 "component": "DeviceManagement/SiteEntry/index",
//                 "name": "SiteEntry",
//                 "meta": {
//                   "title": "站点录入",
//                   "icon": "user",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "IDDistribution",
//                 "component": "DeviceManagement/IDDistribution/index",
//                 "name": "IDDistribution",
//                 "meta": {
//                   "title": "ID分配",
//                   "icon": "role",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "DeviceInformation",
//                 "component": "DeviceManagement/DeviceInformation/index",
//                 "name": "DeviceInformation",
//                 "meta": {
//                   "title": "设备信息",
//                   "icon": "menu",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "BlackWhiteList",
//                 "component": "DeviceManagement/BlackWhiteList/index",
//                 "name": "BlackWhiteList",
//                 "meta": {
//                   "title": "黑白名单",
//                   "icon": "tree",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//             ]
//           },
//           {
//             "path": "/DeviceData",
//             "component": "Layout",
//             "redirect": "/DeviceData/WaterQualityData",
//             "name": "/DeviceManagement",
//             "meta": {
//               "title": "设备数据",
//               "icon": "document",
//               "hidden": false,
//               "roles": [
//                 "ADMIN"
//               ]
//             },
//             "children": [
//               {
//                 "path": "WaterQualityData",
//                 "component": "DeviceData/WaterQualityData/index",
//                 "name": "WaterQualityData",
//                 "meta": {
//                   "title": "水质数据",
//                   "icon": "user",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "RainfallData",
//                 "component": "DeviceData/RainfallData/index",
//                 "name": "RainfallData",
//                 "meta": {
//                   "title": "雨量数据",
//                   "icon": "role",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "RiverWaterSituation",
//                 "component": "DeviceData/RiverWaterSituation/index",
//                 "name": "RiverWaterSituation",
//                 "meta": {
//                   "title": "河道水情",
//                   "icon": "menu",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "GateSituation",
//                 "component": "DeviceData/GateSituation/index",
//                 "name": "GateSituation",
//                 "meta": {
//                   "title": "闸门工情",
//                   "icon": "tree",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//             ]
//           },

//           {
//             "path": "/doc",
//             "component": "Layout",
//             "name": "/doc",
//             "meta": {
//               "title": "平台文档",
//               "icon": "document",
//               "hidden": false,
//               "roles": [
//                 "ADMIN"
//               ]
//             },
//             "children": [
//               {
//                 "path": "internal-doc",
//                 "component": "demo/internal-doc",
//                 "name": "InternalDoc",
//                 "meta": {
//                   "title": "平台文档(内嵌)",
//                   "icon": "document",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ]
//                 }
//               },
//               {
//                 "path": "https://juejin.cn/post/7228990409909108793",
//                 "name": "Https://juejin.cn/post/7228990409909108793",
//                 "meta": {
//                   "title": "平台文档(外链)",
//                   "icon": "link",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ]
//                 }
//               }
//             ]
//           },
//           {
//             "path": "/system",
//             "component": "Layout",
//             "redirect": "/system/user",
//             "name": "/system",
//             "meta": {
//               "title": "系统管理",
//               "icon": "system",
//               "hidden": false,
//               "roles": [
//                 "ADMIN"
//               ]
//             },
//             "children": [
//               {
//                 "path": "user",
//                 "component": "system/user/index",
//                 "name": "User",
//                 "meta": {
//                   "title": "用户管理",
//                   "icon": "user",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "role",
//                 "component": "system/role/index",
//                 "name": "Role",
//                 "meta": {
//                   "title": "角色管理",
//                   "icon": "role",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "menu",
//                 "component": "system/menu/index",
//                 "name": "Menu",
//                 "meta": {
//                   "title": "菜单管理",
//                   "icon": "menu",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "dept",
//                 "component": "system/dept/index",
//                 "name": "Dept",
//                 "meta": {
//                   "title": "部门管理",
//                   "icon": "tree",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               },
//               {
//                 "path": "dict",
//                 "component": "system/dict/index",
//                 "name": "Dict",
//                 "meta": {
//                   "title": "字典管理",
//                   "icon": "dict",
//                   "hidden": false,
//                   "roles": [
//                     "ADMIN"
//                   ],
//                   "keepAlive": true
//                 }
//               }
//             ]
//           },
//         ],
//         "msg": "一切ok"
//       }
//       const accessedRoutes = filterAsyncRoutes(asyncRoutes.data, roles);
//       console.log(accessedRoutes);
//       setRoutes(accessedRoutes);
//       resolve(accessedRoutes);

//     });
//   }

//   /**
//    * 混合模式左侧菜单
//    */
//   const mixLeftMenu = ref<RouteRecordRaw[]>([]);
//   function getMixLeftMenu(activeTop: string) {
//     routes.value.forEach((item) => {
//       if (item.path === activeTop) {
//         mixLeftMenu.value = item.children || [];
//       }
//     });
//   }
//   return { routes, setRoutes, generateRoutes, getMixLeftMenu, mixLeftMenu };
// });

// // 非setup
// export function usePermissionStoreHook() {
//   return usePermissionStore(store);
// }
import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import { listRoutes } from "@/api/menu";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles) {
        return route.meta.roles.includes(role);
      }
    });
  }
  return false;
};

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path;
    }
    // 判断用户(角色)是否有该路由的访问权限
    if (hasPermission(roles, tmpRoute)) {
      if (tmpRoute.component?.toString() == "Layout") {
        tmpRoute.component = Layout;
      } else {
        const component = modules[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          tmpRoute.component = component;
        } else {
          tmpRoute.component = modules[`../../views/error-page/404.vue`];
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
      }

      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 接口获取所有路由
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          // 根据角色获取有访问权限的路由
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 混合模式左侧菜单
   */
  const mixLeftMenu = ref<RouteRecordRaw[]>([]);
  function getMixLeftMenu(activeTop: string) {
    routes.value.forEach((item) => {
      if (item.path === activeTop) {
        mixLeftMenu.value = item.children || [];
      }
    });
  }
  return { routes, setRoutes, generateRoutes, getMixLeftMenu, mixLeftMenu };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
