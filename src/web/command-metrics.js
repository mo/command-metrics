function initSelectBox(chartSelectContainerElement, allChartData, initiallySelectedChartKey) {
    const chartSelectElement = document.createElement('select')
    chartSelectContainerElement.append(chartSelectElement)
    for (var i = 0; i < allChartData.length; i++) {
        chart_data = allChartData[i];
        var option = document.createElement("option");
        option.innerHTML = chart_data["chartTitle"];
        option.value = chart_data["chartKey"];
        chartSelectElement.appendChild(option);
    }
    chartSelectElement.value = initiallySelectedChartKey
    chartSelectElement.focus()
    chartSelectElement.addEventListener('change', (ev) => {
        const selectedChartKey = ev.target.value
        loadChart(selectedChartKey)

        const url = new URL(window.location)
        url.searchParams.set('chart', selectedChartKey)
        window.history.pushState({}, '', url)
    })
}

window.loadedSeriesData = {}
window.pendingSerieIds = []
function loadSeriesData(chartSeries, ready) {
    const seriesIdsToLoad = chartSeries.map(series => series.id)
    pendingSerieIds.push(...seriesIdsToLoad.filter(serieId => !loadedSeriesData[serieId]))
    console.debug(`Will load ${pendingSerieIds.length} series out of ${seriesIdsToLoad.length} total`)
    window.onSeriesLoaded = (loadedName) => {
        pendingSerieIds = pendingSerieIds.filter(seriesName => seriesName !== loadedName)
        if (pendingSerieIds.length === 0) {
            ready()
        }
    }
    if (pendingSerieIds.length === 0) {
        ready()
    } else {
        pendingSerieIds.forEach(serieId => {
            const scriptElement = document.createElement('script')
            scriptElement.src = `../../../jscache/${serieId}.js`
            document.body.appendChild(scriptElement)
            console.debug(`Loading data for series ${serieId}`)
        })
    }
}

function loadChart(chartKey) {
    const selectedChart = allChartData.find(ch => ch.chartKey === chartKey)

    loadSeriesData(selectedChart.chartSeries, () => {
        const seriesInSelectedChart = selectedChart.chartSeries.flatMap((serie) => {
            const seriesData = window.loadedSeriesData[serie.id]
            if (seriesData.length === 0) {
                console.warn(`WARNING: serie with name "${serie.name}" has empty data array, it will be ignored.`);
                return []
            }
            return [{ ...serie, data: seriesData }]
        })
        const agElement = document.querySelector('#analysis-chart-placeholder');
        const analysisChart = new AnalysisChart({
            element: agElement,
            series: seriesInSelectedChart,
            rightColumnWidth: 400,
            width: params["width"] || window.innerWidth,
            height: params["height"] || window.innerHeight - 160,
            xFormatter: (x) => AnalysisChart.timestampToDatetimeString(x),
            annotations: selectedChart.chartAnnotations,
            yAxisScalingMode: selectedChart.chartYAxis,
        });
        analysisChart.onYAxisScalingChanged((newMode) => {
            // TODO: save in url?
        });
    });
}

