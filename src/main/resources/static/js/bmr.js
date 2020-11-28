/**
 *
 * @param gender
 * @param activityLevel
 * @param weight in kg
 * @param height in meters
 */
function calculateBMR(gender, age, activityLevel, weight, height){
    if (gender === "male") {
        kcal = 662 - (9.53 * age) + activityLevel * (15.91 * weight) + (539.6 * height)
    } else {
        kcal = 354 - (6.91 * age) + activityLevel * (9.36 * kg) + (726 * meters)
    }
    return kcal
}

function calculateBMI(kgs, meters){
    return (kgs/(meters * meters))
}

$(document).on('submit', '#BMRCalculator', function (event) {
    event.preventDefault(event)
    var age = parseInt($('#age').val())

    var feet = parseInt($('#feet').val())
    var inches = feet * 12
    inches += parseInt($('#inches').val())
    var meters = inches / 39.37
    var kg = parseInt($('#weight').val()) / 2.2

    var gender = $('#BMRCalculator input[name="gender"]:checked').val()
    var kcal = 0

    var activityLevel = parseFloat($('#activityLevel').val())

    kcal = calculateBMR(gender, age, activityLevel, kg, meters)
    console.log(kg)
    console.log(meters)
    var bmi = calculateBMI(kg,meters)

    $("#kcalResult").text(Math.round(kcal) + " Calories")
    $("#bmiResult").text(bmi.toFixed(1))
})

$(document).on('submit', '#client-bmr', function(event){
    event.preventDefault()

    var age = parseInt($('#client-age').val())

    var feet = parseInt($('#client-feet').val())
    var inches = feet * 12
    inches += parseInt($('#client-inches').val())
    var meters = inches / 39.37
    var kg = parseInt($('#client-weight').val()) / 2.2

    var gender = $('#client-bmr input[name="gender"]:checked').val()
    var kcal = 0

    var activityLevel = parseFloat($('#client-activityLevel').val())
    kcal = calculateBMR(gender, age, activityLevel, kg, meters)

    $("#client-kcal").text(Math.round(kcal) + " Calories")
})