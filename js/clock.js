let HoursHend = document.querySelector('.hours-del');
let minitesHend = document.querySelector('.minites-del');
let secondHend = document.querySelector('.second-del');


const clock = () => {
    const date = new Date();

    const second = date.getSeconds() / 60;
    const minite = (second + date.getMinutes()) / 60;
    const hours = (minite + date.getHours()) / 12;

    clockRotate(secondHend, second);
    clockRotate(minitesHend, minite);
    clockRotate(HoursHend, hours);
}

const clockRotate = (element, rotation) => {
    element.style.setProperty('--rotate', rotation * 360);
}

setInterval(clock, 1000);