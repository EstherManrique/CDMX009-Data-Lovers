import data from './data/injuries/injuries.js';

//DECLARANDO VARIABLES GLOBALES
let img;
let medio;
let fromYear;
let toYear;
let list = [];
let icons = document.querySelectorAll('.iconSelect');
let años = [];
let heridos = [];
let dataFinal = [];
let obj;
let array = [];

export const accDatos = () => {
  
  let database = data   //ASIGNANDO A UNA VARIBLE LA BASE DE DATOS
  
//FUNCIONES PARA RECORRER Y SELECCIONAR EL ICONO DEL MEDIO DE TRANSPORTE.
  function setSelectedImage(e) {
    img = e.target;

    document.getElementById('imgSelect').innerHTML = `<img src="${img.src}"/>`;       
    medio = img.id;
    document.getElementById('descMedio').innerHTML = medio;
    document.getElementById('imgSelectTabla').innerHTML = `<img src="${img.src}"/>`; 
    document.getElementById('descMedioTabla').innerHTML = medio;    
    
    console.log(medio)
  };
  
  function recorreIcons(icon) {
    icon.onclick = setSelectedImage;    
  };

  //console.log(icons);
  

  icons.forEach(recorreIcons); 


  //-------------------GRAFCAS-----------------//
  //OBTENIENDO EL INTERVALO PARA LAS GRAFICAS Y LA TABLA
  let graficas = document.getElementById('linear'); 
  let table = document.getElementById('tablita') ;

  //FUNCION PARA DESPLEGAR LA GRAFICA AL HACER CLICK EN GRAFICAS O TABLA Y LLAMANDO A LA FUNCION doFilter()
  graficas.onclick = function(x) {
    let fromm = document.getElementById('fromm').value;
    let too = document.getElementById('too').value;
    fromYear = fromm;
    toYear = too;
    doFilter();
  };

  table.onclick = function(x) {
    let fromm = document.getElementById('fromm').value;
    let too = document.getElementById('too').value;
    fromYear = fromm;
    toYear = too;
    doFilter();
  };

  //FUNCION PARA OBTENER EL INTERVALO.
  function doFilter() {    
    database.map(item => {
      obj = {
        year : parseInt(item.Year.split('_')[0]),
        num : item[medio]
      };
      if(fromYear <= obj.year && obj.year <= toYear) { 
        array.push(obj);
        };
        return array;
         
    });
     list = array; //ESTO ES UN ARRAY DE OBJETOS
     //console.log(list);      

 //CICLO PARA OBTENER LOS DATOS PARA GRAFICAR
    for(let i = 0; i < list.length; i++) {
      años = (list[i].year).toString();
      heridos = list[i].num;

      dataFinal.push([años, heridos]);  
      //console.log([años, heridos])   
        
    //console.log(dataFinal);   //ES UN ARRAY DE ARRAYS  
  }; //CICLO FOR

/************ DESPLEGAR GRAFICAS Y TABLA******************/
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  let datos = google.visualization.arrayToDataTable([    
    ['AÑO', 'Heridos'],
    ...dataFinal, //(...spread operator)   
  ]); 
  console.log(...dataFinal);
  
 
  let options = {
    title: medio,
    vAxis: {title: 'Heridos'},
    hAxis: {title: 'Años'},
    
    is3D: true,
  };

  let chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(datos, options);

  let chart3d = new google.visualization.PieChart(document.getElementById('piechart_3d'));
  chart3d.draw(datos, options);

} //DRAWCHART

google.charts.load('current', {packages:['table']});
      google.charts.setOnLoadCallback(drawTable);
      function drawTable() {
        let datos= new google.visualization.DataTable();
        datos.addColumn('string', 'Años');
        datos.addColumn('number', 'Heridos');
        datos.addRows([
        ...dataFinal,
 
        ]);
        
        let table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(datos, {showRowNumber: true, width: '20%', height: '100%'});
      };        


return accDatos;

}; //doFilter 

}; //ESTA ES DE const accDatos

