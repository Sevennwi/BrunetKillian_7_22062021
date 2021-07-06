<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

//const gif = document.getElementById('card-container');

/*(async function () {
	const articles = await fetchGif()
  
	for (article of articles) {
		createCard(article)
	}

}())*/

function fetchGif() {
	return fetch("http://localhost:3000/api/gif/")
	  .then(function(httpBodyResponse) {
		return httpBodyResponse.json()
	  })
	  .then(function(articles) {
		return articles
	  })
	  .catch(function(error) {
		alert(error)
	  })
  }

  fetchGif()

  /*function createCard(article) {
	
	const col = document.createElement("div");
    col.className = 'col-md-4';
	const carte = document.createElement('div');
	carte.className = 'card carte';
	const name = document.createElement("h3");
    name.innerText = article.name;
	const description = document.createElement("p");
    description.innerText = article.description;
	const imageUrl = document.createElement("img");
	imageUrl.src = article.imageUrl;
	imageUrl.className = 'img-thumbnail';
    const price = document.createElement('p')
    price.innerText = Math.ceil (article.price / 1000) + "€"
	price.className = 'price';
	const button = document.createElement('a');
	button.innerText = "Buy";
	button.type = "button";
	button.className = 'btn btn-danger button stretched-link';
	button.href = "Product.html"
	button.addEventListener ("click", function(){
		localStorage.setItem("detailCameras", JSON.stringify(article));
	})
	

	carte.appendChild(imageUrl);
	carte.appendChild(name);
	carte.appendChild(description);
    carte.appendChild(price);
	carte.appendChild(button);
	col.appendChild(carte);

	gif.appendChild(col);
}

createCard()*/



</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

body {
    margin: 0;
    padding: 0;
  }

  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
