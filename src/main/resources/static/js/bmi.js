
// BMI Calculator takes weight in kg height in m
// returns kgs/m^2
function calculateBMI(kgs, meters){
    return (kgs/(meters * meters))
}

$(document).on('submit', '#BMICalculator', function (event) {
    event.preventDefault(event)
    var age = parseInt($('#BMIage').val())

    var feet = parseInt($('#BMIfeet').val())
    var inches = feet * 12
    inches += parseInt($('#BMIinches').val())
    var meters = inches / 39.37
    var kg = parseInt($('#BMIweight').val()) / 2.2

    var gender = $('#BMICalculator input[name="BMIgender"]:checked').val()

    var activityLevel = parseFloat($('#BMIactivityLevel').val())

    console.log(kg)
    console.log(meters)
    var bmi = calculateBMI(kg,meters)

    $("#bmiResult").text(bmi.toFixed(1))
})