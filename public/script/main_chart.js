var ip = '192.168.2.49:4000';

(function () {
  `use strict`;
  // fetch('http://' + ip + '/2012/day?d=1/15/2012&s=1')
  fetch('http://'+ ip + '/api/realtime')
    .then(response => response.json())
    .then(data => getdata(data))
    .catch(
      error => console.log(error)
    );
  function getdata(dataC) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Time');
      data.addColumn('number', 'Hr');
      
      for (v in dataC) {
        function convertFromStringToDate(responseDate) {
          let dateComponents = responseDate.split('T');
          let datePieces = dateComponents[0].split("-");
          let timePieces = dateComponents[1].split(":");
          return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
            timePieces[0], timePieces[1], timePieces[2]))
        }
        // 2012-01-01T00:00:00.000+00:00
        // var date = convertFromStringToDate('21-03-2020T11:20:30')
        console.log(dataC[v]['timestamp'][0]);
        temp = [];
        temp.push(dataC[v]['timestamp']);
        temp.push(dataC[v]['humidity']);
        data.addRow(temp);

      }

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
        chartArea: { left: 80, right: 0, top: 40, width: "100%", height: "80%" },
        colors: ['#ED8975'],
      };
      var chart = new google.visualization.LineChart(document.getElementById('chart_main'));
      chart.draw(data, options);
    }
  }
})();