(function () {
  `use strict`;

  // fetch('http://' + ip + '/2012/month?m=1&s=1')
  fetch('http://localhost:4000/api/week')
    .then(response => response.json())
    .then(data => getdata(data))
    .catch(
      error => console.log(error)
    );
  function getdata(dataC) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      
      var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales'],
        ['week1', dataC[0]['avgWeek1']],
        ['week2', dataC[0]['avgWeek2']],
        ['week3', dataC[0]['avgWeek3']],
        ['week4', dataC[0]['avgWeek4']],
        ['week5', dataC[0]['avgWeek5']]
      ]);

      var options = {
        fontName: 'TCM',
        hAxis: {
          titleTextStyle: {
            color: "#707070",
            fontName: "TCM",
            fontSize: 18,
            bold: false,
            italic: false
          }
        },
        chartArea: { left: 80, right: 0, top: 40, width: "100%", height: "75%" },
        colors: ['#ED8975'],
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_sup'));
      chart.draw(data, options);
    }
  }
})();