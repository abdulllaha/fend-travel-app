function getRemainigTime(date){
    const today = new Date();
    const travelDate = new Date(date);
    const remainingTime = travelDate.getDate() - today.getDate();
    return remainingTime;
  };
  module.exports = {getRemainigTime}