//récupérer l'id de l'élément affiché sur la page
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(product) {
    return setProduct(product);
  })
  .catch(function(err) {
    console.log("Il y a un trou dans le canap'.");
});

function setProduct(product) {
// on créé le tag image et on insère l'image
  let productPicture = document.createElement('img');
  document.querySelector('.item__img').appendChild(productPicture);
  productPicture.src = product.imageUrl;
  productPicture.alt = product.altTxt;

// on insère le titre dans le h1
  let title = document.getElementById('title');
  title.textContent = product.name

// on insère le prix dans le span
  let price = document.getElementById('price');
  price.textContent = product.price;

// on insère la description dans le p
  let description = document.getElementById('description');
  description.textContent = product.description

// on crée des tag radio pour insérer les choix de couleur
  let target = document.getElementById('colors');
  let nbrOfChoice = product.colors.length;

    for (i=0 ; i < nbrOfChoice; i++) {
      let  optTag = document.createElement('option');
      target.appendChild(optTag);
      optTag.value = product.colors[i]
      optTag.textContent = product.colors[i];

    }
    click(product);
};

let product = '';

const colorChoice = document.getElementById('colors');
const quantityChoice = document.getElementById('quantity');

function click(product) {
  document
    .getElementById('addToCart')
    .addEventListener('click', function(e) {
      let selectedColor = colorChoice.value;
      let selectedQuantity = quantityChoice.value;

      if (selectedColor == null || selectedColor == ''){
        alert ('Veuillez sélectionner une couleur parmis les choix proposés');
      };
      if (selectedQuantity == 0 || selectedQuantity > 100) {
        alert ('Veuillez sélectionner une quantité entre 0 et 100')
      } else {
        let data = {
          color: selectedColor,
          id: id,
          quantity: selectedQuantity,
          imageUrl: product.imageUrl,
          imgAlt: product.altTxt,
          name: product.name,
          price: product.price
        };
  console.log(data);
      //init du localStorage

      let purchaseStorage = JSON.parse(localStorage.getItem('produit'));

      if (purchaseStorage) {
        const productExist = purchaseStorage.find(
          (product) => product.id === id && product.color === selectColor
        );
        if (productExist) {
          //Si on a déjà exactement le même produit
          let totalQuantity =
            parseInt(data.quantity) + parseInt(productExist.quantity);
            // On additionne la quantite au produit existant
          productExist.quantity = totalQuantity;
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          alert(
          `Vous avez bien ajouté ${selectedQuantity} ${product.name} dans le colori ${selectedColor} dans votre panier`
        );
        } else {
          //Sinon, on a joute ce produit au panier
          purchaseStorage.push(data);
          localStorage.setItem('produit', JSON.stringify(purchaseStorage));
          alert(
           `Vous avez bien ajouté ${selectedQuantity} ${product.name} dans le colori ${selectedColor} dans votre panier`
        );
        }
      } else {
        //s'il n'y a rien dans le panier création array
        purchaseStorage = [];
        //On push les informations du localStorage dans le array
        purchaseStorage.push(data);
        localStorage.setItem('produit', JSON.stringify(purchaseStorage));
        alert(
           `Vous avez bien ajouté ${selectedQuantity} ${product.name} dans le colori ${selectedColor} dans votre panier`
        );
      }
    }
  });
}
