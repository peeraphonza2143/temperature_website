function GetApi(id,element){
var ip = '3b62-182-232-181-157.ngrok.io';
var Id = document.getElementById(id).value;

//getInput
var D_Date = document.getElementById('D_Date').value;
var M_m_Date = document.getElementById('M_m_Date').value;
var M_y_Date = document.getElementById('M_y_Date').value;
var Y_Date = document.getElementById('Y_Date').value;

if (Id == "") {
    alert("กรุณากรอก ID");
    return false;
  }
// fetch('http://'+ip+'/mainchart')
//   .then(response => response.json())
//   .then(data => getdata(data));
//   function getdata(dataC){
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
            //     temp.push(dataC[v]['time']);
            //     temp.push(dataC[v]['humidity_1']);
            //     temp.push(s['humidity_1']);
            //     data.addRow(temp);
            //   }
            //   s = dataC[v];
            // }
            var data = google.visualization.arrayToDataTable([
              ['Year', 'Sales'],
              ['2004',  5000],
              ['2005',  4170],
              ['2006',  860],
              ['2007',  2030]
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
              chartArea:{left:80,right:0,top:40,width:"100%",height:"80%"},
              colors: ['#ED8975'],
            };
            var chart;
            if(element == 'chart_main'){
               chart = new google.visualization.LineChart(document.getElementById(element));
            }
            else{
               chart = new google.visualization.ColumnChart(document.getElementById(element));
            }
            
            chart.draw(data, options);
          }
  }
// }
