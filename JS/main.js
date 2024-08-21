const tasa= 0.04;
let cuota = 0;
let plazo = 0;
let tablaDesarrollo = [];
let monto = parseInt(prompt('Ingrese monto total del crédito a simular'));
console.log(monto);

function calcularCuota(t,m,p){ 
    cuota = Math.ceil((m*t*Math.pow(1+t,p))/(Math.pow(1+t,p)-1),0);
    return cuota;
}
function calcularPlazo(t,m,c){
    plazo = Math.ceil(Math.log(c/(c-m*t))/Math.log(1+t),0); 
    return plazo;
}
function generarTablaDesarrollo(t,m,c,p){
    let interes = 0;
    let principal = 0;
    let saldo = m;
    const td = [];
    let mes = 0;
    for(mes=1; mes<=p; mes++){
        if (mes==p){
            c = saldo*(1+t);
        }
        interes = saldo*t;
        principal = c-interes;
        saldo = saldo-principal;
        const registro = {mes:mes,cuota:Math.ceil(c),principal:Math.ceil(principal),interes:Math.ceil(interes),saldo:Math.ceil(saldo)};
        td.push(registro);
    }
    return td;
}

let opcion = 0;
do {
    opcion = prompt('Ingrese: \n 1 : para calcular cuota \n 2 : para calcular plazo \n 3 : para salir');
    opcion = parseInt(opcion);
    switch (opcion){
        case 1:
            plazo = parseInt(prompt('Ingrese plazo deseado'));
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