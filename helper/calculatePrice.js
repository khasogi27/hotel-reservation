function calculatePrice(start_date,end_date,price){
    const fromTime = new Date(start_date);
    const toTime = new Date(end_date);
    const differenceTravel = toTime.getTime() - fromTime.getTime();
    const seconds = Math.floor((differenceTravel) / (1000));
    const h = Math.floor(seconds / 86400);
    return h*price
}
module.exports = calculatePrice