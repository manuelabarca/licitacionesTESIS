/**
 * Created by Manuel Labarca
 */
var app = angular.module('licitacionesMercado', []);

app.controller('licitaciones_all', function($scope, $http, $interval){
    var ticket = "EB9BA9FD-B1DA-4C27-B78D-7A095969577B";
    $scope.fechaActual = new Date();
    var mes = $scope.fechaActual.getMonth()+1;
    var diaO = $scope.fechaActual.getDate();
    var date, NMes, dia;
    switch(mes){
        case 1: NMes = "01";
            break;
        case 2: NMes = "02";
            break;
        case 3: NMes = "03";
            break;
        case 4: NMes = "04";
            break;
        case 5: NMes = "05";
            break;
        case 6: NMes = "06";
            break;
        case 7: NMes = "07";
            break;
        case 8: NMes = "08";
            break;
        case 9: NMes = "09";
        default: "Este mes no necesita formateo, o no es un mes valido.";
            break;
    }

    switch(diaO){
        case 1: dia = "01";
            break;
        case 2: dia = "02";
            break;
        case 3: dia = "03";
            break;
        case 4: dia = "04";
            break;
        case 5: dia = "05";
            break;
        case 6: dia = "06";
            break;
        case 7: dia = "07";
            break;
        case 8: dia="08";
            break;
        case 9: dia="09";
            break;
        default: dia = $scope.fechaActual.getDate();
            break;
    }

    date = dia+NMes+$scope.fechaActual.getFullYear();
    $http.get("http://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha="+date+"&ticket="+ticket).then(function (res) {

        $scope.licitacion = res.data.Listado;

        $scope.totalL = parseInt(res.data.Cantidad);
        $scope.porcentaje = parseFloat((res.data.Cantidad*100)/1167).toFixed(1);
        $scope.getCount = function(type){
            return filterFilter($scope.licitacion, {CodigoEstado: type}).length;
        }
        console.log(porcentaje);
        console.log(res.data.Listado);
    });

    //filtro

    //Automatic Refresh
    var c = 0;
    $scope.message="La página se recargara cada 30 minutos, para buscar nuevas licitaciones";
    $interval(function(){
        $scope.message="La página se recargara cada 30 minutos, para buscar nuevas licitaciones";
        c++;
        if(c === 1000){
            window.location.reload();
            c=0;
        }
    }, 100);

    //Extraer Información de las licitaciones

    $scope.getInfo = function(code){
        $http.get("http://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo="+code+"&ticket="+ticket).then(function(info){
           $scope.url = info.data.Listado;
            console.log(info.data);
        });
    }

    $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Oportunidad de negocio - Cliente.xls");
    };

});

app.controller('busquedaLicitacion', ['$scope', function ($scope) {
    $scope.data = {
        model: null,
        opciones: [
            {porMonto:[
            {name: "Menor a 500.000", value: "<=500.000"},
            {name: "500.000 A 1.000.000", value: "500.001 =><= 1.000.000 "},
            {name:"1.000.000 a 2.000.000", value: "0"},
            {name: "2.000.000 a 3.000.000", value: "0"},
            {name: "3.000.000 a 10.000.000", value: "0"},
            {name: "Mayor a 10.000.000", value: "0"}]},
            {porEstado:[
                {name: "Publicada", value: "5"},
                {name: "Cerrada", value:"6"},
                {name: "Desierta", value:"7"},
                {name: "Adjudicada", value:"8"},
                {name: "Revocada"}
            ]}
            ]

    };
}]);


app.filter('estadoString', function() {
    return function(input) {
        values = {
            5: "Publicada",
            6: "Cerrada",
            7: "Desierta",
            8: "Adjudicada",
            18: "Revocada",
            19: "Suspendida"
        }
        if (values[input] === undefined) return "Desconocido"

        return values[input]

    };
});

app.filter('colorEstado', function() {
    return function (input) {
        values = {
            5: "table-success"
        }

    if (values[input] === undefined) return "table-info"

    console.log( values[input]);
};
});

