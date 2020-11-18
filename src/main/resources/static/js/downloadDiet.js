$(document).on('click', '#download-diet', function (e) {

    var content = []
    var name = selectedDietPlan['name']
    var dietHeader = ["Diet Name: " + name]
    content.push(dietHeader)

    selectedDietPlan['meals'].forEach(meal => {
        content.push(["Meal Name: " + meal['name']])
        foodHeader = ['Name', 'Calories', 'Carbs', 'Fat', 'Protein']
        content.push(foodHeader)
        meal['foods'].forEach(food => {
            foodDetails = []
            foodDetails.push(food['name'],food['calories'], food['carbohydrates'], food['fat'], food['protein'])
            content.push(foodDetails)
        })
    })

    let csvContent = content.map(e => e.join(",")).join("\n");
    var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
    saveAs(blob, name + '.csv');
})