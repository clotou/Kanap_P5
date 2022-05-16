fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      return eachItem(value);
  })
  .catch(function(err) {
    return "Il y a un trou dans le canap'.";
  });

  function eachItem(value) {
    for (let i = 0; i < value.length; i++) {
      let productLink = document.createElement('a');
      document
        .getElementById('items')
        .appendChild(productLink);
        productLink.href = `./product.html?id=${value[i]._id}`;
        console.log(productLink);

        let article = document.createElement('article');
        productLink.appendChild(article);

        let picture = document.createElement('img');
        picture.src = value[i].imageUrl;
        picture.alt = value[i].altTxt;
        article.appendChild(picture);

        let name = document.createElement('h3');
        article.appendChild(name);
        name.classList.add('productName');
        name.textContent = value[i].name;


        let description = document.createElement('p');
        article.appendChild(description);
        description.classList.add('productDescription')
        description.textContent = value[i].description;


        console.log(productLink);
    }
  };

