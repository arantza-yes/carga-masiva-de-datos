let contenido;

function leerArchivo(e) {
  let archivo = e.target.files[0];
  const p = document.getElementById('p');
  p.innerHTML = `
  tu archivo cargado es 
  ${archivo.name}
  `;
  // console.log('mmm', archivo);
  if (!archivo) {
    return;
  }
  let lector = new FileReader();

  // console.log(lector);
  lector.onload = function (e) {
    contenido = e.target.result;
    // console.log('contenido' ,contenido);
    guardarEnSelectores(JSON.parse(contenido));
    guardarEnSelectoresPlan(JSON.parse(contenido));
    guardarEnSelectoresCodigo(JSON.parse(contenido));

    // cargarArchivo(JSON.parse(contenido));
  };
  lector.readAsText(archivo);
}

// function guardarEnSelectores(contenido) {
//   let elemento = document.getElementById('contenido-archivo');
//   elemento.innerHTML = contenido;
// }

function guardarEnSelectores(contenido) {
  const elementoAnio = document.getElementById('anio');

  let set = new Set(); //Set -> es una estructura de datos para guardar valores NO repetidos y con el map iteras y agregas los valores al set y luego con for iteramos el set e imprimos los valores No repetidos

  contenido.map((con) => set.add(con.anio));

  for (let item of set) {
    elementoAnio.innerHTML += `
        <option value="${item}">${item}</option>
        `;
  }

  //     contenido.map(con => elemento.innerHTML += `
  //     <option value="${}">${con.anio}</option>
  // `);
}

function guardarEnSelectoresPlan(contenido) {
  const elementoPlan = document.getElementById('plan');

  let set = new Set();

  contenido.map((con) => set.add(con.plan.consumo));

  for (let item of set) {
    elementoPlan.innerHTML += `
        
        <option  value="${item}">${item}</option>
        `;
  }
}

function guardarEnSelectoresCodigo(contenido) {
  const elementoCodigo = document.getElementById('codigo');

  let set = new Set();

  contenido.map((con) => set.add(con.codigo));

  for (let item of set) {
    elementoCodigo.innerHTML += `
        
        <option  value="${item}">${item}</option>
        `;
  }
}

const cargar = document.getElementById('cargar');

cargar.addEventListener('click', cargarArchivo);

function cargarArchivo() {
  let selectAnio = document.getElementById('anio');
  let valueAnio = selectAnio.options[selectAnio.selectedIndex].value;

  let selectPlan = document.getElementById('plan');
  let valuePlan = selectPlan.options[selectPlan.selectedIndex].value;

  let selectCodigo = document.getElementById('codigo');
  let valueCodigo = selectCodigo.options[selectCodigo.selectedIndex].value;
  // console.log(valueAnio);

  let contenidoMostrar = [];

  contenido = JSON.parse(contenido);

  contenido.map((con) => {
    if (
      con.anio == valueAnio ||
      con.plan.consumo == valuePlan ||
      con.codigo == valueCodigo
    ) {
      contenidoMostrar.push(con);
    }
    // console.log('connn', con);
  });
  //  console.log(contenidoMostrar);
  mostrarContenido(contenidoMostrar);
}

function mostrarContenido(contenidoMostrar) {
  const tabla = document.getElementById('mostrarTabla');
  tabla.style.display = 'block';

  contenidoMostrar.forEach((element) => {
    tabla.innerHTML += `
        <tr>
          <td>${element.anio}</td>
          <td>${element.plan.consumo}</td>
          <td>${element.plan.historial}</td>
          <td>${element.codigo}</td>
        </tr>
      `;
  });
}

document
  .getElementById('file-input')
  .addEventListener('change', leerArchivo, false);
