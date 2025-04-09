import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl.js";
const dashboardApi = {
  //获取设备在线状态数量

  getOnlineDevice(params) {
    return myAxios.get(BASEURL + "/dashboard/online/equipments/count", params);
  },

  //获取设备分类数量
  getClassification(params) {
    return myAxios.get(
      BASEURL + "/dashboard/equipments/classification/count",
      params
    );
  },

  //获取上报数据数量
  getRecentData(params) {
    return myAxios.get(BASEURL + "/dashboard/recent/data/count", params);
  },
};
export default dashboardApi;
