(function () {
  `use strict`;
fetch('http://a95c-2001-44c8-451b-e124-a00-27ff-feee-6352.ngrok.io/subchart2')
  .then(response => response.json())
  .then(data => getdata(data))
  .catch(
    error => console.log(error)
  );
function getdata(dataC){  
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        console.log(dataC);
        var data =  new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        data.addColumn('number', 'Sensor 1');
        data.addColumn('number', 'Sensor 2');
        var i = 0 , s;
        for (v in dataC) {
          i=i+1;
          if(i%2 == 0){
            var temp=[];
            temp.push(dataC[v]['month']);
            temp.push(dataC[v]['humidity_3']);
            temp.push(s['humidity_3']);
            console.log(temp);
            data.addRow(temp);
          }
          s = dataC[v];
        }
        var options = {
          fontName:'TCM',
          hAxis: {
            title: 'Year',
            titleTextStyle: {
                color: "#707070",
                fontName: "TCM",
                fontSize: 18,
                bold: false,
                italic: false
            }
          },
          chartArea:{left:50,right:120,top:40,width:"70%",height:"60%"},
          colors: ['#BED8D6', '#EE987F', '#F4D9AB'],
        };
        
        var chart = new google.visualization.AreaChart(document.getElementById('chart_sup2'));
        chart.draw(data, options);
      }
    }
    })();