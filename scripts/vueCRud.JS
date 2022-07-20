new Vue({
    el: "main",
    data: {
        proyectos: [],
        proyecto: {
            codigo: "",
            nombre: "",
            tipo: "",
            fechaIni: null,
            fechaFin: null,
            responsable: "",
            presupuesto: null,
            tipo_persona: null,
            dato_persona: ""
        },
        pos: 0,
        registro: true,
        simCodigo: false,
        simNombre: false,
        simResponsable: false,
        tituloP: "",
    },
    methods: {
        guardarProyecto(){
            let pro = JSON.parse(JSON.stringify(this.proyecto));
            if(this.proyecto.codigo!=""&&this.proyecto.nombre!=""&&this.proyecto.tipo!=""&&this.proyecto.fechaIni!=null&&this.proyecto.fechaFin!=null&&this.proyecto.responsable!=""&&this.proyecto.tipo_persona!=null&&this.proyecto.dato_persona!=""){
                if((!this.simCodigo&&!this.simNombre&&!this.simResponsable)&&(this.proyecto.presupuesto>=10000000&&this.proyecto.presupuesto<=50000000)){
                    if(this.registro){
                        this.proyectos.push(pro);
                        alert("Proyecto guardado.")
                    } else {
                        this.proyectos[this.pos] = pro;
                        this.registro = true;
                        alert("proyecto actualizado.")
                    }
                    this.limpiarCampos();
                } else {
                    alert("Verificar los datos de los campos.")
                }
            } else {
                alert("Aún hay campos sin llenar")
            }
        },
        Editar(pos){
            this.registro = false;
            this.pos = pos;
            this.proyecto.codigo = this.proyectos[pos].codigo;
            this.proyecto.nombre = this.proyectos[pos].nombre;
            this.proyecto.tipo = this.proyectos[pos].tipo;
            this.proyecto.fechaIni = this.proyectos[pos].fechaIni;        
            this.proyecto.fechaFin = this.proyectos[pos].fechaFin;
            this.proyecto.responsable = this.proyectos[pos].responsable;
            this.proyecto.presupuesto = this.proyectos[pos].presupuesto;
            this.proyecto.tipo_persona = this.proyectos[pos].tipo_persona;
            this.proyecto.dato_persona = this.proyectos[pos].dato_persona;
        },
        limpiarCampos(){
            this.proyecto.codigo = null;
            this.proyecto.nombre = null;
            this.proyecto.tipo = null;
            this.proyecto.fechaIni = null;        
            this.proyecto.fechaFin = null;
            this.proyecto.responsable = null;
            this.proyecto.presupuesto = null;
            this.proyecto.tipo_persona = null;
            this.proyecto.dato_persona = null;
        },
        Eliminar(pos){
            this.proyectos.splice(pos, 1)
        },
        Mostrar(pos){
            this.tituloP = this.proyectos[pos].nombre;
            let infoTexto = `
            <td class="block">Código: ${this.proyectos[pos].codigo}</td><br>
            <td class="block">Nombre: ${this.proyectos[pos].nombre}</td><br>
            <td class="block">Tipo proyecto: ${this.proyectos[pos].tipo}</td><br>
            <td class="block">Fecha de inicio: ${this.proyectos[pos].fechaIni}</td><br>
            <td class="block">Fecha Final: ${this.proyectos[pos].fechaFin}</td><br>
            <td class="block">Responsable: ${this.proyectos[pos].responsable}</td><br>
            <td class="block">Presupuesto: ${this.proyectos[pos].presupuesto}</td><br>
            <td class="block">Tipo persona: ${this.proyectos[pos].tipo_persona}</td><br>
            <td class="block">Infomación persona: ${this.proyectos[pos].dato_persona}</td>`;
            document.getElementById("infoP").innerHTML = infoTexto;
            document.getElementById("defaultModal").classList.remove("hidden");
        },
        contadorDias(pos){
            let f_inicio = new Date(this.proyectos[pos].fechaIni);
            let f_fin = new Date(this.proyectos[pos].fechaFin)
            let diferencia_Dias = f_fin.getTime()-f_inicio.getTime();
            return Math.round(diferencia_Dias/(1000*60*60*24))
        },
        tieneSimbolo(cadena){
            let cad = String(cadena);
            let caracteres_especiales = String(".-,_<>#$%&/@=+*?¡¿?!{}[]\\|\"'`~`×¥¥¥´¶öµ;:ü®åäßð©æ¾");
            for(let i=0;i<caracteres_especiales.length;i++){
                 if (cad.indexOf(caracteres_especiales.charAt(i))!=-1) {
                    return true;
                } 
            } return false;
        },
        comprobarCadenas(cod, nom, res){
            if(this.tieneSimbolo(cod)) this.simCodigo = true;
            else this.simCodigo = false;
            if(this.tieneSimbolo(nom)) this.simNombre = true;
            else this.simNombre = false;
            if(this.tieneSimbolo(res)) this.simResponsable = true;
            else this.simResponsable = false;
        }
        
    },
})

var fecha_año = new Date();
document.getElementById('fecha_año_ini').max = fecha_año.toISOString().split('T')[0];