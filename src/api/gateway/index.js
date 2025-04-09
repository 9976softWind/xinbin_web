import request from "@/utils/request";

// 查询所有设备类型
export function queryAllTypes() {
  return request({
    url: "api/gateways/getGateWayDeviceTypeList",
    method: "get"
  });
}

//分页获取主机/条件查询主机
export function queryHosts(data) {
  return request({
    url: "api/gateways/pageList",
    method: "post",
    data
  });
}

//编辑主机信息
export function editHost(data) {
  return request({
    url: "api/gateways",
    method: "put",
    data
  });
}

// 查询一体机下设备
export function queryDevices(gwId) {
  return request({
    url: `api/gateways/getGatewayDetails/${gwId}`,
    method: "get"
  });
}

//同步主机信息
export function syncHosts(gwId, data) {
  return request({
    url: `api/gateways/${gwId}/synSubDevice`,
    method: "post",
    data
  });
}

//获取emqx服务器状态
export function getBrokerStatus() {
  return request({
    url: `api/gateways/getBrokerStatus`,
    method: "get"
  });
}

//定时场景详情
export function siteDetails(gwId) {
  return request({
    url: `api/gateways/${gwId}/scene`,
    method: "get"
  });
}

// 控制主机下的子设备
export function serviceControl(gwId, data) {
  return request({
    url: `api/gateways/${gwId}/ctrlDevice`,
    method: "post",
    data
  });
}
// 获取所有设备类型
export function getDeviceTypes() {
  return request({
    url: `api/devicetypes/getDeviceTypeList`,
    method: "get"
  });
}

//添加主机
export function addHost(data) {
  return request({
    url: "api/gateways",
    method: "post",
    data
  });
}

//批量同步主机视图
export function syncViewBatch(data) {
  return request({
    url: "api/gateways/syncViewBatch",
    method: "put",
    data
  });
}

//获取编辑主机视图url
export function getEditHostURL(gwId) {
  return request({
    url: `api/gateways/view/edit/${gwId}`,
    method: "get"
  });
}

//删除主机
export function delHost(gwId) {
  return request({
    url: "api/gateways/" + gwId,
    method: "delete"
  });
}

//获取主机视图展示url
export function getDisplayHostURL(gwId) {
  return request({
    url: `api/gateways/view/display/${gwId}`,
    method: "get"
  });
}
