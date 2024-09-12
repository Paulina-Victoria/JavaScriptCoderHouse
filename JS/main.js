/*
const tasa= 0.04;
let cuota = 0;
let plazo = 0;
let tablaDesarrollo = [];
let monto = parseInt(prompt('Ingrese monto total del crédito a simular'));
console.log(monto);
while (monto<=0) {
    monto = parseInt(prompt('El monto ingresado a simular debe ser mayor que cero'));
    console.log(monto);
}

function calcularCuota(tasa,monto,plazo){ 
    cuota = Math.ceil((monto*tasa*Math.pow(1+tasa,plazo))/(Math.pow(1+tasa,plazo)-1),0);
    return cuota;
}
function calcularPlazo(tasa,monto,cuota){
    plazo = Math.ceil(Math.log(cuota/(cuota-monto*tasa))/Math.log(1+tasa),0); 
    return plazo;
}
function generarTablaDesarrollo(tasa,monto,cuota,plazo){
    let interes = 0;
    let principal = 0;
    let saldo = monto;
    const tablaDesarrollo = [];
    let mes = 0;
    for(mes=1; mes<=plazo; mes++){
        if (mes==plazo){
            cuota = saldo*(1+tasa);
        }
        interes = saldo*tasa;
        principal = cuota-interes;
        saldo = saldo-principal;
        const registro = {mes:mes,cuota:Math.ceil(cuota),principal:Math.ceil(principal),interes:Math.ceil(interes),saldo:Math.ceil(saldo)};
        tablaDesarrollo.push(registro);
    }
    return tablaDesarrollo;
}

let opcion = 0;
do {
    opcion = prompt('Ingrese: \n 1 : para calcular cuota \n 2 : para calcular plazo \n 3 : para salir');
    opcion = parseInt(opcion);
    switch (opcion){
        case 1:
            plazo = parseInt(prompt('Ingrese plazo deseado en meses'));
            while (plazo<=0) {
                plazo = parseInt(prompt('El plazo ingresado debe ser mayor que cero'));
                console.log(monto);
            }
            cuota = calcularCuota(tasa,monto,plazo);
            tablaDesarrollo = generarTablaDesarrollo(tasa,monto,cuota,plazo);
            console.log('La cuota es: '+ cuota);
            console.log('El detalle del credito es: ');
            for (mes of tablaDesarrollo){
                console.log(mes);
            };
        break;
        case 2:
            cuota = parseInt(prompt('Ingrese cuota deseada'));
            while (cuota<=0 || cuota>monto) {
                cuota = parseInt(prompt('La cuota ingresada debe ser mayor que cero y menor que el monto total solicitado'));
                console.log(monto);
            }
            plazo = calcularPlazo(tasa,monto,cuota);
            tablaDesarrollo = generarTablaDesarrollo(tasa,monto,cuota,plazo);
            console.log('El plazo es: '+ plazo);
            console.log('El detalle del credito es: ');
            for (mes of tablaDesarrollo){
                console.log(mes);
            };
        break;
    }
} while(opcion != 3);
 */

const tasaConsumo= 0.02;
const tasaHipotecario= 0.04/12;

class productoCredito{
    constructor(tipo,monto,tasa,plazo,cuota){
        this.tipo=tipo;
        this.monto=monto;
        this.tasa=tasa;
        this.plazo=plazo;
        this.cuota=cuota;
    }
}

function calcularCuota(tasa,monto,plazo){ 
    cuota = Math.ceil((monto*tasa*Math.pow(1+tasa,plazo))/(Math.pow(1+tasa,plazo)-1),0);
    return cuota;
}

function calcularPlazo(tasa,monto,cuota){
    plazo = Math.ceil(Math.log(cuota/(cuota-monto*tasa))/Math.log(1+tasa),0); 
    return plazo;
}

function actualizarSeleccionado(valor,elemento){
    document.getElementById(elemento).textContent = "monto seleccionado: "+valor;
}

function getCheckboxValue() {
    const productosSimulados = [];
    let contador = 0;
    if (document.getElementById("lineaCreditoCheck").checked) {
        document.getElementById("lineaSimulador").style.display = "block";
        const producto = new productoCredito("linea",0,0,0,0);
        productosSimulados.push(producto);
        contador++;
    }
    else {
        if (document.getElementById("lineaSimulador").style.display == "block"){
                document.getElementById("lineaSimulador").style.display = "none";
        }
    }
    
    if (document.getElementById("tarjetaCreditoCheck").checked) {
        document.getElementById("tarjetaSimulador").style.display = "block";
        const producto = new productoCredito("tarjeta",0,0,0,0);
        productosSimulados.push(producto);
        contador++;
    }
    else {
        if(document.getElementById("tarjetaSimulador").style.display == "block"){
            document.getElementById("tarjetaSimulador").style.display = "none";
        }
    }

    if (document.getElementById("creditoConsumoCheck").checked) {
        document.getElementById("consumoSimulador").style.display = "block";
        const producto = new productoCredito("consumo",0,tasaConsumo,0,0);
        productosSimulados.push(producto);
        contador++;
    }
    else {
        if(document.getElementById("consumoSimulador").style.display == "block"){
            document.getElementById("consumoSimulador").style.display = "none";
        }
    }

    if (document.getElementById("creditoHipotecarioCheck").checked) {
        document.getElementById("hipotecarioSimulador").style.display = "block";
        const producto = new productoCredito("hipotecario",0,tasaHipotecario,0,0);
        productosSimulados.push(producto);
        contador++;
    }
    else {
        if (document.getElementById("hipotecarioSimulador").style.display == "block"){
            document.getElementById("hipotecarioSimulador").style.display = "none";
        }
    }

    if (contador>=1 && localStorage.getItem('misProductos')!=null){
        document.getElementById("divBotonSimular").style.display = "block"; 
    }
    localStorage.setItem('misProductos', JSON.stringify(productosSimulados))
}

function actualizarProductos(){
    const misProductos = JSON.parse(localStorage.getItem('misProductos'))
    misProductos.forEach(producto => {
        switch (producto.tipo){ 
            case "linea":
                producto.monto = parseInt(document.getElementById("montoLinea").value);
            break;
            case "tarjeta":
                producto.monto = parseInt(document.getElementById("montoTarjeta").value);
            break;
            case "consumo":
                producto.monto = parseInt(document.getElementById("montoConsumo").value);
                producto.cuota = (document.getElementById("cuotaConsumo").value);
                producto.plazo = calcularPlazo(producto.tasa,producto.monto,producto.cuota);
            break;
            case "hipotecario":
                producto.monto = (document.getElementById("valorPropiedad").value-document.getElementById("valorPie").value);
                producto.plazo = (document.getElementById("plazoHipotecario").value);
                producto.cuota = calcularCuota(producto.tasa,producto.monto,producto.plazo); 
            break;
        };
    });
    const total = misProductos.reduce((acumulador, producto) => acumulador + producto.monto, 0);
    if(total>0) {
        document.getElementById("totalProductos").style.display = "block";
        document.getElementById("total").textContent = total;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let botonCarrito = document.getElementById("agregarProductos");
    botonCarrito.addEventListener("click", getCheckboxValue);
    let botonSimular = document.getElementById("simularProductos");
    botonSimular.addEventListener("click", actualizarProductos);
});