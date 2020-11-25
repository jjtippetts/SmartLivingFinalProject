

const chart = document.getElementById("weightChart")

let weightChart = new Chart(chart,{
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April",
                "May", "June", "July", "August", "September",
                "October", "November", "December"],
        datasets: [
            {
                label: "Weight Tracker",
                fill: false,
                lineTension: 0.1,
                data: [200, 198, 195, 188, 180, 175, 170],
            }
        ]
    }
})

