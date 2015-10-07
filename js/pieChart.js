var localhost = { chart1 : { data : null } }; //global namespace

//$(function () { //immediatly envoked function expression - replaced with

$(document).ready(function(){

  var chart;
  var percent_total = 0;

  localhost.chart1.data = ({  // set up object literal so that it can be easily accessed
    chart: {
        renderTo: "browserCompPieChart",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares January, 2015 to May, 2015'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{ // array with length of one
      name: "Brands",
      colorByPoint: true,
      data: [{
            name: "Microsoft Internet Explorer",
            y: 56
        }, {
            name: "Chrome",
            y: 24,
            sliced: true,
            selected: true
        }, {
            name: "Firefox",
            y: 10
        }, {
            name: "Safari",
            y: 4
        }, {
            name: "Opera",
            y: 1
        }, {
            name: "Proprietary or Undetectable",
            y: 5
      }]
    }]
  });


  var series_obj = localhost.chart1.data.series[0]['data']; // gives you back data property

  for(prop in series_obj){
    if(typeof series_obj[prop].y === 'number'){
      percent_total += series_obj[prop].y;
    }
  }

  if(percent_total === 100){
    localhost.chart1.piechart1 = new Highcharts.Chart(localhost.chart1.data)
  } else {
    alert("Pie Chart does not add up to 100%.  Current percentage "+percent_total)
  }


}); //end document ready