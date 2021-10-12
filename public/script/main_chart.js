var ip = '192.168.43.210:3000';

(function () {
  `use strict`;
fetch('http://'+ip+'/day?d=1/15/2012&s=1')
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
          data.addColumn('number', 'Hr');
          var temp=[];
          console.log(dataC);
          for (v in dataC) {
         
              temp=[];
              temp.push(dataC[v]['time']);
              temp.push(dataC[v]['humid']);
              data.addRow(temp);
            
          }
        
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
            chartArea:{left:80,right:0,top:40,width:"100%",height:"80%"},
            colors: ['#ED8975'],
          };
          var chart = new google.visualization.LineChart(document.getElementById('chart_main'));
          chart.draw(data, options);
        }
}
    })();    