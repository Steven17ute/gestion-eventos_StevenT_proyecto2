// ✅ Versión final y unificada - Caso Práctico 2
// ✅ Autor: Steven Tipantuña
// ✅ Funcionalidad: Multilenguaje, Persistencia, TTS Adaptativo, Formularios y Ayuda

document.addEventListener("DOMContentLoaded", () => {

    /* ================= 🌐 LÓGICA MULTILENGUAJE ================= */
    const selectorIdioma = document.getElementById("selectorIdioma");

    async function cargarIdioma(lang) {
        try {
            // Guardar preferencia para persistencia entre páginas
            localStorage.setItem("idiomaPreferido", lang);
            
            const res = await fetch(`json/${lang}.json`);
            const t = await res.json();

            // Recorre el JSON y traduce según el ID del elemento
            for (const clave in t) {
                const elemento = document.getElementById(clave);
                if (elemento) {
                    // Diferencia entre campos de entrada (placeholder) y texto normal (innerText)
                    if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
                        elemento.placeholder = t[clave];
                    } else {
                        elemento.innerText = t[clave];
                    }
                }
            }
        } catch (error) {
            console.error("Error cargando el archivo de idioma:", error);
        }
    }

    if (selectorIdioma) {
        selectorIdioma.addEventListener("change", (e) => cargarIdioma(e.target.value));
        
        // Carga inicial: Idioma guardado o Español por defecto
        const idiomaGuardado = localStorage.getItem("idiomaPreferido") || "es";
        selectorIdioma.value = idiomaGuardado;
        cargarIdioma(idiomaGuardado);
    }

    /* ================= 🔊 ESCUCHAR (TTS Adaptativo Corregido) ================= */
    const btnEscuchar = document.getElementById("btnEscuchar");
    if (btnEscuchar) {
        btnEscuchar.addEventListener("click", () => {
            // Buscamos el saludo (puede tener ID saludoTexto o saludoGeneral)
            const saludo = document.getElementById("saludoTexto") || document.getElementById("saludoGeneral");
            const titulo = document.querySelector("h2");
            
            // Prioridad de lectura: Saludo > Título
            let textoParaLeer = "";
            if (saludo) {
                textoParaLeer = saludo.innerText;
            } else if (titulo) {
                textoParaLeer = titulo.innerText;
            }

            if (textoParaLeer !== "") {
                window.speechSynthesis.cancel(); // Detener cualquier audio previo
                const utterance = new SpeechSynthesisUtterance(textoParaLeer);
                
                // Ajustar el acento según el idioma seleccionado
                const langActual = localStorage.getItem("idiomaPreferido") || "es";
                utterance.lang = (langActual === "en") ? "en-US" : "es-ES";
                
                window.speechSynthesis.speak(utterance);
            }
        });
    }

    /* ================= 📅 GESTIÓN DE FORMULARIOS (Eventos, Ubicaciones, Contactos) ================= */
    
    // Función genérica para añadir a la lista visual (Simulación de guardado)
    const configurarFormulario = (idForm, idLista) => {
        const form = document.getElementById(idForm);
        const lista = document.getElementById(idLista);

        if (form && lista) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const li = document.createElement("li");
                
                // Construir resumen de los datos ingresados
                let resumen = "";
                formData.forEach((value, key) => {
                    if (value) resumen += `${value} | `;
                });

                li.textContent = resumen.slice(0, -3); // Quitar el último separador
                lista.appendChild(li);
                form.reset();
                alert("✅ Registrado con éxito");
            });
        }
    };

    configurarFormulario("formEvento", "listaEventos");
    configurarFormulario("formUbicacion", "listaUbicaciones");
    configurarFormulario("formContacto", "listaContactos");

    /* ================= ❓ SISTEMA DE AYUDA (Video Modal) ================= */
    const btnAyuda = document.getElementById("btnAyuda");
    const helpModal = document.getElementById("helpModal");

    if (btnAyuda && helpModal) {
        btnAyuda.addEventListener("click", () => {
            helpModal.style.display = "block";
        });
    }
});

/* ================= ❌ CERRAR AYUDA (Fuera del DOMContentLoaded) ================= */
function cerrarAyuda() {
    const helpModal = document.getElementById("helpModal");
    if (helpModal) {
        helpModal.style.display = "none";
    }
}