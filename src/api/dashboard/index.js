import request from "@/utils/request";

//获取设备在线状态数量

export function getOnlineDeviceApi(params) {
  // return myAxios.get(BASEURL + "/dashboard/online/equipments/count", params);
  return request({
    url: "/dashboard/online/equipments/count",
    method: "get",
    params: params,
  });
}

//获取设备分类数量
export function getClassificationApi(params) {
  // return myAxios.get(
  //   BASEURL + "/dashboard/equipments/classification/count",
  //   params
  // );
  return request({
    url: "/dashboard/equipments/classification/count",
    method: "get",
    params: params,
  });
}

//获取上报数据数量
export function getRecentDataApi(params) {
  // return myAxios.get(BASEURL + "/dashboard/recent/data/count", params);
  return request({
    url: "/dashboard/recent/data/count",
    method: "get",
    params: params,
  });
}
//获取告警数据
export function getAlarmsApi(params) {
  // return myAxios.get(BASEURL + "/dashboard/recent/data/count", params);
  return request({
    url: "/alarms/quantityInfo",
    method: "get",
    params: params,
  });
}

//获取设备在线状态数量

export function getCountOfHbList(params) {
  return request({
    url: "/dashboard/equipments/hblist/count",
    method: "get",
    params: params,
  });
}
