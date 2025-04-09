import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl.js";
const deviceCommandApi = {
  //获取所有设备信息
  getAllEqs(params) {
    return myAxios.post(BASEURL + "/equipments/infos", params);
  },
   //调试命令的设备列表
   getAllDevs(params) {
    return myAxios.get(BASEURL + "/devices/protocol/devlist", params);
  },

  //平台设备协议描述
  getCommands(type) {
    return myAxios.get(BASEURL + `/devices/protocol/${type}/cmdlist`);
  },
  // 执行命令
  doCommand(id,params) {
    return myAxios.post(BASEURL + `/devices/${id}/command-call` , params);
  },
  //hj212校准时间
  adjustTime(params) {
    return myAxios.get(BASEURL + "/devices/cmd/hj212/adjust/time" + params);
  },
  //hj212获取实时数据
  getLiveData(params) {
    return myAxios.get(`BASEURL + "/devices/cmd/hj212/current/pollutant/data"`, params);
  }
};
export default deviceCommandApi;
