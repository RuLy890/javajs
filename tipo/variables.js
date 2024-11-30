document.getElementById("encuestaForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let isValid = true;
    let errorMessage = "";

    // Respuestas correctas
    const respuestasCorrectas = {
        q1: "a", // Hyper Text Markup Language
        q2: "b", // <a>
        q3: "b", // <hr>
        q4: "c", // <ol>
        q5: "a", // <br>
        q6: "b", // HTML5
        q7: "b", // background-color
        q8: "c"  // Cascading Style Sheets
    };

    let aciertos = 0;

    // Validar campos de texto
    const camposTexto = ["nombre", "email", "clave", "pregunta1", "pregunta2"];
    const respuestasTexto = {};
    camposTexto.forEach(id => {
        const campo = document.getElementById(id);
        if (campo.value.trim() === "") {
            isValid = false;
            errorMessage = "Por favor, completa todos los campos de texto.";
            campo.style.borderColor = "#e74c3c"; 
        } else {
            campo.style.borderColor = "#2ecc71"; 
            respuestasTexto[id] = campo.value.trim(); // Capturar la respuesta
        }
    });

    // Validar y evaluar preguntas de selección múltiple
    Object.keys(respuestasCorrectas).forEach(key => {
        const opciones = document.getElementsByName(key);
        const seleccionada = Array.from(opciones).find(opcion => opcion.checked);

        if (!seleccionada) {
            isValid = false;
            errorMessage = "Por favor, responde todas las preguntas de selección múltiple.";
            opciones.forEach(opcion => opcion.closest("label").style.color = "#e74c3c");
        } else {
            opciones.forEach(opcion => opcion.closest("label").style.color = "#333");

            // Comparar con la respuesta correcta
            if (seleccionada.value === respuestasCorrectas[key]) {
                aciertos++;
            }
        }
    });

    if (isValid) {
        // Mostrar datos ingresados y resultados
        let resultados = `Datos de Registro:\n`;
        resultados += `Nombre: ${respuestasTexto.nombre}\n`;
        resultados += `Email: ${respuestasTexto.email}\n\n`;
        resultados += `Tus respuestas:\n`;
        resultados += `1. ${respuestasTexto.pregunta1}\n`;
        resultados += `2. ${respuestasTexto.pregunta2}\n\n`;
        resultados += `Has obtenido ${aciertos} aciertos de ${Object.keys(respuestasCorrectas).length}.\n`;

        alert(resultados);
    } else {
        alert(errorMessage); 
    }
});
