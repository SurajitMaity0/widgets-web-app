

let daysContainer = document.querySelector(".month-days");
let monthHTML = document.querySelector(".MonthYear");
let prevBtn = document.querySelector('.prev-btn');
let nextBtn = document.querySelector('.next-btn');
let week = document.querySelector(".weeks");
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];

const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
const date = new Date();
// current month
let currentmonth = date.getMonth();
// current year
let currentyear = date.getFullYear();

for (let i = 0; i < days.length; i++) {
    week.innerHTML += `<div class='week'>${days[i]}</div>`;
}

const renderCalendar = () => {
    date.setDate(1);
    const firstDay = new Date(currentyear, currentmonth, 1);
    const lastDay = new Date(currentyear, currentmonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentyear, currentmonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;


    monthHTML.innerHTML = `${months[currentmonth]} ${currentyear}`

    let day = "";
    for (let x = firstDay.getDay(); x > 0; x--) {
        day += `<div class='days prev'>${prevLastDayDate - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDayDate; i++) {
        if (
            i === new Date().getDate() &&
            currentmonth === new Date().getMonth() &&
            currentyear === new Date().getFullYear()) {

            day += `<div class='days today'>${i}</div>`;

        } else {
            day += `<div class='days'>${i}</div>`;
        }

    }
    for (let j = 1; j <= nextDays; j++) {
        day += `<div class='days next'>${j}</div>`;
    }

    if (day.length >= 947) {
        daysContainer.style.gridTemplateRows = "1fr 1fr 1fr 1fr 1fr 1fr";
    }
    else if (day.length > 800) {
        daysContainer.style.gridTemplateRows = "1fr 1fr 1fr 1fr 1fr";
    }
    else if (day.length > 650) {
        daysContainer.style.gridTemplateRows = "1fr 1fr 1fr 1fr";
    }

    daysContainer.innerHTML = day;


};
nextBtn.addEventListener("click", () => {
    currentmonth++;
    if (currentmonth > 11) {
        currentmonth = 0;
        currentyear++;
    }
    renderCalendar();
});
prevBtn.addEventListener("click", () => {
    currentmonth--;
    if (currentmonth < 0) {
        currentmonth = 11;
        currentyear--;
    }
    renderCalendar();
});
renderCalendar();