import deg2rad from 'deg2rad';
export const getDistanceBetweenPoints = (lat1 , lon1 , lat2 , lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1); // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

export const getPace = (distance, time) => {
    if (distance ===0){
        return 0;
    }else{
        var timeInHour = time/3600;
        var pace = timeInHour/distance;
        return pace;
    }
}

export const getCalorie = (weitht, distance , pace) => {
    var calorie = weitht * distance * 1.05;
    return calorie;
}