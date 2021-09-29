google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Times', 'Sensor id', 'Sensor id','Sensor id'],
          [ 12.00,   30,      40,      50],
          [ 12.15,   40,      45,     30],
          [ 12.30,   45,      48,     30],
          [ 12.45,   30,      20,     10]
        ]);
        var options = {
          fontName:'TCM',
          hAxis: {
            title: '%RH / Times',
            titleTextStyle: {
                color: "#707070",
                fontName: "TCM",
                fontSize: 18,
                bold: false,
                italic: false
            }
          },
          chartArea:{left:50,right:90,top:40,width:"70%",height:"60%"},
          colors: ['#BED8D6', '#EE987F', '#F4D9AB'],
        };
        
        var chart = new google.visualization.AreaChart(document.getElementById('chart_sup2'));
        chart.draw(data, options);
      }