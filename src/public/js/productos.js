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
      window.location.href = "/";
      throw new Error("Acceso denegado");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Acceso permitido");
  })
  .catch((error) => {
    console.log("Error:", error);
    window.location.href = "/"; //Redirigir al inicio de sesión si el acceso esta denegado
  });

//Log out
document.addEventListener("DOMContentLoaded", function () {
  const logout = () => {
    //Elimina el ID del usuario al momento de cerrar sesión
    localStorage.removeItem("id");
    window.location = "/";
  };
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);
});

//Evento para abrir el modal de agregar productos

const modal = document.getElementById("crud-modal");
const openModal = document.querySelector('[data-modal-target="#crud-modal"]');
const closeModal = modal.querySelector('[data-modal-close="crud-modal"]');
//Abrir modal
openModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});
//Cerrar modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
