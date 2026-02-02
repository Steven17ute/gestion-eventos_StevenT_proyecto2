// ✅ Versión corregida para Caso Práctico 2 - Steven Tipantuña
// ✅ IDs alineados: Multilenguaje y Sonido funcionando

document.addEventListener("DOMContentLoaded", () => {

    /* ================= 🌐 LÓGICA MULTILENGUAJE ================= */
    const selectorIdioma = document.getElementById("selectorIdioma");

    async function cargarIdioma(lang) {
        try {
            localStorage.setItem("idiomaPreferido", lang);
            const res = await fetch(`json/${lang}.json`);
            const t = await res.json();

            for (const clave in t) {
                const elemento = document.getElementById(clave);
                if (elemento) {
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
        const idiomaGuardado = localStorage.getItem("idiomaPreferido") || "es";
        selectorIdioma.value = idiomaGuardado;
        cargarIdioma(idiomaGuardado);
    }

    /* ================= 📅 FORMULARIOS (Eventos, Ubicaciones, Contactos) ================= */
    const configurarForm = (idForm, idLista) => {
        const form = document.getElementById(idForm);
        const lista = document.getElementById(idLista);
        if (form && lista) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const li = document.createElement("li");
                let resumen = "";
                formData.forEach((value) => { if(value) resumen += `${value} | `; });
                li.textContent = resumen.slice(0, -3);
                lista.appendChild(li);
                form.reset();
                alert("✅ Registrado con éxito");
            });
        }
    };

    configurarForm("formEvento", "listaEventos");
    configurarForm("formUbicacion", "listaUbicaciones");
    configurarForm("formContacto", "listaContactos");

    /* ================= ❓ AYUDA (VIDEO) ================= */
    const btnAyuda = document.getElementById("btnAyuda");
    const helpModal = document.getElementById("helpModal");

    if (btnAyuda && helpModal) {
        btnAyuda.addEventListener("click", () => {
            helpModal.style.display = "block";
        });
    }

    /* ================= 🔊 ESCUCHAR (TTS Corregido) ================= */
    const btnEscuchar = document.getElementById("btnEscuchar");
    if (btnEscuchar) {
        btnEscuchar.addEventListener("click", () => {
            // USAMOS EL ID QUE TIENES EN EL INDEX: "saludoGeneral"
            const elemento = document.getElementById("saludoGeneral");
            
            if (elemento) {
                window.speechSynthesis.cancel(); // Detener si ya estaba hablando
                const texto = elemento.innerText;
                const utterance = new SpeechSynthesisUtterance(texto);
                
                // Cambia el acento según el idioma
                const langActual = localStorage.getItem("idiomaPreferido") || "es";
                utterance.lang = (langActual === "en") ? "en-US" : "es-ES";
                
                window.speechSynthesis.speak(utterance);
            } else {
                console.error("No se encontró el elemento 'saludoGeneral'");
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