//formulas found at https://www.bmi-calculator.net/body-fat-calculator/body-fat-formula.php
/*Var naming conventions:
    LBM = lean body mass
    BF = body fat
    F = female
    M = male
    Ex: BFF = body fat female, BFM = body fat male
 */
//function to calculate lean body mass of female
function calculateFemaleLBM(weight, wrist, waist, hip, forearm){
    var factor1 = (weight * 0.732) + 8.987
    var factor2 = wrist / 3.14
    var factor3 = waist * 0.157
    var factor4 = hip * 0.249
    var factor5 = forearm * 0.434
    //console.log('lbm info: ' + weight + wrist + waist + hip + forearm)
    //console.log('lbm: ' + factor1 + ' ' + factor2 +' ' + factor3 +' ' + factor4 +' ' + factor5)
    return factor1 + factor2 + factor3 + factor4 + factor5
}

//function to calculate lean body mass of male
function calculateMaleLBM(weight, waist){
    var factor1 = (weight * 1.082) + 94.42
    var factor2 = waist * 4.15
    return factor1 - factor2
}

//function to calculate female body fat
function calculateFemaleBF(weight, wrist, waist, hip, forearm){
    var lbm = calculateFemaleLBM(weight, wrist, waist, hip, forearm)
    var bodyFatWeight = weight - lbm
    //console.log('cfb lbm: ' + lbm)
    //console.log('bfw: ' + bodyFatWeight)
    return (bodyFatWeight * 100) / weight
}

//function to calculate male body fat
function calculateMaleBF(weight, waist){
    var lbm = calculateMaleLBM(weight, waist)
    var bodyFatWeight = weight - lbm
    return (bodyFatWeight * 100) / weight
}

//Female Submit to calculate lean body mass and body fat
$(document).on('submit', '#BFCalculatorFemale', function(event) {
    event.preventDefault(event)
    var weight = parseFloat($('#BFFWeight').val())
    var wrist = parseFloat($('#BFWrist').val())
    var waist = parseFloat($('#BFFWaist').val())
    var hip = parseFloat($('#BFHip').val())
    var forearm = parseFloat($('#BFForearm').val())

    var leanBodyMass = calculateFemaleLBM(weight, wrist, waist, hip, forearm)
    var bodyFat = calculateFemaleBF(weight, wrist, waist, hip, forearm)

    $("#LBMResultFemale").text(leanBodyMass.toFixed(1))
    $("#BFResultFemale").text(bodyFat.toFixed(2) + "%")

})