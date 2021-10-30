function GetApi(id, element) {

  var Id = document.getElementById(id).value;
  var url = '';
  //getInput
  var D_Date = document.getElementById('D_Date').value;
  var M_m_Date = $('#M_m_Date').val();
  var M_y_Date = $('#M_y_Date').val();
  var Y_Date = $('#Y_Date').val();


  if (Id == "") {
    alert("กรุณากรอก ID");
    return false;
  }
  if (element == 'chart_main') {
    var d = parseInt(D_Date.split("-")[1]);
    var m = parseInt(D_Date.split("-")[2]);
    var y = parseInt(D_Date.split("-")[0]);

    url = 'http://' + ip + '/' + y + '/day?d=' + d + '/' + m + '/' + y + '&s=' + Id;
    console.log(url);
  }
  else if (element == 'chart_sup') {
    url = 'http://' + ip + '/' + M_y_Date + '/month?m=' + M_m_Date + '&s=' + Id;
  }
  else {
    url = 'http://' + ip + '/' + Y_Date + '/year?s=' + Id;
  }
  fetch(url)
    .then(response => response.json())
    .then(data => getdata(data));
  function getdata(dataC) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data;
      if (element == 'chart_main') {
        data = new google.visualization.DataTable();
        data.addColumn('string', 'Time');
        data.addColumn('number', 'Hr');
        var temp = [];
        for (v in dataC) {
          temp = [];
          temp.push(dataC[v]['time']);
          temp.push(dataC[v]['humid']);
          data.addRow(temp);
        }
      }
      else if (element == 'chart_sup') {
        data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ['week1', dataC[0]['week1']],
          ['week2', dataC[0]['week2']],
          ['week3', dataC[0]['week3']],
          ['week4', dataC[0]['week4']]
        ]);
      }
      else {
        data = google.visualization.arrayToDataTable([
          ['Year', 'Sales'],
          ['jan', dataC[0]['jan']],
          ['feb', dataC[0]['feb']],
          ['mar', dataC[0]['mar']],
          ['apr', dataC[0]['apr']],
          ['may', dataC[0]['may']],
          ['jun', dataC[0]['jun']],
          ['jul', dataC[0]['jul']],
          ['aug', dataC[0]['aug']],
          ['sep', dataC[0]['sep']],
          ['oct', dataC[0]['oct']],
          ['nov', dataC[0]['nov']],
          ['dec', dataC[0]['dec']]
        ]);
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
      var chart;
      if (element == 'chart_main') {
        chart = new google.visualization.LineChart(document.getElementById(element));
      }
      else if (element == 'chart_sup') {
        chart = new google.visualization.ColumnChart(document.getElementById(element));
      }
      else {
        chart = new google.visualization.ColumnChart(document.getElementById(element));
      }

      chart.draw(data, options);
    }
  }
}
