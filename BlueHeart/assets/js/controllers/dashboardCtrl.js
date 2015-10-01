'use strict';
/** 
  * controllers used for the dashboard
*/
var url = "http://blueheart.16mb.com/blueheart/services/"; 

app.controller('TableCtrl', ["$scope", "$http", "$timeout", "ngTableParams", function ($scope, $http, $timeout, ngTableParams) {
    


    $http.get(url+"leerDatos.php")
    .success(function (data){
        console.log(data.resultado);
        $scope.datosRec = data.resultado;
    });

    $scope.promiseTab = $timeout( function(){
    console.log($scope.datosRec);
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 5 // count per page
    }, {
        total: $scope.datosRec.length, // length of $scope.datosRec
        getData: function ($defer, params) {
            $defer.resolve($scope.datosRec.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    },2500);
}]);


app.controller('VisitsCtrl', [ "$scope", "$http", "$timeout", function ($scope, $http, $timeout) {

        $scope.flag = 0;
        $scope.mensaje = false;
        $scope.botonA = false;
        $scope.data = [];
        $scope.dataRec = [];
        $scope.labels = [];
        $scope.series = ['Sistole', 'Diastole', 'Pulso'];
        $scope.contador = 0;
        var datosSistole = [];
        var datosDiastole = [];
        var datosPulso = [];
        var datosFecha = [];
        $scope.totalSistole = 0;
        $scope.totalDiastole = 0;
        $scope.totalPulso = 0 ;
        
        $http.get(url+"leerDatos.php")
        .success(function (data){
            console.log(data.resultado);
            $scope.datosRec = data.resultado;
        });

        $scope.mypromise = $timeout( function(){

            for(var i = 0; i < $scope.datosRec.length; i++) {
                datosSistole[i] = $scope.datosRec[i].sistole;
                datosDiastole[i] = $scope.datosRec[i].diastole;
                datosPulso[i] = $scope.datosRec[i].pulso;
                $scope.labels.push($scope.datosRec[i].fecha);
                console.log($scope.totalSistole);
                $scope.totalSistole += parseInt(datosSistole[i]);
                $scope.totalDiastole += parseInt(datosDiastole[i]);
                $scope.totalPulso += parseInt(datosPulso[i]);
            }

            $scope.dataRec[0] = datosSistole;
            $scope.dataRec[1] = datosDiastole;
            $scope.dataRec[2] = datosPulso;

            if($scope.dataRec[0].length == 0) {
                $scope.mensaje = true;
            }

            $scope.totalSistole = parseInt(($scope.totalSistole)/7);
            $scope.totalDiastole = parseInt(($scope.totalDiastole)/7);
            $scope.totalPulso = parseInt(($scope.totalPulso)/7);
            
            $scope.data = {
                labels: $scope.labels,
                datasets: [
                  {
                      label: $scope.series[0],
                      fillColor: 'rgba(220,220,220,0.2)',
                      strokeColor: 'rgba(220,220,220,1)',
                      pointColor: 'rgba(220,220,220,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: $scope.dataRec[0]
                  },
                  {
                      label: $scope.series[1],
                      fillColor: 'rgba(151,187,205,0.2)',
                      strokeColor: 'rgba(151,187,205,1)',
                      pointColor: 'rgba(151,187,205,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data:  $scope.dataRec[1]
                  },
                  {
                      label: $scope.series[2],
                      fillColor: 'rgba(0,187,205,0.2)',
                      strokeColor: 'rgba(0,187,205,1)',
                      pointColor: 'rgba(0,187,205,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data:  $scope.dataRec[2]
                  }
                ]
            };

            $scope.options = {

                // maintainAspectRatio: false,

                // Sets the chart to be responsive
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: 'rgba(0,0,0,.05)',

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - Whether the line is curved between points
                bezierCurve: false,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                // Function - on animation progress
                onAnimationProgress: function () { },

                // Function - on animation complete
                onAnimationComplete: function () { },

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };

            $scope.dataMed = {
                labels: ['Sistole','Diastole','Pulso'],
                datasets: [
                  {
                      label: $scope.series[0],
                      fillColor: 'rgba(220,220,220,0.2)',
                      strokeColor: 'rgba(220,220,220,1)',
                      pointColor: 'rgba(220,220,220,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: parseInt($scope.totalSistole)
                  },
                  {
                      label: $scope.series[1],
                      fillColor: 'rgba(151,187,205,0.2)',
                      strokeColor: 'rgba(151,187,205,1)',
                      pointColor: 'rgba(151,187,205,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data:  parseInt($scope.totalDiastole)
                  },
                  {
                      label: $scope.series[2],
                      fillColor: 'rgba(0,187,205,0.2)',
                      strokeColor: 'rgba(0,187,205,1)',
                      pointColor: 'rgba(0,187,205,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data:  parseInt($scope.totalPulso)
                  }
                ]
            };
            $scope.options = {

                // maintainAspectRatio: false,

                // Sets the chart to be responsive
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: 'rgba(0,0,0,.05)',

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - Whether the line is curved between points
                bezierCurve: false,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                // Function - on animation progress
                onAnimationProgress: function () { },

                // Function - on animation complete
                onAnimationComplete: function () { },

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            };

        },4000);
}]);

app.controller('OnotherCtrl', ["$scope", function ($scope) {

    // Chart.js Data
    $scope.data = [
      {
          value: 300,
          color: '#F7464A',
          highlight: '#FF5A5E',
          label: 'Red'
      },
      {
          value: 50,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Green'
      },
      {
          value: 100,
          color: '#FDB45C',
          highlight: '#FFC870',
          label: 'Yellow'
      }
    ];
    $scope.total = 450;
    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: false,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };

}]);
app.controller('LastCtrl', ["$scope", function ($scope) {

    // Chart.js Data
    $scope.data = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
              label: 'My First dataset',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: 'rgba(151,187,205,1)',
              pointColor: 'rgba(151,187,205,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
    };

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether to show lines for each scale point
        scaleShowLine: true,

        //Boolean - Whether we show the angle lines out of the radar
        angleShowLineOut: true,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels: false,

        // Boolean - Whether the scale should begin at zero
        scaleBeginAtZero: true,

        //String - Colour of the angle line
        angleLineColor: 'rgba(0,0,0,.1)',

        //Number - Pixel width of the angle line
        angleLineWidth: 1,

        //String - Point label font declaration
        pointLabelFontFamily: '"Arial"',

        //String - Point label font weight
        pointLabelFontStyle: 'normal',

        //Number - Point label font size in pixels
        pointLabelFontSize: 10,

        //String - Point label font colour
        pointLabelFontColor: '#666',

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 3,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

}]);
