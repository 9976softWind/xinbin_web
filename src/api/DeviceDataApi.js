import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl.js";
const deviceDatadApi = {
  //分页获取设备数据(默认展示水质)
  getDeviceData(params) {
    return myAxios.post(BASEURL + "/equipments/data-query", params);
  },
  //获取设备数据详情
  getDeviceDetail(type, id) {
    return myAxios.get(BASEURL + `/equipments/${type}/${id}/data-details`);
  },
};
export default deviceDatadApi;
