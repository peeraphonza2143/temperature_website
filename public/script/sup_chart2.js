(function () {
  `use strict`;
fetch('http://'+ip+'/year')
  .then(response => response.json())
  .then(data => getdata(data))
  .catch(
    error => console.log(error)
  );
function getdata(dataC){  
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

   
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ['jan',  dataC[0]['jan']],
          ['feb',  dataC[0]['feb']],
          ['mar',  dataC[0]['mar']],
          ['apr',  dataC[0]['apr']],
          ['may',  dataC[0]['may']],
          ['jun',  dataC[0]['jun']],
          ['jul',  dataC[0]['jul']],
          ['aug',  dataC[0]['aug']],
          ['sep',  dataC[0]['sep']],
          ['oct',  dataC[0]['oct']],
          ['nov',  dataC[0]['nov']],
          ['dec',  dataC[0]['dec']]

        ]);

        var options = {
          fontName:'TCM',
          hAxis: {
            titleTextStyle: {
                color: "#707070",
                fontName: "TCM",
                fontSize: 18,
                bold: false,
                italic: false
            }
          },
          chartArea:{left:80,right:0,top:40,width:"100%",height:"75%"},
            colors: ['#ED8975'],
        };
        
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_sup2'));
        chart.draw(data, options);
      }
    }
    })();