var counter = 0;

var allDietPlans = []


// Loads a diet plan to the screen
function loadDietPlan(dietPlan) {
    if (!jQuery.isEmptyObject(dietPlan)) {
        // Check if there is a diet name
        if (dietPlan.name != null) {

            createDietPlanHTML(dietPlan.name)

            // Check if any meals
            if (dietPlan.meals != null && dietPlan.meals.length) {
                $(dietPlan.meals).each(function (index) {
                    $("#list-of-meals").append("<option>" + dietPlan.meals[index].name + "</option>")

                    // Add form to add meal
                    addFoodData.counter += 1
                    var template = $("#add-food-form").html()
                    var addFoodFormHtml = Mustache.render(template, addFoodData)

                    var mealName = dietPlan.meals[index].name

                    $('#diet-info table:nth-last-child(1)').before(
                        "<table class=\"table table-striped meal table-sm\" data-meal-name='" + mealName + "'>\n" +
                        "  <thead>\n" +
                        "    <tr class=\"meal-name-row table-primary\">\n" +
                        "      <th colspan='7'>" + mealName + "</th>" +
                        "    </tr>\n" +
                        nutrientHeaders +
                        "  </thead>\n" +
                        addFoodFormHtml +
                        "</table> "
                    )

                    var table = $('#diet-info table:nth-last-child(2)')
                    $(table).attr('data-meal-name', mealName)

                    // Check if any foods in a meal
                    if (dietPlan.meals[index].foods != null && dietPlan.meals[index].foods.length) {
                        $(dietPlan.meals[index].foods).each(function (j) {
                            //Create food row with data and insert into table
                            var food = dietPlan.meals[index].foods[j]
                            var row = createFoodRow(food)
                            $(table).find('tbody tr:nth-last-child(2)').before(row)

                            displayMealNutrients(mealName)
                            calculateTotalSum()

                            makeFoodSortable()
                            $(function () {
                                $('[data-toggle="popover"]').popover({
                                    container: 'main'
                                })
                            })
                            $('.popover-dismiss').popover({
                                trigger: 'focus'
                            })
                            if (food.foodGroup !== 'UNDEFINED') {
                                addFoodToBarChartFoodGroup(barChartFoodGroups, food.foodGroup.replace("_", "/"))
                            }
                            addNutrientDietMacroPieChart(dietMacros, food)
                            addCaloriesToCaloriesPerMeal(caloriesPerMeal,mealName,food)

                        })

                    } else {
                        console.log("No foods in: " + dietPlan.meals[index].name)
                    }
                })
                // After Creating all the meals, make sortable
                Sortable.create($("#diet-info")[0], {
                    group: "shared",
                });
            } else {
                console.log("No meals")
            }
        } else {
            console.log("No diet name")
        }
    } else {
        console.log("No saved diet plan")
    }
}


// Gets all of the diets and displays them
function getListOfDiets() {
    // Get List of diet plans
    $.getJSON("/dietplan", function (results) {
        var list = $("#diets-found")
        //Remove previous queries if any
        list.html("")
        $.each(results, function (index) {
            allDietPlans.push(results[index])

            var dietNutrients = calculateDietNutrients(results[index])

            list.append("<a class='found-diet list-group-item list-group-item-action btn'>" +
                "<h5 class='text-primary'>" +
                results[index].name +
                "</h5>" +
                "Calories: " +
                dietNutrients.calories + " cal" +
                " &#x25CF Carbs: " +
                dietNutrients.carbohydrates + "g" +
                " &#x25CF Fat: " +
                dietNutrients.fat + "g" +
                " &#x25CF Protein: " +
                dietNutrients.protein + "g" +
                "</a>")
            JSON.stringify(results[index])
        })
    })
}


// Loads a diet if screen was refreshed
$(document).ready(function () {
    // selectedDietPlan = JSON.parse(sessionStorage.getItem("dietplan"))
    //
    // loadDietPlan(selectedDietPlan)
    getListOfDiets()
})


// when user clicks on a found diet. It loads the diet to the page.
$(document).on('click', '.found-diet', function (e) {
    // Remove active state from all previously selected diet plans
    $(".found-diet.active").removeClass("active")

    $(this).addClass('active')
    var dietName = $(this).find('h5').text()
    console.log($(this).text())

    $(allDietPlans).each(function (index) {
        if (allDietPlans[index].name === dietName) {
            selectedDietPlan = allDietPlans[index]
        }
    })
    //Reset current Diet Plan
    $('#diet-info').html('')
    $('#diet-total-nutrients').html('')

    // Reset charts
    resetChart(barChartFoodGroups);
    resetChart(dietMacros);
    resetChart(caloriesPerMeal);

    // Load Selected Diet Plan
    loadDietPlan(selectedDietPlan)
    console.log(selectedDietPlan)
})


// For sync button. Syncs newly added diet plans
$(document).on('click', '#sync-diet-plans', function (e) {
    getListOfDiets()
})