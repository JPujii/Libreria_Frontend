// URL de tu backend PHP (en desarrollo local será http://localhost/backend/index.php)
const API_URL = 'https://libreria-backend-b74i.onrender.com';

document.getElementById('demo-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById('nombre').value;
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.textContent = "Procesando respuesta en servidor PHP...";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombreInput })
        });

        if (!response.ok) throw new Error('Error en la respuesta del servidor');

        const data = await response.json();

        // Mostrar respuesta de PHP en la web
        resultadoDiv.innerHTML = `<p><strong>Respuesta de PHP:</strong> ${data.mensaje}</p>`;
    } catch (error) {
        resultadoDiv.textContent = 'Hubo un error al conectar con el servidor PHP.';
        console.error(error);
    }
});