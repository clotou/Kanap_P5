//récupérer l'id de l'élément affiché sur la page
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");


fetch(`http://localhost:3000/api/products/${id}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(item) {
    return setProduct(item);
  })
  .catch(function(err) {
    console.log("Il y a un trou dans le canap'.");
});

function setProduct(item) {
// on créé le tag image et on insère l'image
  let productPicture = document.createElement('img');
  document.querySelector('.item__img').appendChild(productPicture);
  productPicture.src = item.imageUrl;
  productPicture.alt = item.altTxt;

// on insère le titre dans le h1
  let title = document.getElementById('title');
  title.textContent = item.name

// on insère le prix dans le span
  let price = document.getElementById('price');
  price.textContent = item.price;

// on insère la description dans le p
  let description = document.getElementById('description');
  description.textContent = item.description

// on crée des tag radio pour insérer les choix de couleur
  let target = document.getElementById('colors');
  let nbrOfChoice = item.colors.length;

    for (i=0 ; i < nbrOfChoice; i++) {
      let  optTag = document.createElement('option');
      target.appendChild(optTag);
      optTag.value = item.colors[i]
      optTag.textContent = item.colors[i];

    }
};
