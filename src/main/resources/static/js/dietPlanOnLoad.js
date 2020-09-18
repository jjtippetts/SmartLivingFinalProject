var counter = 0;

var allDietPlans = []


// Loads a diet plan to the screen
function loadDietPlan(dietPlan){
    if(!jQuery.isEmptyObject(dietPlan)){
        // Check if there is a diet name
        if(dietPlan.name != null){

            createDietPlanHTML(dietPlan.name)

            // Create MacroPie Graph
            var dietNutrients = calculateDietNutrients(selectedDietPlan)
            initializeDietMacroPieChart(dietMacros,[dietNutrients.carbohydrates,dietNutrients.fat,dietNutrients.protein])

            // Check if any meals
            if(dietPlan.meals != null && dietPlan.meals.length){
                $(dietPlan.meals).each(function(index){
                    addFoodData.counter += 1
                    var template = $("#add-food-form").html()
                    var addFoodFormHtml = Mustache.render(template,addFoodData)

                    $('#diet-info table:nth-last-child(1)').before(
                        "<table class=\"table table-striped meal\" data-meal-name='" + dietPlan.meals[index].name  +"'>\n" +
                        "  <thead>\n" +
                        "    <tr class=\"meal-name-row table-primary\">\n" +
                        "      <th colspan='6'>" + dietPlan.meals[index].name + "</th>" +
                        "    </tr>\n" +
                        nutrientHeaders +
                        "  </thead>\n" +
                        addFoodFormHtml +
                        "</table> "
                    )

                    var table = $('#diet-info table:nth-last-child(2)')
                    $(table).attr('data-meal-name', dietPlan.meals[index].name)

                    // Check if any foods in a meal
                    if(dietPlan.meals[index].foods != null && dietPlan.meals[index].foods.length){
                        $(dietPlan.meals[index].foods).each(function (j) {
                            var row = $("<tr data-food-name = " + dietPlan.meals[index].foods[j].name + ">")
                            row.append("<td><button class='btn btn-danger rm-food btn-sm'><i class='fas fa-minus'></i></button></td>")
                            row.append("<td>" + dietPlan.meals[index].foods[j].name + "</td>");
                            row.append("<td>" + dietPlan.meals[index].foods[j].calories + "</td>");
                            row.append("<td>" + dietPlan.meals[index].foods[j].carbohydrates + "</td>");
                            row.append("<td>" + dietPlan.meals[index].foods[j].fat + "</td>");
                            row.append("<td>" + dietPlan.meals[index].foods[j].protein + "</td>");
                            $(table).find('tbody').prepend(row)

                            calculateMealNutrients(dietPlan.meals[index].name)
                            calculateTotalSum()

                            makeFoodSortable()
                        })

                    }else{
                        console.log("No foods in: " + dietPlan.meals[index].name)
                    }
                })
                // After Creating all the meals, make sortable
                Sortable.create($("#diet-info")[0], {
                    group: "shared",
                });
            }else{
                console.log("No meals")
            }
        }else{
            console.log("No diet name")
        }
    }else{
        console.log("No saved diet plan")
    }
}


// Gets all of the diets and displays them
function getListOfDiets(){
    // Get List of diet plans
    $.getJSON("/dietplan", function (results) {
        var list = $("#diets-found")
        //Remove previous queries if any
        list.html("")
        $.each(results, function (index) {
            allDietPlans.push(results[index])

            var dietNutrients = calculateDietNutrients(results[index])

            list.append("<a class='found-diet list-group-item list-group-item-action bg-light'>" +
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
$(document).ready(function(){
    // selectedDietPlan = JSON.parse(sessionStorage.getItem("dietplan"))
    //
    // loadDietPlan(selectedDietPlan)
    getListOfDiets()
})


// when user clicks on a found diet. It loads the diet to the page.
$(document).on('click', '.found-diet', function(e){
    var dietName = $(this).find('h5').text()
    console.log($(this).text())

    $(allDietPlans).each(function(index){
        if(allDietPlans[index].name === dietName){
            selectedDietPlan = allDietPlans[index]
        }
    })
    //Reset current Diet Plan
    $('#diet-info').html('')
    $('#diet-total-nutrients').html('')
    loadDietPlan(selectedDietPlan)
})


// For sync button. Syncs newly added diet plans
$(document).on('click', '#sync-diet-plans', function(e){
    getListOfDiets()
})