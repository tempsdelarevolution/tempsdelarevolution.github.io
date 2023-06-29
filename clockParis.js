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
    const hour = (now.getUTCHours() + 2) % 24;
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

    //MODERN CLOCK

    //weekday
    let currWeekdayNumber = now.getUTCDay();
    let weekdayFR = document.getElementById("weekday-modern-fr");
    let weekdayENG = document.getElementById("weekday-modern-eng");

    if (hour <2) {currWeekdayNumber ++}
    let currWeekday;
    let currWeekdayFR;

    if(currWeekdayNumber==1) {
        currWeekday = 'Monday';
        currWeekdayFR = "Lundi";
    }
    else if (currWeekdayNumber==2) {
        currWeekday = 'Tuesday';
        currWeekdayFR = "Mardi";
    }
    else if (currWeekdayNumber==3) {
        currWeekday = 'Wednesday';
        currWeekdayFR = "Mercredi";
    }
    else if (currWeekdayNumber==4) {
        currWeekday = 'Thursday';
        currWeekdayFR = "Jeudi";
    }
    else if (currWeekdayNumber==5) {
        currWeekday = 'Friday';
        currWeekdayFR = "Vendredi";
    }
    else if (currWeekdayNumber==6) {
        currWeekday = 'Saturday';
        currWeekdayFR = "Samedi";
    }
    else {
        currWeekday = 'Sunday';
        currWeekdayFR = "Dimanche";
    }
    weekdayENG.innerHTML = currWeekday + ',';
    weekdayFR.innerHTML = currWeekdayFR + ','

    //day of month
    let currDayNumber = now.getUTCDate();
    let dayENG = document.getElementById("day-modern-eng");
    let dayFR = document.getElementById("day-modern-fr");

    if(hour<2) {currDayNumber ++}; //timezone danger zone

    dayENG.innerHTML = ' ' + currDayNumber;
    dayFR.innerHTML = ' ' + currDayNumber;


    //month
    let currMonthNumber = now.getUTCMonth();
    let monthENG = document.getElementById("month-modern-eng");
    let monthFR = document.getElementById("month-modern-fr");

    if(hour<2) {currMonthNumber ++};
    let currMonthName;
    let currMonthNameFR;

    if(currMonthNumber == 0) {
        currMonthName = 'January';
        currMonthNameFR = "Janvier";
    }
    else if(currMonthNumber == 1) {
        currMonthName = 'February';
        currMonthNameFR = "Fevrier";
    }
    else if(currMonthNumber == 2) {
        currMonthName = 'March';
        currMonthNameFR = "Mars";
    }
    else if(currMonthNumber == 3) {
        currMonthName = 'April';
        currMonthNameFR = "Avril";
    }
    else if(currMonthNumber == 4) {
        currMonthName = 'May';
        currMonthNameFR = "Mai";
    }
    else if(currMonthNumber == 5) {
        currMonthName = 'June';
        currMonthNameFR = "Juin";
    }
    else if(currMonthNumber == 6) {
        currMonthName = 'July';
        currMonthNameFR = "Juillet";
    }
    else if(currMonthNumber == 7) {
        currMonthName = 'August';
        currMonthNameFR = "Aout";
    }
    else if(currMonthNumber == 8) {
        currMonthName = 'September';
        currMonthNameFR = "Septembre";
    }
    else if(currMonthNumber == 9) {
        currMonthName = 'October';
        currMonthNameFR = "Octobre";
    }
    else if(currMonthNumber == 10) {
        currMonthName = 'November';
        currMonthNameFR = "Novembre";
    }
    else {
        currMonthName = 'December';
        currMonthNameFR = "Decembre";
    }

    monthENG.innerHTML = ' ' + currMonthName;
    monthFR.innerHTML = ' ' + currMonthNameFR;
    

    //
    //
    //  REVOLUTIONARY DATE
    //
    //

    //necessary variables
    let revMonthENG;
    let revMonthFR;
    let revWeekdayENG;
    let revWeekdayFR;
    let revDayENG;
    let revDayFR;
    let revSeason;
    let revDayNumber;
    let revDayNumberINMONTH;
    
    let currYear = now.getUTCFullYear;
    if(hour <2) { //danger zone for paris time
        currYear ++;
    }

    //is it a leap year????
    let isLeapYear;
    if (currYear % 4 == 0) {
        isLeapYear = true;
    }
    else {
        isLeapYear = false;
    }

    { //CODE BLOCK FOR SETTING REVOLUTIONARY MONTH 
    if (currMonthNumber == 8) //september
    {
        if (currDayNumber >= 23) //after autumn equinox
        {
            revMonthFR = 'Vendemiare';
            revMonthENG = 'First Month';
            revDayNumber = currDayNumber - 22; //day 1 through 8
        }
        else if (currDayNumber)//before equinox 
        {
            if (isLeapYear == true)
            {
                revDayNumber = 344 + currDayNumber; //day 345 through 366???
            }
            else
            {
                revDayNumber = 343 + currDayNumber; //day 344 through 365???
            }

            revMonthFR = 'Fructidor';
            revMonthENG = "Twelfth Month";
        }
    }
    else if (currMonthNumber == 9) //october
    {
        revDayNumber = 8 + currDayNumber; //day 9 through 39
        if (currDayNumber >= 23)
        {
            revMonthFR = 'Brumaire'
            revMonthENG = "Second Month"
        }
        else 
        {
            revMonthFR = 'Vendemaire'
            revMonthENG = 'First Month'
        }
    }
    else if (currMonthNumber == 10) //november
    {
        revDayNumber = 39 + currDayNumber; //day 40 through 69
        if (currDayNumber >= 22)
        {
            revMonthFR = 'Frimaire'
            revMonthENG = "Third Month"
        }
        else 
        {
            revMonthFR = 'Brumaire'
            revMonthENG = 'Second Month'
        }
    }
    else if (currMonthNumber == 11) //december
    {
        revDayNumber = 69 + currDayNumber; //day 70 through 100
        if (currDayNumber >= 22)
        {
            revMonthFR = 'Nivose'
            revMonthENG = 'Fourth Month'
        }
        else 
        {
            revMonthFR = 'Frimaire'
            revMonthENG = "Third Month"
        }
    }
    else if (currMonthNumber == 0) //january
    {
        revDayNumber = 100 + currDayNumber; //day 101 through 131
        if (currDayNumber >= 21)
        {
            revMonthFR = 'Pluviose'
            revMonthENG = 'Fifth Month'
        }
        else 
        {
            revMonthFR = 'Nivose'
            revMonthENG = 'Fourth Month'
        }
    }
    else if (currMonthNumber == 1) //february
    {
        revDayNumber = 131 + currDayNumber; //day 132 through 159 OR 160
        if (currDayNumber >= 20)
        {
            revMonthFR = "Ventose"
            revMonthENG = 'Sixth Month'
        }
        else 
        {
            revMonthFR = 'Pluviose'
            revMonthENG = 'Fifth Month'
        }
    }
    else if (currMonthNumber == 2) //march
    {
        if (isLeapYear == true)
        {
            revDayNumber = 159 + currDayNumber; //day 161 through 191
        }
        else{
            revDayNumber = 160 + currDayNumber; //day 160 through 190
        }

        if (currDayNumber >= 22 && isLeapYear == false)
        {
            revMonthFR = 'Germinal'
            revMonthENG = 'Seventh Month'
        }
        else if (currDayNumber >= 21 && isLeapYear == true)
        {
            revMonthFR = 'Germinal'
            revMonthENG = 'Seventh Month'
        }
        else {
            revMonthFR = "Ventose"
            revMonthENG = 'Sixth Month'
        }
    }
    else if (currMonthNumber == 3) //april
    {
        if (isLeapYear == true)
        {
            revDayNumber = 191 + currDayNumber; //day 192 through 221
        }
        else{
            revDayNumber = 190 + currDayNumber; //day 191 through 220
        }

        if (currDayNumber >= 21 && isLeapYear == false)
        {
            revMonthFR = 'Floreal'
            revMonthENG = 'Eighth Month'
        }
        else if (currDayNumber >= 20 && isLeapYear == true)
        {
            revMonthFR = 'Floreal'
            revMonthENG = 'Eighth Month'
        }
        else 
        {
            revMonthFR = 'Germinal'
            revMonthENG = 'Seventh Month'
        }
    }
    else if (currMonthNumber == 4) //may
    {
        if (isLeapYear == true)
        {
            revDayNumber = 221 + currDayNumber; //day 222 through 252
        }
        else{
            revDayNumber = 220 + currDayNumber; //day 221 through 251
        }

        if (currDayNumber >= 21 && isLeapYear == false)
        {
            revMonthFR = 'Prairial'
            revMonthENG = 'Ninth Month'
        }
        else if (currDayNumber >= 20 && isLeapYear == true)
        {
            revMonthFR = 'Prairial'
            revMonthENG = 'Ninth Month'
        }
        else 
        {
            revMonthFR = 'Floreal'
            revMonthENG = 'Eighth Month'
        }
    }
    else if (currMonthNumber == 5) //june
    {
        if (isLeapYear == true)
        {
            revDayNumber = 252 + currDayNumber; //day 253 through 282
        }
        else{
            revDayNumber = 251 + currDayNumber; //day 252 through 281
        }

        if (currDayNumber >= 20 && isLeapYear == false)
        {
            revMonthFR = 'Messidor'
            revMonthENG = 'Tenth Month'
        }
        else if (currDayNumber >= 19 && isLeapYear == true)
        {
            revMonthFR = 'Messidor'
            revMonthENG = 'Tenth Month'
        }
        else 
        {
            revMonthFR = 'Prairial'
            revMonthENG = 'Ninth Month'
        }
    }
    else if (currMonthNumber == 6) //july
    {
        if (isLeapYear == true)
        {
            revDayNumber = 282 + currDayNumber; //day 283 through 313
        }
        else{
            revDayNumber = 281 + currDayNumber; //day 282 through 312
        }

        if (currDayNumber >= 20 && isLeapYear == false)
        {
            revMonthFR = 'Thermidor'
            revMonthENG = 'Eleventh Month'
        }
        else if (currDayNumber >= 19 && isLeapYear == true)
        {
            revMonthFR = 'Thermidor'
            revMonthENG = 'Eleventh Month'
        }
        else 
        {
            revMonthFR = 'Messidor'
            revMonthENG = 'Tenth Month'
        }
    }
    else //August 
    {
        if (isLeapYear == true)
        {
            revDayNumber = 313 + currDayNumber; //day 314 through 344
        }
        else{
            revDayNumber = 312 + currDayNumber; //day 313 through 343
        }

        if (currDayNumber >= 19 && isLeapYear == false)
        {
            revMonthFR = 'Fructidor'
            revMonthENG = 'Twelfth Month'
        }
        else if (currDayNumber >= 18 && isLeapYear == true)
        {
            revMonthFR = 'Fructidor'
            revMonthENG = 'Twelfth Month'
        }
        else 
        {
            revMonthFR = 'Thermidor'
            revMonthENG = 'Eleventh Month'
        }
    }
    //jesus that was exhausting and I already know theres no way its right
    }

    { //CODE BLOCK FOR SETTING WEEKDAY
        let revWeekdayNumber = revDayNumber%10;
        if(revWeekdayNumber == 1) 
        {
            revWeekdayENG = 'First Day'
            revWeekdayFR = 'Primidi'
        }
        else if (revWeekdayNumber == 2) 
        {
            revWeekdayENG = 'Second Day'
            revWeekdayFR = 'Duodi'
        }
        else if (revWeekdayNumber == 3) 
        {
            revWeekdayENG = 'Third Day'
            revWeekdayFR = 'Tridi'
        }
        else if (revWeekdayNumber == 4) 
        {
            revWeekdayENG = 'Fourth Day'
            revWeekdayFR = 'Quartidi'
        }
        else if (revWeekdayNumber == 5) 
        {
            revWeekdayENG = 'Fifth Day'
            revWeekdayFR = 'Quintidi'
        }
        else if (revWeekdayNumber == 6) 
        {
            revWeekdayENG = 'Sixth Day'
            revWeekdayFR = 'Sextidi'
        }
        else if (revWeekdayNumber == 7) 
        {
            revWeekdayENG = 'Seventh Day'
            revWeekdayFR = 'Octidi'
        }
        else if (revWeekdayNumber == 8) 
        {
            revWeekdayENG = 'Eighth Day'
            revWeekdayFR = 'Nonidi'
        }
        else if (revWeekdayNumber == 9) 
        {
            revWeekdayENG = 'Ninth Day'
            revWeekdayFR = 'Duodi'
        }
        else 
        {
            revWeekdayENG = 'Tenth Day'
            revWeekdayFR = 'Decadi'
        }
    }

    revDayNumberINMONTH = revDayNumber%30;

    //HTML elements
    let revWeekdayElementFR = document.getElementById("weekday-past-fr");
    let revWeekdayElementENG = document.getElementById("weekday-past-eng");
    let revDayElementFR = document.getElementById("day-past-fr");
    let revDayElementENG = document.getElementById("day-past-eng");
    let revMonthElementFR = document.getElementById("month-past-fr");
    let revMonthElementENG = document.getElementById("month-past-eng");

    //setting HTML!!!!!!!!
    revWeekdayElementFR.innerHTML = revWeekdayFR + ', ';
    revWeekdayElementENG.innerHTML = revWeekdayENG + ', ';
    revDayElementFR.innerHTML = revDayNumberINMONTH + ' ';
    revDayElementENG.innerHTML = revDayNumberINMONTH + ' ';
    revMonthElementFR.innerHTML = revMonthFR;
    revMonthElementENG.innerHTML = revMonthENG;

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
