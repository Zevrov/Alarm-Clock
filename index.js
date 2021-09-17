////
//Alarm Clock JavaScript Logic
//Welcome to the workhorse of the project
//Written by Wolf Hopkins
////

const display = document.getElementById('clock');
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-990.mp3');
audio.loop = true;
let alarm = null;
let alarmTimeout = null;

//change the clock display to match the current time
function updateTime() {
    const date = new Date();
    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    display.innerText=`${hour} : ${minutes} : ${seconds}`
}

//Format time: add a leading 0 where necessary
function formatTime(time) {
    if ( time < 10 ) {
        return '0' + time;
    }
    return time;
}

//This variable holds our alarm time given to us from the user.
function setAlarmTime(value) {
        alarmTime = value;
}

//Set the alarm to the user specified value. Ping the User after it is set.
function setAlarm() {
    if(alarmTime) {
        const current = new Date();
        const timeToAlarm = new Date(alarmTime);

         if (timeToAlarm > current) {
            const timeout = timeToAlarm.getTime() - current.getTime();
            alarmTimeout = setTimeout(() => {audio.play();
                                             alert("ALARM");}, timeout);
            alert('Alarm set');
        } else {
            alert('Select a future time to set');
        }
    }
}

function snooze() {
    clearAlarm();
    setAlarmTime(new Date(Date.now() + (5 * 60 * 1000)));
    alert("5 min snooze set");
    setAlarm();
}

//This function not only clears an alarm, it also stops an active one including the audio notification
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}

//This is how often we want out clock to update, I set it to match the seconds interval
setInterval(updateTime, 1000);
