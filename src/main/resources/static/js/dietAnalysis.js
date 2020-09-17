
// Calculates the sum of all the nutrients in each meal by traversing the DOM
function calculateTotalSum() {
    var totals = $(".sum")
    var mealName
    for(var i = 2; i < 6; ++i){
        var sum = 0;
        $(totals).each(function(index){
            var rowItems = totals[index].children
            sum += parseInt(rowItems[i].textContent)
        })
        $("#nutrient-totals").children().eq(i).text(sum)
    }
}

// Calculates the sum of nutrients by traversing the DOM
function calculateSum(listOfFoods) {

    var mealTotals = {
        calories : 0,
        carbohydrates : 0,
        fat : 0,
        protein : 0
    }

    listOfFoods.forEach(function(food){
        mealTotals.calories += parseInt(food.calories)
        mealTotals.carbohydrates += parseInt(food.carbohydrates)
        mealTotals.fat += parseInt(food.fat)
        mealTotals.protein += parseInt(food.protein)
    })
    return mealTotals
}

function calculateMealNutrients(mealName){
    var mealNutrientTotal = $("[data-meal-name='" + mealName +"']")

    console.log(selectedDietPlan.meals)
    selectedDietPlan.meals.forEach(function(meal) {
        if (meal.name === mealName) {
            var mealTotals = calculateSum(meal.foods)
            $(mealNutrientTotal).find('.food-calories').text(mealTotals.calories)
            $(mealNutrientTotal).find('.food-carbohydrates').text(mealTotals.carbohydrates)
            $(mealNutrientTotal).find('.food-fat').text(mealTotals.fat)
            $(mealNutrientTotal).find('.food-protein').text(mealTotals.protein)
        }
    })
}


function updateGraph(){
    $(".meal-name-row").each(function(index){
        console.log($(this).children())
    })
}


function updateCaloriePercentage(){
    var mealNutrients = $(".sum")
    $(mealNutrients).each(function(index){

    })
}


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
