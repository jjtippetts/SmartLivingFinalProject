

const chart = document.getElementById("weightChart").getContext("2d")
var weightData = new Array()
var dateData = new Array()

let weightChart = new Chart(chart,{
    type: 'line',
    data: {
        labels: dateData,
        datasets: [
            {
                label: "Weight Tracker",
                fill: false,
                spanGaps: true,
                lineTension: 0.1,
                backgroundColor:"rgba(75,192,192,.04)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: weightData,
            }
        ]
    }
})

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addData(chart) {

    // chart.data.labels.push(label);
    // chart.data.labels.sort((a, b) => b.date - a.date);
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(data);
    // });

    //console.log(labels)

    //weightData[month-1] = weight
    chart.update();
}



$(document).on('submit', '#AddWeight', function(event) {
    event.preventDefault(event)

    //var month = parseInt($('#AddWeightMonth').val())
    //console.log("Month: " + month)
    //var dateSelected = selectedDate.toLocaleString()

    const formattedDate = selectedDate.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })

    var weight = parseFloat($('#NewWeight').val())
    weightData.push(weight)
    dateData.push(formattedDate)
    addData(weightChart);
    //console.log("Selected Date on Submit: " + selectedDate)
    //console.log("Formatted Date on Submit: " + formattedDate)
    //console.log("Weight Data after added: " + weightData);


})

