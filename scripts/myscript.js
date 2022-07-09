//Realizamos la validacion de las fechas establecidas.
var fecha_año = new Date();
document.getElementById('fecha_año_ini').max = fecha_año.toISOString().split('T')[0];

//Creamos las variables para el tipo de persona y su validacion.
var T_Estudiante = document.getElementById('T_Estudiante');
var T_Profesor = document.getElementById('T_Profesor');
var datos_del_estudiante = document.getElementById('datos_del_estudiante');
var datos_del_profesor = document.getElementById('datos_del_profesor');
var inputT_Persona = null;
var inputDatos_Persona = null;

//Esta son las opciones que se despliegan al escoger estudiante.
T_Estudiante.addEventListener('input', (e) => {
    inputT_Persona = T_Estudiante;
    inputDatos_Persona = document.getElementById('semestre');
    datos_del_estudiante.classList.remove('hidden');
    datos_del_profesor.classList.add('hidden');;
});

//Esta son las opciones que se despliegan al escoger profesor.
T_Profesor.addEventListener('input', (e)=>{
    inputT_Persona = T_Profesor;
    inputDatos_Persona = document.getElementById('tipo_profesor');
    datos_del_estudiante.classList.add('hidden');
    datos_del_profesor.classList.remove('hidden');
});

//Creamos la funcion para validar el nombre del proyecto, esta se hace AlphaNumerico.
function Validacion_De_Nombre(nombre){
    let caracteres_especiales = String(".-,_<>#$%&/@=+*?¡¿?!{}[]\\|\"'`~`×¥¥¥´¶öµ;:ü®åäßð©æ¾");
    for(let i=0;i<caracteres_especiales.length;i++){
    if (nombre.indexOf(caracteres_especiales.charAt(i))!=-1) {
        return true;
    }
  }
  return false;
}

var inputNombre = document.getElementById('nombre');
var spanErrorNombre = document.getElementById('errorNombre');

function ValidacionNombre(){
    if(Validacion_De_Nombre(inputNombre.value)){
        spanErrorNombre.classList.remove('hidden');
        return false;
    } else {
        spanErrorNombre.classList.add('hidden');
        return true;
    }
}

var inputResponsable = document.getElementById('responsable');
var spanErrorResponsable = document.getElementById('errorResponsable');


//Funcion Encargada de realizar la validadcion del nombre del responsable, esta funcion es Alphanumerica tambien.
function Validacion_De_Responsable(){
    if(Validacion_De_Nombre(inputResponsable.value)){
        spanErrorResponsable.classList.remove('hidden');
        return false;
    } else {
        spanErrorResponsable.classList.add('hidden');
        return true;
    }
}

//Validacion de Presupuesto, para que este dentro del rango entre $10M y $50M.
var inputPresupuesto = document.getElementById('presupuesto');
function Validacion_De_Presupuesto(){
    let error = document.getElementById('error_De_Presupuesto');
    let posicion = false;
    if(inputPresupuesto.value<=10000000){
        error.classList.remove('hidden');
        error.innerText = 'El Presupuesto Minimo es de $10.000.000' ;
    } else if(inputPresupuesto.value>=50000000){
        error.classList.remove('hidden');
        error.innerText = 'El Presupuesto Maximo es hasta $50.000.000';
    } else {
        error.classList.add('hidden');
        posicion = true;
    }
    return posicion;
}

//Creamos nuestro vector.
proyectos_Desarrollados = [];
var lugar_Destino = 0;


var inputCodigo = document.getElementById('codigo');
var inputTipo = document.getElementById('tipo');
var inputfecha_añoIni = document.getElementById('fecha_año_ini');
var inputfecha_añoFin = document.getElementById('fecha_año_fin');

//Esta funcion nos permite realizar el conteo pertinente a los dias en los cuales se le lleva trabajando al proyecto.
function Contador_De_Dias(pos){
    let f_inicio = new Date(proyectos_Desarrollados[pos].fecha_inicio_de_año);
    let f_fin = new Date(proyectos_Desarrollados[pos].fecha_añoFin)
    let diferencia_Dias = f_fin.getTime()-f_inicio.getTime();
    console.log(diferencia_Dias);
    return Math.round(diferencia_Dias/(1000*60*60*24))
}


function MostrarProyectos(){
    let escrito = "";
    for (i in proyectos_Desarrollados) {
        escrito += `
            <tr class="odd:bg-white even:bg-slate-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${proyectos_Desarrollados[i].nom}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${proyectos_Desarrollados[i].responsable}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${proyectos_Desarrollados[i].fecha_inicio_de_año}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${proyectos_Desarrollados[i].fecha_añoFin}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    ${Contador_De_Dias(i)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">                                    
                    <input type="button" onclick="Editar(${i})" value="Editar" class="cursor-pointer bg-green-600 text-green-200 text-sm p-1 border border-green-800">
                    <input type="button" onclick="Eliminar(${i})" value="Eliminar" class="cursor-pointer bg-red-600 text-red-200 text-sm p-1 border border-red-800">
                    <input type="button" onclick="Vista_Rapida(${i})" value="Observar" class="cursor-pointer bg-yellow-600 text-yellow-200 text-sm p-1 border border-yellow-800">
                </td>
            </tr>
        `
    }

    document.getElementById('cuerpo').innerHTML = escrito;
}

//Con Esta funcion limpiamos los datos.
function LimpiarDatos(){
        inputCodigo.value = "";
        inputNombre.value = "";
        inputTipo.value = "";
        inputfecha_añoIni.value = "";
        inputfecha_añoFin.value = "";
        inputResponsable.value = "";
        inputPresupuesto.value = "";
        inputT_Persona.value = "";
        inputDatos_Persona.value = "";
}

//Esta es la funcion que permite agregar los datos a nuestro array
function Insertar_Proyecto() {
    persona = {
        cod: '',
        nom: '',
        tipo: '',
        fecha_inicio_de_año: '',
        fecha_añoFin: '',
        responsable: '',
        presupuesto: 0,
        tipo_persona: '',
        dato_persona: ''
    }

    //realizamos las validaciones del Responsable, del nombre del proyecto y del presupuesto.
    if(ValidacionNombre() && Validacion_De_Responsable() && Validacion_De_Presupuesto()){
        persona.cod = inputCodigo.value;
        persona.nom = inputNombre.value;
        persona.tipo = inputTipo.value;
        persona.fecha_inicio_de_año = inputfecha_añoIni.value;
        persona.fecha_añoFin = inputfecha_añoFin.value;
        persona.responsable = inputResponsable.value;
        persona.presupuesto = inputPresupuesto.value;
        persona.tipo_persona = inputT_Persona.value;
        persona.dato_persona = inputDatos_Persona.value;
        proyectos_Desarrollados.push(persona);
        MostrarProyectos();
        LimpiarDatos();
        alert('El Proyecto Se Ha Registrado Exitosamente')
    }
}

var boton_Agregar = document.getElementById("boton_Agregar");
boton_Agregar.addEventListener('click', Insertar_Proyecto);

var boton_Actualizar = document.getElementById("boton_Actualizar");

//Con esta Funcion podemos editar los datos suministrados.
function Editar(pos){
    lugar_Destino = pos;
    inputCodigo.value = proyectos_Desarrollados[pos].cod;
    inputNombre.value = proyectos_Desarrollados[pos].nom;
    inputTipo.value = proyectos_Desarrollados[pos].tipo;
    inputfecha_añoIni.value = proyectos_Desarrollados[pos].fecha_inicio_de_año;
    inputfecha_añoFin.value = proyectos_Desarrollados[pos].fecha_añoFin;
    inputResponsable.value = proyectos_Desarrollados[pos].responsable;
    inputPresupuesto.value = proyectos_Desarrollados[pos].presupuesto;
    inputT_Persona.value = proyectos_Desarrollados[pos].tipo_persona;
    inputDatos_Persona.value = proyectos_Desarrollados[pos].dato_persona;
    boton_Actualizar.classList.remove('hidden');
    boton_Agregar.classList.add('hidden');
}

//Con esta funcion Actualizamos los nuevos datos insertados.
function Actualizar(){
    proyectos_Desarrollados[lugar_Destino].cod = inputCodigo.value;
    proyectos_Desarrollados[lugar_Destino].nom = inputNombre.value;
    proyectos_Desarrollados[lugar_Destino].tipo = inputTipo.value;
    proyectos_Desarrollados[lugar_Destino].fecha_inicio_de_año = inputfecha_añoIni.value;
    proyectos_Desarrollados[lugar_Destino].fecha_añoFin = inputfecha_añoFin.value;
    proyectos_Desarrollados[lugar_Destino].responsable = inputResponsable.value;
    proyectos_Desarrollados[lugar_Destino].presupuesto = inputPresupuesto.value;
    proyectos_Desarrollados[lugar_Destino].tipo_persona = inputT_Persona.value;
    proyectos_Desarrollados[lugar_Destino].dato_persona = inputDatos_Persona.value;
    boton_Actualizar.classList.add('hidden');
    boton_Agregar.classList.remove('hidden');
    MostrarProyectos();
    LimpiarDatos();
}
boton_Actualizar.addEventListener('click', Actualizar);

//Eliminamos los fila seleccionada del array
function Eliminar(pos){
    proyectos_Desarrollados.splice(pos, 1);
    MostrarProyectos();
}

//Esta funcion nos permite observar una vista rapida de todos los datos suministrados.
function Vista_Rapida(pos){
    let escrito = `
        Código: ${proyectos_Desarrollados[pos].cod}
        Nombre: ${proyectos_Desarrollados[pos].nom}
        Tipo: ${proyectos_Desarrollados[pos].tipo}
        fecha_año Inicio: ${proyectos_Desarrollados[pos].fecha_inicio_de_año}
        fecha_año Fin: ${proyectos_Desarrollados[pos].fecha_añoFin}
        Responsable: ${proyectos_Desarrollados[pos].responsable}
        Presupuesto: ${proyectos_Desarrollados[pos].presupuesto}
        Tipo persona: ${proyectos_Desarrollados[pos].tipo_persona}
    `;
    if(proyectos_Desarrollados[pos].tipo_persona=="Estudiante"){
        escrito += '  Semestre: '+ proyectos_Desarrollados[pos].dato_persona;
    } else {
        escrito += '  Tipo Profesor: ' + proyectos_Desarrollados[pos].dato_persona;
    }

    alert(escrito);
}