const secondHand1 = document.querySelector('.second-hand');
const minsHand1 = document.querySelector('.min-hand');
const hourHand1 = document.querySelector('.hour-hand');

const secondHand2 = document.querySelector('.second-hand-2');
const minsHand2 = document.querySelector('.min-hand-2');
const hourHand2 = document.querySelector('.hour-hand-2');
    
function setRealDate() {
    //WHAT TIME IS IT????
    const now = new Date();

    //get seconds
    const seconds = now.getUTCSeconds();
    //change second hand
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand1.style.transform = `rotate(${secondsDegrees}deg)`;
    //update digital secs
    let digSec = document.getElementById('dig-1-sec')
    if (seconds<10) {
        digSec.innerHTML = '0' + seconds;
    }
    else {
        digSec.innerHTML = seconds;
    }
    

    //get minutes
    const mins = now.getMinutes();
    //change minute hand
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand1.style.transform = `rotate(${minsDegrees}deg)`;
    //update digital mins
    let digMin = document.getElementById('dig-1-min')
    if (mins<10) {
        digMin.innerHTML = '0' + mins;
    }
    else {
        digMin.innerHTML = mins;
    }

    //get hours
    const hour = now.getUTCHours() + 2;
    //change hour hand
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand1.style.transform = `rotate(${hourDegrees}deg)`;
    //update digital hours
    let digHour = document.getElementById('dig-1-hour')
    if (hour<10) {
        digHour.innerHTML = '0' + hour;
    }
    else {
        digHour.innerHTML = hour;
    }

    

}

function setRevDate() {
    //WHAT TIME IS IT????
    const now = new Date();

    //get seconds
    const seconds = now.getSeconds();
    //get minutes
    const mins = now.getMinutes();
    //get hours
    const hour = now.getHours();

    //SECONDS ELAPSED SINCE MIDNIGHT
    let currTime = seconds + (60 * mins) + (3600 * hour);

    //get hours
    let percentage = currTime/86400;
    let hourDeg2 = (360 * percentage) + 90;
    let hours2 = 10*percentage;
    //change hour hand
    hourHand2.style.transform = `rotate(${hourDeg2}deg)`;
    //update hour digital
    let dig2Hour = document.getElementById('dig-2-hour')
    if (hours2<10) {
        dig2Hour.innerHTML = '0' + Math.floor(hours2);
    }
    else {
        dig2Hour.innerHTML = Math.floor(hours2);
    }

    //get mins
    let minPercentage = hours2%1;
    let mins2 = minPercentage * 100;
    let minDeg2 = (minPercentage * 360) + 90;
    //update min hand
    minsHand2.style.transform = `rotate(${minDeg2}deg)`;
    //update min digital
    let dig2Min = document.getElementById('dig-2-min')
    if (mins2<10) {
        dig2Min.innerHTML = '0' + Math.floor(mins2);
    }
    else {
        dig2Min.innerHTML = Math.floor(mins2);
    }

    //get secs
    let secPercentage = mins2%1;
    let secs2 = secPercentage*100;
    let secDeg2 = (secPercentage * 360) + 90;
    //update sec hand
    secondHand2.style.transform = `rotate(${secDeg2}deg)`;
    //update sec digital
    let dig2Sec = document.getElementById('dig-2-sec')
    if (secs2<10) {
        dig2Sec.innerHTML = '0' + Math.floor(secs2);
    }
    else {
        dig2Sec.innerHTML = Math.floor(secs2);
    }
}

setInterval(setRealDate, 1000);
setInterval(setRevDate, 864);

setRealDate();
setRevDate();
