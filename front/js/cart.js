let purchaseStorage = JSON.parse(localStorage.getItem('produit'));
// let article ='';

fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    // console.log(data);
    if (purchaseStorage) {
      for (p of purchaseStorage) {
        const product = data.find((d) => d._id === p.id);
        if (product) {
          p.price = product.price;
        }
      }
    }
    getItem();
    totalItem();
    getForm();
    postForm();
  })
  .catch(function(err) {
    console.log("Il y a un trou dans le canap'.");
});

function getItem() {
  if (purchaseStorage == null) {
    // si le panier est vide
    let  panierVide = document.createElement('article');
    document
      .getElementById('cart__items')
      .appendChild(panierVide);
      panierVide.textContent = 'Votre panier est vide';
  } else {
    //si le panier n'est pas vide
      for (let p in purchaseStorage){
      // creation + affichage de l'article

      let  article = document.createElement('article');
      document
        .getElementById('cart__items')
        .appendChild(article);
        article.classList.add('cart__item');
        article.dataset.id = purchaseStorage[p].id;
        article.dataset.color = purchaseStorage[p].color;

      // creation + affichage de la div image du produit
      let divImg = document.createElement('div');
      article.appendChild(divImg);
      divImg.classList.add('cart__item__img');

      // creation + affichage de l'image du produit
      let img = document.createElement('img');
      divImg.appendChild(img);
      img.src = purchaseStorage[p].imageUrl;
      img.alt = purchaseStorage[p].imgAlt;

      // creation + affichage de la div descriptive globale
      let descriptionDiv = document.createElement('div');
      article.appendChild(descriptionDiv);
      descriptionDiv.classList.add('cart__item__content');

      // creation + affichage de la div contenant la description
      let descriptionSubDiv = document.createElement('div');
      descriptionDiv.appendChild(descriptionSubDiv);
      descriptionSubDiv.classList.add('cart__item__content__description');

      // creation + affichage du nom de l'article
      let titreName = document.createElement('h2');
      descriptionSubDiv.appendChild(titreName);
      titreName.innerText = purchaseStorage[p].name;

      // creation + affichage de la couleur de l'article
      let pColor = document.createElement('p');
      descriptionSubDiv.appendChild(pColor);
      pColor.innerText = purchaseStorage[p].color;

      // creation + affichage du prix de l'article
      let pPrice = document.createElement('p');
      descriptionSubDiv.appendChild(pPrice);
      pPrice.innerText = purchaseStorage[p].price + ' €';

      // creation + affichage de la div contenant la commande
      let settingsDiv = document.createElement('div')
      descriptionDiv.appendChild(settingsDiv);
      settingsDiv.classList.add('cart__item__content__settings');

      // creation + affichage de la div contenant la quantite de la commande
      let quantDiv = document.createElement('div');
      settingsDiv.appendChild(quantDiv);
      quantDiv.classList.add('cart__item__content__settings__quantity');

      // creation + affichage de la quantite de la commande
      let pQuant = document.createElement('p');
      quantDiv.appendChild(pQuant);
      pQuant.innerText = `Qté : ${purchaseStorage[p].quantity}`;

      // creation + affichage de l'input quantite (à nouveau)
      let inputQuant = document.createElement('input');
      quantDiv.appendChild(inputQuant);
      inputQuant.setAttribute('type', 'number');
      inputQuant.classList.add('itemQuantity');
      inputQuant.setAttribute('name', 'itemQuantity');
      inputQuant.setAttribute('min', '1');
      inputQuant.setAttribute('max', '100');
      inputQuant.value = purchaseStorage[p].quantity;

      let modifQuant = document.querySelectorAll('.itemQuantity')
      for (let i = 0; i < modifQuant.length; i++){
        modifQuant[i].addEventListener('change', function(e){
        purchaseStorage[i].quantity = e.target.value;

        if(purchaseStorage[i] === 0 || purchaseStorage > 100) {
          alert('Veuillez saisir une quantite entre 1 et 100')
        } else {
          localStorage.setItem('produit', JSON.stringify(purchaseStorage))
          location.reload();
        }
        totalItem();
        });
      }
      // creation + affichage de div de suppression
      let deleteDiv = document.createElement('div');
      settingsDiv.appendChild(deleteDiv);
      deleteDiv.classList.add('cart__item__content__settings__delete');

      // creation + affichage de div de suppression
      let pDelete = document.createElement('p');
      deleteDiv.appendChild(pDelete);
      pDelete.classList.add('deleteItem');
      pDelete.textContent = "Supprimer";
      pDelete.addEventListener('click', function(e){
        e.preventDefault;
      let idDelButton = purchaseStorage[p].id;
      let colorDelButton = purchaseStorage[p].color;
      let nameDelButton = purchaseStorage[p].name;
//on selectionne les elements à conserver (non suprimés)
      purchaseStorage = purchaseStorage.filter( elt => elt.id !== idDelButton || elt.color !== colorDelButton);

//on recherge le local storage filtré que l'on recharge
      localStorage.setItem('produit', JSON.stringify(purchaseStorage))
      location.reload();

      });
    }
  }
}


function totalItem () {
  //on récupère la quatité de l'item
  let divQuant = document.getElementsByClassName('itemQuantity');
  let divPrix = document.getElementsByClassName('cart__item__content__description');
  let sumQuant = 0;
  let sumPrix = 0;
  let sumSubTotalPrix = 0;
  let sumTotalPrix = 0
  let totalQuant = 0
  for (let i = 0; i < divQuant.length; i++) {
    sumQuant = parseInt(divQuant[i].value)
    console.log(sumQuant);
    sumPrix = divPrix[i].children[2].textContent.split(' ')[0];
    console.log(sumPrix);
    sumSubTotalPrix = sumQuant * sumPrix;
    sumTotalPrix += sumSubTotalPrix;
    totalQuant += sumQuant;
  }
  //on affiche la quantite
  document.getElementById('totalQuantity').textContent = totalQuant;

  //on affiche le prix total
  document.getElementById('totalPrice').textContent = sumTotalPrix;
}

// FORMULAIRE----------------
//validateurs regex
let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let addressRegex = new RegExp('^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

function getForm(){

//on récupère et testons la validité du prénoms
  let firstName = document.getElementById('firstName');
  firstName.addEventListener('change', function() {
    if(nameRegex.test(firstName.value) === false) {
      document.getElementById('firstNameErrorMsg').textContent = 'Le format du prénom est incorrect, veuillez le saisir à nouveau.'
    } else {
      document.getElementById('firstNameErrorMsg').textContent = '';
    }
  });

  //on récupère et testons la validité du nom
  let lastName = document.getElementById('lastName');
  lastName.addEventListener('change', function () {
    if (nameRegex.test(lastName.value) === false) {
      document.getElementById('lastNameErrorMsg').textContent = 'Le format du nom est incorrect, veuillez le saisir à nouveau.'
    } else {
      document.getElementById('lastNameErrorMsg').textContent = '';
    }
  });

  //on récupère et testons la validité de l'adresse
  let address = document.getElementById('address');
  address.addEventListener('change', function(){
    if (addressRegex.test(address.value) === false) {
      document.getElementById('addressErrorMsg').textContent = "Le format de l'adresse est incorrect, veuillez la saisir à nouveau."
    } else {
      document.getElementById('addressErrorMsg').textContent = '';
    }
  });

  //on récupère et testons la validité de la ville
  let  city = document.getElementById('city');
  city.addEventListener('change', function() {
      if (nameRegex.test(city.value) === false) {
        document.getElementById('cityErrorMsg').textContent = "Le format de la ville est incorrect, veuillez la saisir à nouveau."
      } else {
        document.getElementById('cityErrorMsg').textContent = '';
      }
  });

  //on récupère et testons la validité de l'email
let email = document.getElementById('email');
email.addEventListener('change', function() {
  if(emailRegex.test(email.value) === false) {
    document.getElementById('emailErrorMsg').textContent = "Le format de l'email est incorrect, veuillez le saisir à nouveau."
  } else {
    document.getElementById('emailErrorMsg').textContent = '';
  }
});
}


// on post les données du formulaire
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', function(e) {
    e.preventDefault();
//on récupère les données saisies et conformes
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }

  let products = [];

  if(!purchaseStorage) {
    alert( "Votre panier est vide, veuillez selectionner un article pour commander.");
  } else {
    for (let i=0; i < purchaseStorage.length; i++) {
      products.push(purchaseStorage[i].id);
    }
  }
  const sendData = {
    contact,
    products
  }


  // on envoie les données du panier et du formulaire au serveur
  fetch('http://localhost:3000/api/products/order', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    const orderId = data.orderId;
    // localStorage.setItem('orderId', data.orderId);
    document.location.href = 'confirmation.html?id='+ data.orderId;
  })
});
}
