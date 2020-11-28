var dietMacros = new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
        labels: ["carbs","fat","protein"],
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
            data: [0,0,0]
            //"#e8c3b9","#c45850"
            // label: "Population (millions)",
            // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            // data: [2478,5267,734,784,433]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Macros'
        },
        tooltips: {
            callbacks: {
                // label: function(tooltipItems, data) {
                //     var indice = tooltipItems.index;
                //     return data.datasets[tooltipItems.datasetIndex].data[indice] + 'g';
                // }
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    var total = meta.total;
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                    return currentValue + 'g (' + percentage + '%)';
                },
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    }
});

var caloriesPerMeal = new Chart(document.getElementById("calories-per-meal"), {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: []
            //"#e8c3b9","#c45850"
            // label: "Population (millions)",
            // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            // data: [2478,5267,734,784,433]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Calories Per Meal'
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var currentValue = dataset.data[tooltipItem.index];
                    return currentValue + ' cal';
                },
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    }
});

var barChartFoodGroups = new Chart(document.getElementById("bar-chart-food-groups"), {
    type :'bar',
    data: {
        labels: ['Fruit', 'Vegetable', 'Grain', 'Dairy','Meat','Nuts/Seeds/Beans','Fats/Oils','Sweets','Mixed'],
        datasets: [
            {
                backgroundColor: ["#fb3640","#505F5E","#1d3461", "#1f487e","#247BA0","#A2E8DD","#32DE8A","#C5D86D","#4393F1"],
                data: [0,0,0,0,0,0,0,0,0]
            },
        ]
    },
    options: {
        legend: { display: false},
        title: {
            display: true,
            text: '# Foods Per Food Group'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    stepSize: 1
                }
            }]
        }
    }

})

// Adds a food to a food group in food group chart
function addFoodToBarChartFoodGroup(chart, label){
    $(chart.data.labels).each(function(index){
        if(chart.data.labels[index].toLowerCase() === label.toLowerCase()){
            chart.data.datasets[0].data[index] += 1;
        }
    })
    chart.update();
}

function removeFoodToBarChartFoodGroup(chart, label){
    $(chart.data.labels).each(function(index){
        if(chart.data.labels[index].toLowerCase() === label.toLowerCase()){
            chart.data.datasets[0].data[index] -= 1;
        }
    })
    chart.update();
}

// Adds nutrients to diet macro chart
function addNutrientDietMacroPieChart(chart, food){
    chart.data.datasets[0].data[0] += food.carbohydrates;
    chart.data.datasets[0].data[1] += food.fat;
    chart.data.datasets[0].data[2] += food.protein;
    chart.update();
}

function removeNutrientsDietMacroPieChart(chart, food){
    chart.data.datasets[0].data[0] -= food.carbohydrates;
    chart.data.datasets[0].data[1] -= food.fat;
    chart.data.datasets[0].data[2] -= food.protein;
    chart.update();
}

// Adds the calories of a food to a specific meal for the chart calories per meal
function addCaloriesToCaloriesPerMeal(chart, mealName, food){
    chart.data.labels = getMealNames(selectedDietPlan)

    $(chart.data.labels).each(function(index){
        if(chart.data.labels[index].toLowerCase() === mealName.toLowerCase()){
            if(!chart.data.datasets[0].data[index]){
                chart.data.datasets[0].data[index] = food.calories;
            }else{
                chart.data.datasets[0].data[index] += food.calories;
            }
        }
    })
    chart.update()
}

function removeCaloriesToCaloriesPerMeal(chart, mealName, food){
    chart.data.labels = getMealNames(selectedDietPlan)

    $(chart.data.labels).each(function(index){
        console.log(chart.data.labels[index].toLowerCase())
        console.log(mealName.toLowerCase())
        if(chart.data.labels[index].toLowerCase() === mealName.toLowerCase()){
            console.log("yes")
            console.log(chart.data.datasets[0].data[index])
            console.log(food.calories)
            console.log(chart.data.datasets[0].data)
            chart.data.datasets[0].data[index] -= food.calories;
            console.log(chart.data.datasets[0].data[index])
        }
    })
    chart.update()
}

// Reset Charts
function resetChart(chart){
    $(chart.data.labels).each(function(index){
        chart.data.datasets[0].data[index] = 0;
    })
    chart.update();
}

// Calculates the sum of nutrients
function calculateSumOfNutrients(listOfFoods) {

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

// Updates the nutrient totals for a meal
function displayMealNutrients(mealName){
    var mealNutrientTotal = $("[data-meal-name='" + mealName +"']")

    selectedDietPlan.meals.forEach(function(meal) {
        if (meal.name === mealName) {
            var mealTotals = calculateSumOfNutrients(meal.foods)
            $(mealNutrientTotal).find('.food-calories').text(mealTotals.calories)
            $(mealNutrientTotal).find('.food-carbohydrates').text(mealTotals.carbohydrates)
            $(mealNutrientTotal).find('.food-fat').text(mealTotals.fat)
            $(mealNutrientTotal).find('.food-protein').text(mealTotals.protein)
        }
    })
}

// Calculates the nutrients for a diet plan
function calculateDietNutrients(dietPlan){
    var dietNutrients = {
        calories : 0,
        carbohydrates : 0,
        fat : 0,
        protein : 0
    }
    var dietPlanTotalNutrients = {}
    $(dietPlan.meals).each(function(index){
        if(dietPlan.meals[index].foods != null && dietPlan.meals[index].foods.length){
            var mealNutrients = calculateSumOfNutrients(dietPlan.meals[index].foods)
            dietNutrients.calories += mealNutrients.calories
            dietNutrients.carbohydrates += mealNutrients.carbohydrates
            dietNutrients.protein += mealNutrients.protein
            dietNutrients.fat += mealNutrients.fat
        }

    })
    return dietNutrients
}

// function updateDietMacroPieChart(chart, data){
//     $(data).each(function(index){
//         chart.data.datasets[0].data[index] += data[index]
//         chart.update()
//     })
// }

function addNutrientsUpdateAllCharts(food){

}

// *** NEED TO REPLACE ***
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


