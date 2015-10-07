//global namespace


$(document).ready(function(){

  
  localhost.currencyHTML = '';
  localhost.chg_percent = [];
  localhost.currency = [];
  localhost.chart2 = { yAxisMin : null, yAxisMax : null };

  var finance_url = "http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json&view=basic"

  $.ajax({
    method: "GET",
    url: finance_url,
    cache: true,
    dataType: 'jsonp',
    context: localhost, //this will allow for 'this' in callback to be localhost object
    success: function(data){
      
      for(var i = 0; i < data.list.resources.length; i++){
        this.currencyObj = data.list.resources[i].resource.fields;
        this.currencyHTML += '<br/><strong>' + this.currencyObj.name + '<br/></strong>';

        for(prop in this.currencyObj){
          this.currencyHTML += prop + ": " + this.currencyObj[prop] + '<br/>';
        };

        this.chg_percent.push(parseFloat(data.list.resources[i].resource.fields.chg_percent))
        this.currency.push(data.list.resources[i].resource.fields.name)

      }
      this.chart2.yAxisMax = Math.max.apply(Math, this.chg_percent);
      this.chart2.yAxisMin = Math.min.apply(Math, this.chg_percent);

      $('#currencyInfo').html(this.currencyHTML)
      $('#chart2').css({ height:'3500px' })
      var chart2 = new Highcharts.Chart(this.chart2.data)

    }

  });// end Ajax


  localhost.chart2.data = ({
    chart: {
        renderTo: 'chart2',
        type: 'bar'
    },
    title: {
        text: 'Daily Currency Changes'
    },
    subtitle: {
        text: 'Source: finance.yahoo.com'
    },
    xAxis: {
        categories: localhost.currency, //will be assigned during ajax call
        title: {
            text: null
        }
    },
    yAxis: {
        min: localhost.chart2.yAxisMin, //will be assigned during ajax call
        max: localhost.chart2.yAxisMax, //will be assigned during ajax call
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Percent Change',
        data:  localhost.chg_percent//will be assigned during ajax call
    }]
  });

});//end document ready












