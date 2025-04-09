//时间戳转成日期格式： 年-月-日 时：分：秒
export function timestampToTime(timestamp) {
  if (timestamp === 0 || timestamp == null) {
    return "--";
  } else {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D =
      date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + "  ";
    // var H = date.getHours() + ":";
    var H =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var M2 =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    var S =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + H + M2 + S;
  }
}
