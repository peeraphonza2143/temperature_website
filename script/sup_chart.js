// (function () {
// `use strict`;
// fetch('http://'+ip+'/subchart1')
//   .then(response => response.json())
//   .then(data => getdata(data))
//   .catch(
//     error => console.log(error)
//   );
  // function getdata(dataC){   
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
      function drawChart() {

        // var data =  new google.visualization.DataTable();
        // data.addColumn('string', 'Time');
        // data.addColumn('number', 'Sensor 1');
        // data.addColumn('number', 'Sensor 2');
        // var i = 0 , s;
        // for (v in dataC) {
        //   i=i+1;
        //   if(i%2 == 0){
        //     var temp=[];
        //     temp.push(dataC[v]['week']);
        //     temp.push(dataC[v]['humidity_2']);
        //     temp.push(s['humidity_2']);
        //     console.log(temp);
        //     data.addRow(temp);
        //   }
        //   s = dataC[v];
        // }
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ['2004',  1000],
          ['2005',  1170],
          ['2006',  660],
          ['2007',  1030]
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
        
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_sup'));
        chart.draw(data, options);
      }
    // }
    // })();