import request from "@/utils/request";

//获取主机下设备
export function getSubDevice(gwId) {
  return request({
    url: `api/gateways/${gwId}/subDevice/list`,
    method: "get"
  });
}

//查询网关子设备类型
export function getsubDeviceList() {
  return request({
    url: "api/devicetypes/subDeviceList",
    method: "get"
  });
}

//新增子设备
export function addDevice(data) {
  return request({
    url: "api/gateways/subDevice",
    method: "post",
    data
  });
}

//修改子设备
export function editDevice(data) {
  return request({
    url: "api/gateways/subDevice",
    method: "put",
    data
  });
}

//获取编辑子设备视图url
export function getEditSubDeviceURL(gwId) {
  return request({
    url: "api/gateways/subDevice/view/edit/" + gwId,
    method: "get"
  });
}

//删除主机下子设备
export function delDevice(gwId, subDeviceId) {
  return request({
    url: `api/gateways/${gwId}/subDevice/${subDeviceId}`,
    method: "delete"
  });
}
