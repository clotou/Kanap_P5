//on récupère l'id de la commande
const id = new URL(window.location.href).searchParams.get("id");

//on insere l'id de la commande dans la page
let printOrderId = document.getElementById('orderId');
printOrderId.textContent = id;
localStorage.clear();
