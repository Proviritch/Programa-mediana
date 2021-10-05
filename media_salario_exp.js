let colombia = [];
let a = 0;
let aux, aux2, casilla1, casilla2, promedio, c = 1, copia;
let longitud = colombia.length;
let top10_calculo = (longitud*0.9);
let input_nombre = document.getElementById("nombre");
let input_salario = document.getElementById("salario");
let input_borrar = document.getElementById("borrar");
const article = document.getElementById("contenedor");
const boton_agregar = document.getElementsByTagName("button")[0];
const boton_mediana = document.getElementsByTagName("button")[1];
const boton_mediana_top10 = document.getElementsByTagName("button")[2];
const boton_borrar_tarjeta = document.getElementsByTagName("button")[3];
let h2 = document.getElementsByTagName("h2")[1];
const contenedor = document.getElementById("contenedor");

const borrar_tarjeta = (x) => {
    /* console.log(c); */
    --c;
    --a;
    /* console.log(c); */
    let div = document.getElementsByTagName("div");
    div[x].remove();
}

const crear_divs = () => {
    let div = document.createElement("div");
    div.classList.add(`div${c}`);
    c++;
    let h3 = document.createElement("h3");
    h3.textContent = "Salario de ";
    let span = document.createElement("span");
    span.textContent = input_nombre.value;
    let p = document.createElement("p");
    p.textContent = input_salario.value;
    h3.append(span);
    div.append(h3);
    div.append(p)
    div.classList.add("tarjeta");
    contenedor.append(div);
}

const ordenar_divs = (arreglo) => {
    let div = document.getElementsByTagName("div");
    let p = document.getElementsByTagName("p");
    console.log(p);
    /* console.log(arreglo); */
    for (let i = 0; i < arreglo.length; i++) { 
        for (let j = 1; j < arreglo.length; j++) {
            if(arreglo.length > 1 && Number(p[j-1].textContent) > Number(p[j].textContent)) {
                aux2 = div[j-1];
                copia = div[j].cloneNode(true);
                div[j-1].replaceWith(div[j]);
                contenedor.insertBefore(copia,div[j]);
                div[j].replaceWith(aux2);
            }
        }
    } 
};

const ordenar_arreglo = (arreglo) => {
    for (let i = 0; i < arreglo.length; i++) {
        for (let m = 1; m < arreglo.length; m++) {
            if (arreglo[m - 1].salary > arreglo[m].salary) {
                aux = arreglo[m - 1];
                arreglo[m - 1] = arreglo[m];
                arreglo[m] = aux;
            }
        }
    }
    return arreglo;
};

const opacar_90por = (top_10_calculo) => {
    let div = document.getElementsByTagName("div");        
    for (let z = 0; z < top_10_calculo; z++) {
        div[z].classList.add("opacidad");
    }
};

const calcular_la_mediana = (arreglo) => {
    let div = document.getElementsByTagName("div");
    if (arreglo === colombia) {
        longitud = colombia.length;  
    } else {
        longitud = top10_colombia.length;
    }
    if (longitud%2===0) { 
        if (arreglo.length === 2) {
            casilla1 = arreglo[0].salary;
            casilla2 = arreglo[1].salary;
            promedio = (casilla1 + casilla2)/2;
            if (arreglo===colombia) {
                div[0].classList.add("media");
                div[1].classList.add("media");
            }
            return promedio;
        } else {
            casilla1 = arreglo[(longitud/2)].salary;
            casilla2 = arreglo[(longitud/2)-1].salary;
            div[longitud/2].classList.add("media");
            div[(longitud/2)-1].classList.add("media");
            promedio = (casilla1 + casilla2)/2;
            return promedio;
        }
    } else {
        if (longitud === 1) {
            if (arreglo===colombia) { 
                div[0].classList.add("media");
            }
            return arreglo[0].salary;
        } else {
            if (arreglo===colombia) {
                div[Math.trunc(longitud/2)].classList.add("media");
            }
            return arreglo[Math.trunc(longitud/2)].salary;
        }  
    }
    
};

boton_agregar.addEventListener("click", () => {
    colombia[a] = {
        name: input_nombre.value,
        salary: Number(input_salario.value)
    };
    longitud = colombia.length;  
    crear_divs();
    a++;
    boton_mediana.classList.add("display");
    boton_mediana_top10.classList.add("display");
    console.log("Al agregar",colombia);
});

const agregar_brillo_tarjetas = (arreglo) => {
    let div = document.getElementsByTagName("div"); 
    for (let u = 0; u < arreglo.length; u++) {
        div[u].classList.remove("opacidad");   
    } 
};

const eliminar_clase_media = (arreglo) => {
    let div = document.getElementsByTagName("div");  
    for (let u = 0; u < arreglo.length; u++) {
        div[u].classList.remove("media");     
    } 
};

const agregar_rojo_top10 = (top_10_calculo,longitud) => {
    let div = document.getElementsByTagName("div");
    let diez_porciento = (longitud - top_10_calculo);
    console.log(diez_porciento);
    if (diez_porciento%2===0) {
        div[longitud-(diez_porciento/2)].classList.add("media");
        div[longitud-(diez_porciento/2)-1].classList.add("media");
    } else {
        div[Math.trunc(longitud-(diez_porciento/2))].classList.add("media");
    }
}

boton_mediana.addEventListener("click", () => {
    ordenar_divs(colombia);
    agregar_brillo_tarjetas(colombia);
    eliminar_clase_media(colombia);
    h2.classList.add("fixed");
    h2.textContent = `$${calcular_la_mediana(ordenar_arreglo(colombia))}`;
});

boton_mediana_top10.addEventListener("click", () => {
    longitud = colombia.length; 
    ordenar_arreglo(colombia);
    ordenar_divs(colombia);
    eliminar_clase_media(colombia);
    h2.classList.add("fixed");
    top10_calculo = Math.trunc(longitud*0.9)
    opacar_90por(top10_calculo);
    top10_colombia = colombia.slice(top10_calculo); 
    agregar_rojo_top10(top10_calculo,longitud);
    h2.textContent = `$${calcular_la_mediana(top10_colombia)}`;
});

boton_borrar_tarjeta.addEventListener("click", () => {
    if (contenedor.children.length > Number(input_borrar.value)-1 && Number(input_borrar.value)-1 >= 0) {
        console.log("divs:",contenedor.children.length);
        console.log("número de tarjeta:",Number(input_borrar.value)-1);
        colombia.splice(Number(input_borrar.value)-1,1);
        borrar_tarjeta(Number(input_borrar.value)-1);
    } else {
        /* console.log("ERROR"); */
        /* input_borrar.value = "Error"; */
        h2.classList.add("fixed");
        h2.textContent = `ERROR`;
    }
    
/*     for (let i = Number(input_borrar.value)-1; i < colombia.length; i++) {
        colombia[i] = colombia[i+1];
    }
    colombia.pop(); */
    console.log("Al eliminar",colombia);
    
    if (contenedor.children.length === 0) {
        boton_mediana.classList.remove("display");
        boton_mediana_top10.classList.remove("display");
    }
}); 