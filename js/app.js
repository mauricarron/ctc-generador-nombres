const $formulario = document.querySelector("#generar-nombre");
$formulario.addEventListener("submit", generarNomrbes);

function generarNomrbes(e) {
  e.preventDefault();
  const $origen = document.querySelector("#origen");
  const origenSeleccionado = $origen.options[$origen.selectedIndex].value;
  const $genero = document.querySelector("#genero");
  const generoSeleccionado = $genero.options[$genero.selectedIndex].value;
  const $cantidad = document.querySelector("#numero");
  const cantidadSeleccionado = $cantidad.value;

  let apiUrl = "";
  apiUrl += "https://randomuser.me/api/?";

  if (origenSeleccionado !== "") {
    apiUrl += `nat=${origenSeleccionado}&`;
  }
  if (generoSeleccionado !== "") {
    apiUrl += `gender=${generoSeleccionado}&`;
  }
  if (cantidadSeleccionado !== "") {
    apiUrl += `results=${cantidadSeleccionado}&`;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);
  xhr.onload = function () {
    if (this.status === 200) {
      const xhrResponse = JSON.parse(this.responseText);
      const listaNombres = xhrResponse.results;

      const $divResultado = document.querySelector("div#resultado");
      let htmlNombres = `<h3>Nombres Generados</h3>`;
      htmlNombres += `<ul class="lista">`;
      listaNombres.forEach((nombre) => {
        htmlNombres += `<li>${nombre.name.first}</li>`;
      });
      htmlNombres += `</ul>`;
      $divResultado.innerHTML = htmlNombres;
    }
  };
  xhr.send();
}
