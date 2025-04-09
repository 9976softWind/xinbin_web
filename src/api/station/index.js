import request from "@/utils/request";

export function querySites(data) {
  return request({
    url: "api/stations/pageList",
    method: "post",
    data,
  });
}
export function changeSiteInfo(data) {
  return request({
    url: "api/stations",
    method: "put",
    data,
  });
}
export function delSite(id) {
  return request({
    url: "api/stations/" + `${id}`,
    method: "delete",
  });
}
export function addSite(data) {
  return request({
    url: "api/stations",
    method: "post",
    data,
  });
}
export function queryAllSites() {
  return request({
    url: "api/stations/list",
    method: "get",
  });
}
