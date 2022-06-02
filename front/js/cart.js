//on recupère les données du localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('produit'));
let product = '';

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
  document
    .getElementById('cart__items')
    .appendChild(descriptionDiv);
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
  pPrice.innerText = `${purchaseStorage[p].price} €`;

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

  // creation + affichage de div de suppression
  let deleteDiv = document.createElement('div');
  settingsDiv.appendChild(deleteDiv);
  deleteDiv.classList.add('cart__item__content__settings__delete');

  // creation + affichage de div de suppression
  let pDelete = document.createElement('p');
  deleteDiv.appendChild(pDelete);
  pDelete.classList.add('deleteItem');
  pDelete.textContent = "Supprimer";
}
