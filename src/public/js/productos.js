// obtener el id de usuario del localstorage
const userId = localStorage.getItem("id");
console.log("fetch", userId);
fetch("/verificar-id", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
    userId: userId, // Enviar el ID a la cabecera
  },
})
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      window.location.href = "/login";
      throw new Error("Acceso denegado");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Acceso permitido");
  })
  .catch((error) => {
    console.log("Error:", error);
    window.location.href = "/login"; //Redirigir al inicio de sesión si el acceso esta denegado
  });

//Cerrar sesion
document.addEventListener("DOMContentLoaded", function () {
  const logout = () => {
    //Elimina el ID del usuario al momento de cerrar sesión
    localStorage.removeItem("id");
    window.location = "/login";
  };
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);
});
