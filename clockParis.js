const secondHand1 = document.querySelector('.second-hand');
const minsHand1 = document.querySelector('.min-hand');
const hourHand1 = document.querySelector('.hour-hand');

const secondHand2 = document.querySelector('.second-hand-2');
const minsHand2 = document.querySelector('.min-hand-2');
const hourHand2 = document.querySelector('.hour-hand-2');
    
function setRealTime() {
    //WHAT TIME IS IT????
    const now = new Date();
    //get seconds
    const seconds = now.getUTCSeconds();
    //get minutes
    const mins = now.getUTCMinutes();
    //get hours
    const hour = (now.getUTCHours() + 2) % 24;


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

    changeRealTimeLabels(now, hour);
}

function setRevTime() {
    //WHAT TIME IS IT????
    const now = new Date();

    //get seconds
    const seconds = now.getUTCSeconds();
    //get minutes
    const mins = now.getUTCMinutes();
    //get hours
    const hour = (now.getUTCHours() + 2) % 24;

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
        dig2Hour.innerHTML = '0' + Math.floor(hours2); //append zero if single digit
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
        dig2Min.innerHTML = '0' + Math.floor(mins2); //append zero if single digit
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
        dig2Sec.innerHTML = '0' + Math.floor(secs2); //append zero if single digit
    }
    else {
        dig2Sec.innerHTML = Math.floor(secs2);
    }
}

function changeRealTimeLabels(now, hour) {
    /*
        CHANGE LABELS: Called every second from real time clock
        ***Note: potential optimization -- only called @ beginning of each day?

        Will set the month, day, and weekday in french and english for REAL TIME clock
        ***IF between September x and 23rd (festival week), 
            call special label function
        ELSE call regular revolutionary time
    */


    //MODERN CLOCK LABEL

    //Declare necessary variables
    //year
    let currYear = now.getUTCFullYear;
    //weekday
    let currWeekdayNumber = now.getUTCDay();
    let weekdayFR = document.getElementById("weekday-modern-fr");
    let weekdayENG = document.getElementById("weekday-modern-eng");
    //day of month
    let currDayNumber = now.getUTCDate();
    let dayENG = document.getElementById("day-modern-eng");
    let dayFR = document.getElementById("day-modern-fr");
    //month
    let currMonthNumber = now.getUTCMonth();
    let monthENG = document.getElementById("month-modern-eng");
    let monthFR = document.getElementById("month-modern-fr");


    //TIMEZONE DANGER ZONE: YEAR
    // increment year IF december 31st between 10 pm and midnight (0 and 2am in paris)
    if(hour < 2 && currMonthNumber == 11 && currDayNumber == 31 && currMonthNumber == 11) { 
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

    // IS IT END OF MONTH ?? TIMEZONE DANGER ZONE: CONVERTING UTC TO PARIS
    let endOfMonth = false;
    if (currMonthNumber == 0 || currMonthNumber == 2 || currMonthNumber == 4 || 
        currMonthNumber == 6 || currMonthNumber == 7 || currMonthNumber == 9 || currMonthNumber == 11) 
        { //month with 31 days
            if (currDayNumber == 31) {
                endOfMonth = true;
            }
            else { //redundant case but just in case
                endOfMonth = false;
            }
        }
    else if (currMonthNumber == 3 || currMonthNumber == 5 || currMonthNumber == 8 || currMonthNumber == 10) 
    { //month with 30 days 
        if (currDayNumber == 30) {
            endOfMonth = true;
        }
        else { //redundant case but just in case
            endOfMonth = false;
        }
    }
    else 
    { //february
        if (isLeapYear == true && currDayNumber == 29) {
            endOfMonth = true;
        }
        else if (isLeapYear == false && currDayNumber == 28) {
            endOfMonth = true;
        }
        else { //redundant case but just in case
            endOfMonth = false;
        }
    }
    
    //set day of week
    if (hour <2) {currWeekdayNumber ++} //timezone danger zone
    let currWeekdayENG;
    let currWeekdayFR;

    if(currWeekdayNumber==1) {
        currWeekdayENG = 'Monday';
        currWeekdayFR = "Lundi";
    }
    else if (currWeekdayNumber==2) {
        currWeekdayENG = 'Tuesday';
        currWeekdayFR = "Mardi";
    }
    else if (currWeekdayNumber==3) {
        currWeekdayENG = 'Wednesday';
        currWeekdayFR = "Mercredi";
    }
    else if (currWeekdayNumber==4) {
        currWeekdayENG = 'Thursday';
        currWeekdayFR = "Jeudi";
    }
    else if (currWeekdayNumber==5) {
        currWeekdayENG = 'Friday';
        currWeekdayFR = "Vendredi";
    }
    else if (currWeekdayNumber==6) {
        currWeekdayENG = 'Saturday';
        currWeekdayFR = "Samedi";
    }
    else {
        currWeekdayENG = 'Sunday';
        currWeekdayFR = "Dimanche";
    }


    // SET month
    if(hour<2 && endOfMonth == true && currMonthNumber <=10) {
        currMonthNumber ++;
    } //timezone danger zone, increment month IFF at end of month and NOT december
    else if (hour < 2 && endOfMonth == true && currMonthNumber == 11)
    {
        currMonthNumber =0;
    } //timezone danger zone, increment month IFF at end OF december

    let currMonthNameENG;
    let currMonthNameFR;

    if(currMonthNumber == 0) {
        currMonthNameENG = 'January';
        currMonthNameFR = "Janvier";
    }
    else if(currMonthNumber == 1) {
        currMonthNameENG = 'February';
        currMonthNameFR = "Fevrier";
    }
    else if(currMonthNumber == 2) {
        currMonthNameENG = 'March';
        currMonthNameFR = "Mars";
    }
    else if(currMonthNumber == 3) {
        currMonthNameENG = 'April';
        currMonthNameFR = "Avril";
    }
    else if(currMonthNumber == 4) {
        currMonthNameENG = 'May';
        currMonthNameFR = "Mai";
    }
    else if(currMonthNumber == 5) {
        currMonthNameENG = 'June';
        currMonthNameFR = "Juin";
    }
    else if(currMonthNumber == 6) {
        currMonthNameENG = 'July';
        currMonthNameFR = "Juillet";
    }
    else if(currMonthNumber == 7) {
        currMonthNameENG = 'August';
        currMonthNameFR = "Aout";
    }
    else if(currMonthNumber == 8) {
        currMonthNameENG = 'September';
        currMonthNameFR = "Septembre";
    }
    else if(currMonthNumber == 9) {
        currMonthNameENG = 'October';
        currMonthNameFR = "Octobre";
    }
    else if(currMonthNumber == 10) {
        currMonthNameENG = 'November';
        currMonthNameFR = "Novembre";
    }
    else {
        currMonthNameENG = 'December';
        currMonthNameFR = "Decembre";
    }


    //setting day of month
    //TIMEZONE DANGER: DAY
    if(hour<2 && endOfMonth == false) { //timezone danger zone, midmonth
        currDayNumber ++;
    } 
    else if (hour < 2 && endOfMonth == true) {//timezone danger zone, end of month, wrap to first of month
        currDayNumber = 1;
    }

    // Setting HTML!!!
    weekdayENG.innerHTML = currWeekdayENG + ', ';
    weekdayFR.innerHTML = currWeekdayFR + ', '
    monthENG.innerHTML = currMonthNameENG + ' ';
    monthFR.innerHTML = ' ' + currMonthNameFR;
    dayENG.innerHTML = currDayNumber;
    dayFR.innerHTML = currDayNumber;

    //if festival time!
    if (isLeapYear == true && currMonthNumber == 8 && currDayNumber < 23 && currDayNumber > 16) {

    }
    else if (isLeapYear == true && currMonthNumber == 8 && currDayNumber < 23 && currDayNumber > 17) {

    }
    else {
        changeRevolutionLabels(currDayNumber, currMonthNumber, currYear, isLeapYear);
    }

}

function changeRevolutionLabels(currDayNumber, currMonthNumber, currYear, isLeapYear) {
    
    /*
        If normal day of year, NOT festival season at the end of the year
        Set month, day, and weekday in French and English for revolutionary clock only
    */

    //necessary variables
    let revMonthENG;
    let revMonthFR;
    let revWeekdayENG;
    let revWeekdayFR;
    let revDayENG;
    let revDayFR;
    let revSeason;
    let revDayNumber; //xth day of the year (1-366)
    let revDayNumberINMONTH; //xth day of the month (1-30)
    

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
    //jesus that was exhausting and I already know theres no way its right //IT WAS RIGHT LETS GOOOO
    }

    //SETTING WEEKDAY
    let revWeekdayNumber = revDayNumber%10;
    if(revWeekdayNumber == 1) 
    {
        revWeekdayENG = 'First Weekday'
        revWeekdayFR = 'Primidi'
    }
    else if (revWeekdayNumber == 2) 
    {
        revWeekdayENG = 'Second Weekday'
        revWeekdayFR = 'Duodi'
    }
    else if (revWeekdayNumber == 3) 
    {
        revWeekdayENG = 'Third Weekday'
        revWeekdayFR = 'Tridi'
    }
    else if (revWeekdayNumber == 4) 
    {
        revWeekdayENG = 'Fourth Weekday'
        revWeekdayFR = 'Quartidi'
    }
    else if (revWeekdayNumber == 5) 
    {
        revWeekdayENG = 'Fifth Weekday'
        revWeekdayFR = 'Quintidi'
    }
    else if (revWeekdayNumber == 6) 
    {
        revWeekdayENG = 'Sixth Weekday'
        revWeekdayFR = 'Sextidi'
    }
    else if (revWeekdayNumber == 7) 
    {
        revWeekdayENG = 'Seventh Weekday'
        revWeekdayFR = 'Septidi'
    }
    else if (revWeekdayNumber == 8) 
    {
        revWeekdayENG = 'Eighth Weekday'
        revWeekdayFR = 'Octidi'
    }
    else if (revWeekdayNumber == 9) 
    {
        revWeekdayENG = 'Ninth Weekday'
        revWeekdayFR = 'Nonidi'
    }
    else 
    {
        revWeekdayENG = 'Tenth Weekday'
        revWeekdayFR = 'Decadi'
    }
    

    revDayNumberINMONTH = revDayNumber%30; //very convenient system to be fair

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
    revDayElementENG.innerHTML = ' ' + revDayNumberINMONTH + 'th Day';
    revMonthElementFR.innerHTML = revMonthFR;
    revMonthElementENG.innerHTML = revMonthENG + ',';
}

setInterval(setRealTime, 1000);
setInterval(setRevTime, 864);

setRealTime();
setRevTime();
