function populateSelectBox(allChartData, selectedChart) {
    for (var i = 0; i < allChartData.length; i++) {
        chart_data = allChartData[i];
        var option = document.createElement("option");
        option.innerHTML = chart_data["chartTitle"];
        option.value = chart_data["chartKey"];
        document.getElementById("chart-select").appendChild(option);
    }
    document.getElementById('chart-select').value = selectedChart["chartKey"]
    document.getElementById('chart-select').focus()
}
