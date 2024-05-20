document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnEnviar").addEventListener("click", function () {
    const formulario = document.getElementById("loginForm");
    const datosFormulario = new FormData(formulario);
    const datos = {
      name: datosFormulario.get("name"),
      password: datosFormulario.get("password"),
    };

    fetch("/datos-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta
        if (data) {
          localStorage.setItem("id", data._id); // Guardar el ID del usuario
          console.log(data);
          console.log("usuario existe");
          window.location.href = "/productos";
        } else {
          console.log("usuario no existe");
          document.getElementById("msm").hidden = false;
        }
        console.log(data);
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error:", error);
      });
  });
});
