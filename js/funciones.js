
// formularios intactos + Multilenguaje + Voz Adaptativa

document.addEventListener("DOMContentLoaded", () => {

  /* ================= 🌐 LÓGICA MULTILENGUAJE (Añadido) ================= */
  const selectorIdioma = document.getElementById("selectorIdioma");

  async function cargarIdioma(lang) {
    try {
      localStorage.setItem("idiomaPreferido", lang);
      const res = await fetch(`json/${lang}.json`);
      const t = await res.json();

      for (const clave in t) {
        const elemento = document.getElementById(clave);
        if (elemento) {
          // Si es un input o textarea, cambia el placeholder (para que tus fotos se vean en inglés)
          if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
            elemento.placeholder = t[clave];

            elemento.setAttribute("aria-label", t[clave]);

          } else {
            elemento.innerText = t[clave];
          }
        }
      }
    } catch (error) {
      console.error("Error cargando idioma:", error);
    }
  }

  if (selectorIdioma) {
    selectorIdioma.addEventListener("change", (e) => cargarIdioma(e.target.value));
    const idiomaGuardado = localStorage.getItem("idiomaPreferido") || "es";
    selectorIdioma.value = idiomaGuardado;
    cargarIdioma(idiomaGuardado);
  }

  /* ================= EVENTOS (Tu código original) ================= */
  const formEvento = document.getElementById("formEvento");
  const listaEventos = document.getElementById("listaEventos");

  if (formEvento) {
    formEvento.addEventListener("submit", (e) => {
      e.preventDefault();
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

      const li = document.createElement("li");
      li.textContent = `${titulo} | Invitados: ${invitados} | Fecha: ${fecha} ${hora} | Zona: ${zona} | Recordatorio: ${recordatorio} | Lugar: ${lugar}`;
      listaEventos.appendChild(li);
      formEvento.reset();
    });
  }

  /* ================= UBICACIONES (Tu código original) ================= */
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

  /* ================= CONTACTOS (Tu código original) ================= */
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

  /* ================= AYUDA (VIDEO) ================= */
  const btnAyuda = document.getElementById("btnAyuda");
  const helpModal = document.getElementById("helpModal");

  if (btnAyuda && helpModal) {
    btnAyuda.addEventListener("click", () => {
      helpModal.style.display = "block";
    });
  }

  /* ================= ESCUCHAR (TTS Adaptativo) ================= */
  const btnEscuchar = document.getElementById("btnEscuchar");
  if (btnEscuchar) {
    btnEscuchar.addEventListener("click", () => {
      // Intenta leer el saludoTexto, si no existe, lee el título de la página
      const elemento = document.getElementById("saludoTexto") || document.querySelector("h2");
      
      if (elemento) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(elemento.innerText);
        
        // Detecta el idioma para usar el acento correcto
        const langActual = localStorage.getItem("idiomaPreferido") || "es";
        utterance.lang = (langActual === "en") ? "en-US" : "es-ES";
        
        speechSynthesis.speak(utterance);
      }
    });
  }
});

/* ================= FUNCIÓN CERRAR AYUDA ================= */
function cerrarAyuda() {
  const helpModal = document.getElementById("helpModal");
  if (helpModal) {
    helpModal.style.display = "none";
  }
}