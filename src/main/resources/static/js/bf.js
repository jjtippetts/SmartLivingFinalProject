//formulas found at https://www.bmi-calculator.net/body-fat-calculator/body-fat-formula.php

//function to calculate lean body mass of female
function calculateFemaleLBM(weight, wrist, waist, hip, forearm){
    var factor1 = (weight * 0.732) + 8.987
    var factor2 = wrist / 3.14
    var factor3 = waist * 0.157
    var factor4 = hip * 0.249
    var factor5 = forearm * 0.434
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
    return (bodyFatWeight * 100) / weight
}

//function to calculate male body fat
function calculateMaleBF(weight, waist){
    var lbm = calculateMaleLBM(weight, waist)
    var bodyFatWeight = weight - lbm
    return (bodyFatWeight * 100) / weight
}
