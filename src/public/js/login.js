document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btnEnviar").addEventListener("click", function () {
    const formulario = document.getElementById("loginForm");
    const datosFormulario = new FormData(formulario);
    const datos = {
      email: datosFormulario.get("email"),
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
// Mostrar contraseña
document.addEventListener("DOMContentLoaded", function () {
  const pass = document.getElementById("pass");
  const icon = document.querySelector(".fa-eye");

  icon.addEventListener("click", function () {
    if (pass.type === "password") {
      pass.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      pass.type = "password";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
    }
  });
});
