<template>
  <section>
    <article>
      <form @submit="gifCreateFetch()" onsubmit="return false">
        <!-- action="index.html"-->
        <p>Créateur de Gif</p>
        <div class="row">
          <label for="Name">Nom du Gif</label>
          <input
            type="text"
            id="Name"
            placeholder="Nom du Gif"
            pattern="[a-zA-Z0-9- ]+"
            maxlength="20"
            v-model="dataGifCreate.title"
          />
        </div>
        <div class="row">
          <label for="Description">Description du Gif</label>
          <input
            type="text"
            id="Description"
            placeholder="Description du Gif"
            pattern="[a-zA-Z0-9- ]+"
            maxlength="30"
            v-model="dataGifCreate.description"
          />
        </div>
        <div class="row">
          <label for="Image">Gif</label>
          <input type="file" id="Image" placeholder="Gif" />
        </div>

        <div>
          <button type="submit" class="btn">Création</button>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Formulaire',
  data() {
    return {
      dataGifCreate: {
        title: null,
        description: null,
        imageUrl: null,
      },
      msg: '',
    };
  },

  methods: {
    gifCreateFetch() {
      const image = document.getElementById('Image').files[0];
      console.log(image);
      const gifData = new FormData();
      gifData.append('image', image);
      gifData.append(
        'gif',
        JSON.stringify({
          title: this.dataGifCreate.title,
          description: this.dataGifCreate.description,
        }),
      );
      console.log(gifData);
      fetch('http://localhost:3000/api/gif', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: gifData,
      })
        .then((response) => response.json())
        // Then with the data from the response in JSON...
        .then((gif) => {
          console.log('Success:', gif);
          // eslint-disable-next-line no-restricted-globals
          location.replace(location.origin);
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<style lang="scss">
@mixin tablet {
  @media all and (max-width: 700px) {
    @content;
  }
}

section {
  flex-grow: 1;
  flex-shrink: 0;
}

article {
  background-color: rgba($color: #c6e5d9, $alpha: 1);
  width: 50%;
  margin: 0 auto;
  padding: 20px 0;
  z-index: 1;

  @include tablet {
    width: 80%;
  }
}

form {
  text-align: center;
  font-size: 1.2em;
  p {
    font-size: 1.4em;
    font-weight: bold;
  }
  .row {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    label {
      margin: 10px;
    }
    input {
      max-width: 80%;
      margin: auto;
      outline: none;
      border: 1px solid #333;
      border-radius: 5px;
      padding: 5px 10px;
    }
  }
  .btn {
    outline: none;
    border: 1px solid #333;
    border-radius: 10px;
    margin: 30px 0 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 20px;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: #ff3d7f;
      color: white;
    }
  }
}
</style>
