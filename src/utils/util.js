function getDate(delay=0, date=null) {
  /**
   * 获取指定日期的指定时间
   * delay -1表示前一天，1表示后一天
   * date 代表指定的日期，格式：2023-01-01
  */
  const theDate = date === null ? new Date() : new Date(date)
  theDate.setDate(theDate.getUTCDate() + delay);
  const y = theDate.getUTCFullYear();
  const m = theDate.getUTCMonth() + 1 < 10 ? "0" + (theDate.getUTCMonth() + 1) : theDate.getUTCMonth() + 1;
  const d = theDate.getUTCDate() < 10 ? "0" + theDate.getUTCDate() : theDate.getUTCDate();
  return y + "-" + m + "-" + d;
}


export {
  getDate
}