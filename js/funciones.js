// ✅ Control de formularios con soporte multilenguaje
// ✅ Usa traducciones desde es.json / en.json

// Variable global que se actualiza al cambiar idioma
let traducciones = {};

document.addEventListener("DOMContentLoaded", () => {

  /* ================= EVENTOS ================= */
  const formEvento = document.getElementById("formEvento");
  const listaEventos = document.getElementById("listaEventos");

  if (formEvento) {
    formEvento.addEventListener("submit", (e) => {
      e.preventDefault();

      // CAPTURAR DATOS
      const titulo = document.getElementById("tituloEvento").value;
      const invitados = document.getElementById("invitados").value;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const zona = document.getElementById("zona").value;
      const descripcion = document.getElementById("descripcion").value;
      const repeticion = document.getElementById("repeticion").value;
      const recordatorio = document.getElementById("recordatorio").checked ? "Sí" : "No";
      const clasificacion = document.getElementById("clasificacion").value;
      const lugar = document.getElementById("lugar").value;

      // CREAR ELEMENTO EN LISTA
      const li = document.createElement("li");
      li.textContent = `${titulo} | ${traducciones.labelInvitados}: ${invitados} | ${traducciones.labelFecha}: ${fecha} ${hora} | ${traducciones.labelZona}: ${zona} | ${traducciones.labelRecordatorio}: ${recordatorio} | ${traducciones.labelLugar}: ${lugar}`;
      listaEventos.appendChild(li);

      formEvento.reset();
    });
  }

  /* ================= UBICACIONES ================= */
  const formUbicacion = document.getElementById("formUbicacion");
  const listaUbicaciones = document.getElementById("listaUbicaciones");

  if (formUbicacion) {
    formUbicacion.addEventListener("submit", (e) => {
      e.preventDefault();

      const titulo = document.getElementById("tituloUbicacion").value;
      const direccion = document.getElementById("direccion").value;
      const latitud = document.getElementById("latitud").value;
      const longitud = document.getElementById("longitud").value;

      const li = document.createElement("li");
      li.textContent = `${titulo} | ${traducciones.labelDireccion}: ${direccion} | ${traducciones.labelLat}: ${latitud} | ${traducciones.labelLng}: ${longitud}`;
      listaUbicaciones.appendChild(li);

      formUbicacion.reset();
    });
  }

  /* ================= CONTACTOS ================= */
  const formContacto = document.getElementById("formContacto");
  const listaContactos = document.getElementById("listaContactos");

  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();

      const saludo = document.getElementById("saludo").value;
      const nombre = document.getElementById("nombre").value;
      const identificacion = document.getElementById("identificacion").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      const foto = document.getElementById("foto").value ? traducciones.fotoCargada : traducciones.sinFoto;

      const li = document.createElement("li");
      li.textContent = `${saludo} ${nombre} | ${traducciones.labelID}: ${identificacion} | ${traducciones.labelTel}: ${telefono} | ${traducciones.labelEmail}: ${email} | ${foto}`;
      listaContactos.appendChild(li);

      formContacto.reset();
    });
  }
});

/* ================= MULTILENGUAJE ================= */
async function cargarIdioma(lang) {
  try {
    const res = await fetch(`json/${lang}.json`);
    traducciones = await res.json(); // Guardar traducciones globales

    // Actualizar textos visibles en la interfaz
    for (const clave in traducciones) {
      const elemento = document.getElementById(clave);
      if (elemento) {
        if (elemento.tagName === "TITLE") {
          elemento.textContent = traducciones[clave];
        } else {
          elemento.innerText = traducciones[clave];
        }
      }
    }

    // Mantener emojis en los títulos del resumen
    if (document.getElementById("resumenEventos")) {
      document.getElementById("resumenEventos").innerText = "📅 " + traducciones.resumenEventos;
    }
    if (document.getElementById("resumenUbicaciones")) {
      document.getElementById("resumenUbicaciones").innerText = "📍 " + traducciones.resumenUbicaciones;
    }
    if (document.getElementById("resumenContactos")) {
      document.getElementById("resumenContactos").innerText = "👤 " + traducciones.resumenContactos;
    }

  } catch (error) {
    console.error("Error al cargar idioma:", error);
  }
}

// Inicializar idioma por defecto
document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("selectorIdioma");
  selector.addEventListener("change", e => {
    cargarIdioma(e.target.value);
  });
  cargarIdioma("es"); // idioma inicial
});