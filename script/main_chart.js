var ip = 'a95c-2001-44c8-451b-e124-a00-27ff-feee-6352.ngrok.io';

(function () {
  `use strict`;
fetch('http://'+ip+'/mainchart')
  .then(response => response.json())
  .then(data => getdata(data))
  .catch(
    error => console.log(error)
  );
function getdata(dataC){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
          var data =  new google.visualization.DataTable();
          data.addColumn('string', 'Time');
          data.addColumn('number', 'Sensor 1');
          data.addColumn('number', 'Sensor 2');
          var i = 0 , s;
          for (v in dataC) {
            i=i+1;
            if(i%2 == 0){
              var temp=[];
              temp.push(dataC[v]['time']);
              temp.push(dataC[v]['humidity_1']);
              temp.push(s['humidity_1']);
              data.addRow(temp);
            }
            s = dataC[v];
          }
          var options = {
            fontName:'TCM',
            hAxis: {
              title: 'Day',
              titleTextStyle: {
                  color: "#707070",
                  fontName: "TCM",
                  fontSize: 18,
                  bold: false,
                  italic: false
              }
            },
            chartArea:{left:80,right:150,top:40,width:"100%",height:"70%"},
            colors: ['#BED8D6', '#EE987F', '#F4D9AB'],
          };
          
          var chart = new google.visualization.AreaChart(document.getElementById('chart_main'));
          chart.draw(data, options);
        }
}
    })();    