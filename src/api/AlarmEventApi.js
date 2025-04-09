import myAxios from "../MyAxios";
import BASEURL from "../BaseUrl.js";
const alarmEventApi = {
  //获取告警事件
  getAlarmEvents(params) {
    return myAxios.post(BASEURL + "/alarms",params);
  },

  //处理告警事件
  handleAlarmEvents(id,params) {
    return myAxios.put(BASEURL + '/alarms/'+id,params);
  },

  // 获取告警类型
  getAllTypes(){
    return myAxios.get(BASEURL + "/alarms/types");
  }

};
export default alarmEventApi;
