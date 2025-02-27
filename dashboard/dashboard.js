document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/get-data")
        .then(response => response.json())
        .then(data => {
            let ctx = document.getElementById("productivityChart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: "Time Spent (minutes)",
                        data: Object.values(data).map(ms => ms / 60000),
                        backgroundColor: ["green", "red"]
                    }]
                }
            });
        });
});
