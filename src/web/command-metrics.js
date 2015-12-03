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

function getSeriesXDataNames(chartData) {
    var xDataNames = {};

    var allSeries = chartData["chartSeries"];
    for (var i = 0; i < allSeries.length; i++) {
        xDataNames["data" + i ] = "x" + i;
    }

    return xDataNames;
}

function getSeriesData(chartData) {
    var seriesData = [];

    var allSeries = chartData["chartSeries"];
    for (var i = 0; i < allSeries.length; i++) {
        var xData = allSeries[i]["xValues"];
        xData.unshift("x" + i);
        seriesData.push(xData);

        var yData = allSeries[i]["yValues"];
        yData.unshift("data" + i);
        seriesData.push(yData);
    }

    return seriesData;
}

function getSeriesColors(chartData) {
    var colors = {};
    var allSeries = chartData["chartSeries"];
    for (var i = 0; i < allSeries.length; i++) {
        colors["data" + i] = allSeries[i]["seriesColor"];
    }
    return colors;
}

function getSeriesTitles(chartData) {
    var seriesTitles = {};
    var allSeries = chartData["chartSeries"];
    for (var i = 0; i < allSeries.length; i++) {
        seriesTitles["data" + i] = allSeries[i]["seriesTitle"];
    }
    return seriesTitles;
}

function renderChart(chartData) {
    var seriesXDataNames = getSeriesXDataNames(chartData);
    var seriesColumns = getSeriesData(chartData);
    var seriesColors = getSeriesColors(chartData);
    var seriesTitles = getSeriesTitles(chartData);

    var chart = c3.generate({
        padding: {
            left: 50,
            right: 25,
        },
        data: {
            xFormat: '%Y-%m-%d %H:%M:%S',
            xs: seriesXDataNames,
            columns: seriesColumns,
            colors: seriesColors,
            names: seriesTitles,
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    count: 6,
                    format: '%Y-%m-%d %H:%M'
                }
            }
        },
        tooltip: {
            grouped: false,
            format: {
                title: d3.time.format('%Y-%m-%d %H:%M:%S'),
            }
        },
    });
}
