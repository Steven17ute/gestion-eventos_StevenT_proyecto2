// ESTE ARCHIVO CONTROLA LOS FORMULARIOS DE EVENTOS, UBICACIONES Y CONTACTOS
// ✅ Versión corregida para Caso Práctico 2
// ✅ IDs alineados con los formularios HTML

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

      // CREAR ELEMENTO EN LISTA (solo pruebas locales)
      const li = document.createElement("li");
      li.textContent = `${titulo} | Invitados: ${invitados} | Fecha: ${fecha} ${hora} | Zona: ${zona} | Recordatorio: ${recordatorio} | Lugar: ${lugar}`;
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
      li.textContent = `${titulo} | Dirección: ${direccion} | Lat: ${latitud} | Lng: ${longitud}`;
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
      const foto = document.getElementById("foto").value ? "📷 Foto cargada" : "Sin foto";

      const li = document.createElement("li");
      li.textContent = `${saludo} ${nombre} | ID: ${identificacion} | Tel: ${telefono} | Email: ${email} | ${foto}`;
      listaContactos.appendChild(li);

      formContacto.reset();
    });
  }
});