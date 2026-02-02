// ✅ Versión final para Caso Práctico 2 - Steven Tipantuña
// ✅ Incluye: Multilenguaje, Persistencia, TTS Adaptativo y Ayuda

document.addEventListener("DOMContentLoaded", () => {

  /* ================= 🌐 LÓGICA MULTILENGUAJE (Aumentado) ================= */
  const selectorIdioma = document.getElementById("selectorIdioma");

  async function cargarIdioma(lang) {
    try {
      // Guardar en el navegador para que al cambiar de página se mantenga el idioma 
      localStorage.setItem("idiomaPreferido", lang);
      
      const res = await fetch(`json/${lang}.json`);
      const t = await res.json();

      // Traduce menús, títulos, labels y placeholders de toda la ventana
      for (const clave in t) {
        const elemento = document.getElementById(clave);
        if (elemento) {
          // Si es un input o textarea, traduce el placeholder
          if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
            elemento.placeholder = t[clave];
          } else {
            elemento.innerText = t[clave];
          }
        }
      }
    } catch (error) {
      console.error("Error cargando el idioma:", error);
    }
  }

  if (selectorIdioma) {
    selectorIdioma.addEventListener("change", (e) => cargarIdioma(e.target.value));
    
    // Cargar idioma guardado o por defecto español
    const idiomaGuardado = localStorage.getItem("idiomaPreferido") || "es";
    selectorIdioma.value = idiomaGuardado;
    cargarIdioma(idiomaGuardado);
  }


  /* ================= 📅 EVENTOS ================= */
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

  /* ================= 📍 UBICACIONES ================= */
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

  /* ================= 👤 CONTACTOS ================= */
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

  /* ================= ❓ AYUDA (VIDEO) ================= */
  const btnAyuda = document.getElementById("btnAyuda");
  const helpModal = document.getElementById("helpModal");

  if (btnAyuda && helpModal) {
    btnAyuda.addEventListener("click", () => {
      helpModal.style.display = "block";
    });
  }

  /* ================= 🔊 ESCUCHAR (TTS Adaptativo) ================= */
  const btnEscuchar = document.getElementById("btnEscuchar");
  if (btnEscuchar) {
    btnEscuchar.addEventListener("click", () => {
      // Captura el texto dinámicamente según lo que se ve en pantalla
      const texto = document.querySelector("h2").innerText; 
      const utterance = new SpeechSynthesisUtterance(texto);
      
      // Cambia el idioma de la voz según la elección del usuario 
      const langActual = localStorage.getItem("idiomaPreferido") || "es";
      utterance.lang = (langActual === "en") ? "en-US" : "es-ES";
      
      speechSynthesis.speak(utterance);
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