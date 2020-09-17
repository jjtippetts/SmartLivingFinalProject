var counter = 0;

function loadDietPlan(dietPlan){
    if(!jQuery.isEmptyObject(dietPlan)){
        // Check if there is a diet name
        if(dietPlan.name != null){
            createDietPlanHTML()

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
                    //addData(dietMacros, formData.get("name"),0 )

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

$(document).ready(function(){
    var dietPlan = JSON.parse(sessionStorage.getItem("dietplan"))

    loadDietPlan(dietPlan)
})