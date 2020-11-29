const date_picker_element = document.querySelector('.date-picker')
const selected_date_element = document.querySelector('.date-picker .selected-date')
const dates_element = document.querySelector('.date-picker .dates')
const mth_element = document.querySelector('.date-picker .dates .month .mth')
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth')
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth')
const days_element = document.querySelector('.date-picker .dates .days')

const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"]

let date = new Date()
let day = date.getDate()
let month = date.getMonth()
let year = date.getFullYear()

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;


populateDates();

// Event listeners
date_picker_element.addEventListener('click', toggleDatePicker)

next_mth_element.addEventListener('click', goToNextMonth)
prev_mth_element.addEventListener('click', goToPrevMonth)

// Function to keep the date picker active when selected
function toggleDatePicker(e) {

    // if not clicking on dates we can toggle the class
    if(!checkEventPathForClass(e.path, 'dates')) {
        //e.preventDefault(e)
        dates_element.classList.toggle('active')
    }
}

//Next month function
function goToNextMonth(e) {
    month++
    if (month > 11){
        month = 0
        year++
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

//Previous month function
function goToPrevMonth(e) {
    month--
    if (month < 0){
        month = 11
        year--
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates()
}

//Main functionality
//Checks what month and fills the day element with the appropriate number of days
//
function populateDates(e) {
    days_element.innerHTML = '';
    let amount_days = 31;

    //February
    if(month == 1){
        amount_days = 28;
    }
    if (month == 3 || month == 5 || month == 8 || month == 10){
        amount_days = 30;
    }

    for (let i = 0; i < amount_days; i++){
        const day_element = document.createElement('div')
        day_element.classList.add('day')
        day_element.textContent = i + 1;

        if (selectedDay == (i+1) && selectedYear == year && selectedMonth == month){
            day_element.classList.add('selected')
        }

        day_element.addEventListener('click', function(){
            selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1))
            selectedDay = (i + 1)
            selectedMonth = month;
            selectedYear = year;

            selected_date_element.textContent = formatDate(selectedDate)
            selected_date_element.dataset.value = selectedDate;

            populateDates()

        })

        days_element.appendChild(day_element)
        //console.log("Selected Date: " + selectedDate)

    }
}

// helper functions
// helper function to check the path
function checkEventPathForClass(path, selector){
    for (let i = 0; i < path.length; i++){
        if (path[i].classList && path[i].classList.contains(selector)){
            return true;
        }
    }
    return false;
}

function formatDate(d){
    let day = d.getDate()
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1
    if (month < 10) {
        month = '0' + month;
    }
    let year = d.getFullYear()

    return month + ' / ' + day + ' / ' + year

}

