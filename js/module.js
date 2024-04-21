'use strict'; //to enable strict mode 

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// this fuction takes Unix date in seconds and timezone shift from UTC in seconds 
// and return the date as a string 
export const formatDate = function(dateUnix, timezone){
    const date = new Date((dateUnix + timezone) * 1000);
    const day = weekDays[date.getUTCDay()];
    const month = months[date.getUTCMonth()];

    return `${day} ${date.getUTCDate()}, ${month}`;
}

// this fuction takes Unix date in seconds and timezone shift from UTC in seconds 
// and return the time as a string 'HH:MM AM/PM' 
export const formatTime = function(timeUnix, timezone){
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const periode = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12}:${minutes} ${periode}`
}

export const formatHours = function(timeUnix, timezone){
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getUTCHours();
    const periode = hours >= 12 ? 'PM' : 'AM';

    return `${hours % 12 || 12} ${periode}`
}

export const mpsTokmh = (mps) =>{
    // const mph = mps * 3600; 
    // return mph / 1000
    return mps * (3600/1000)
}

export const messages = {
    1: {
        level: 'Good',
        message: `Air quality is considered satisfactory, and air pollution poses little or no risk.`
    },
    2: {
        level: 'Fair',
        message: `Air quality is acceptable; however, for some pollutants there may be
        a moderate health concern for a very small number of people who are unusally sensitive to air pollution.`
    },
    3: {
        level: 'Moderate',
        message: `Members of sensitive groups may experience health effects.
        The general public is not likely to be affected.`
    },
    4: {
        level: 'Poor',
        message: `Everyone may begin to experience health effects; members of sensitive groups
        may experience more serious health effects.`
    },
    5: {
        level: 'Very Poor',
        message: `Health warnings of emergency conditions. 
        The entire population is more likely to be affected.`
    },
}