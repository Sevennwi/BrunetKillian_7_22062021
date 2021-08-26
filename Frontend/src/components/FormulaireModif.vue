<template>
  <section>
    <article>
      <div v-if="gif" class="cardModif">
        <div class="userName">
          <p>{{ gif.user.email }}</p>
        </div>
        <div class="gif">
          <h2>{{ gif.title }}</h2>
          <img :src="gif.imageUrl" alt="Gif" />
          <p>{{ gif.description }}</p>
        </div>

        <!-- Reaction-->
        <div>
          <button
            v-if="!hasLiked"
            @click.prevent.stop="likeGif()"
            class="like"
            :disabled="hasDisliked"
          >
            <i class="fas fa-arrow-up"></i>
          </button>
          <button
            v-if="hasLiked"
            @click.prevent.stop="deleteLikeGif()"
            class="like active"
            :disabled="hasDisliked"
          >
            <i class="fas fa-arrow-up"></i>
          </button>
          <span> {{ likeNumber }} </span>
          <button
            v-if="!hasDisliked"
            @click.prevent.stop="dislikeGif()"
            class="dislike"
            :disabled="hasLiked"
          >
            <i class="fas fa-arrow-down"></i>
          </button>
          <button
            v-if="hasDisliked"
            @click.prevent.stop="deleteDislikeGif()"
            class="dislike active"
            :disabled="hasLiked"
          >
            <i class="fas fa-arrow-down"></i>
          </button>
          <span> {{ dislikeNumber }} </span>
        </div>
      </div>

      <!-- Commentaire-->
      <div v-if="gif" class="commentaire">
        <h2 class="h2Comment">Espace Commentaire</h2>
        <div
          v-for="commentaire in gif.commentaires"
          :key="commentaire.id"
          class="cardComment"
        >
          <div v-if="commentaire.user !== null" class="userNameComment">
            <p>{{ commentaire.user.email }}</p>
          </div>
          <div class="comment">
            <p>{{ commentaire.commentaire }}</p>
            <button
              v-if="gif && commentaire.userId == userLogin"
              @click.prevent.stop="deleteComment()"
              class="commentDelete"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <input
          type="text"
          id="Commentaire"
          v-model="comment.commentaire"
          placeholder="Votre super commentaire"
          pattern="[a-zA-Z0-9- ]+"
          maxlength="150"
        />
        <button @click.prevent.stop="sendComment()" type="submit" class="btn">
          Envoyer
        </button>
      </div>

      <!-- Modifier Gif-->
      <div v-if="gif && (isAdmin || gif.userId == userLogin)">
        <form @submit="gifModifFetch()" onsubmit="return false">
          <p>Modificateur de Gif</p>
          <div class="row">
            <label for="Name">Nouveau nom du Gif</label>
            <input
              type="text"
              id="Name"
              placeholder="Nom du Gif"
              pattern="[a-zA-Z0-9- ]+"
              maxlength="20"
              v-model="gif.title"
            />
          </div>
          <div class="row">
            <label for="Description">Nouvelle description du Gif</label>
            <input
              type="text"
              id="Description"
              placeholder="Description du Gif"
              pattern="[a-zA-Z0-9- ]+"
              maxlength="30"
              v-model="gif.description"
            />
          </div>
          <div class="row">
            <label for="Image">Nouveau Gif</label>
            <input type="file" id="Image" placeholder="Gif" />
          </div>

          <div>
            <button type="submit" class="btnModif">Modification</button>
          </div>
        </form>

        <div class="delete">
          <button
            @click="gifDeleteFetch()"
            class="btnDelete"
            onsubmit="return false"
          >
            Suppression du Gif
          </button>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
export default {
  name: 'FormulaireModif',
  data() {
    return {
      gif: null,
      userLogin: localStorage.getItem('userId'),
      isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
      comment: {
        commentaire: null,
      },
    };
  },

  created() {
    this.gifCreateFetch();
  },

  computed: {
    hasLiked() {
      for (const reaction of this.gif.reactions) {
        if (this.userLogin == reaction.userId && reaction.type == 'like') {
          return true;
        }
      }
      return false;
    },

    hasDisliked() {
      for (const reaction of this.gif.reactions) {
        if (this.userLogin == reaction.userId && reaction.type == 'dislike') {
          return true;
        }
      }
      return false;
    },

    likeNumber() {
      return this.gif.reactions.filter((reaction) => reaction.type === 'like')
        .length;
    },

    dislikeNumber() {
      return this.gif.reactions.filter(
        (reaction) => reaction.type === 'dislike',
      ).length;
    },
  },

  methods: {
    gifCreateFetch() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      fetch(`http://localhost:3000/api/gif/${id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        // Then with the data from the response in JSON...
        .then((response) => {
          this.gif = response;
          console.log('Success:', response);
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    gifModifFetch() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      const image = document.getElementById('Image').files[0];
      const gifData = new FormData();
      gifData.append('image', image);
      gifData.append(
        'gif',
        JSON.stringify({
          title: this.gif.title,
          description: this.gif.description,
        }),
      );
      console.log(gifData);
      fetch(`http://localhost:3000/api/gif/${id}`, {
        method: 'PUT',
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

    gifDeleteFetch() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      fetch(`http://localhost:3000/api/gif/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        // Then with the data from the response in JSON...
        .then((response) => {
          console.log('Success:', response);
          // eslint-disable-next-line no-restricted-globals
          location.replace(location.origin);
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    likeGif() {
      console.log('coucou');
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      fetch(`http://localhost:3000/api/gif/${id}/reaction`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'like',
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Gif liké', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    deleteLikeGif() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      const reactionId = this.getMyLikeId();
      fetch(`http://localhost:3000/api/gif/${id}/reaction/${reactionId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Like supprimé', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    dislikeGif() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      fetch(`http://localhost:3000/api/gif/${id}/reaction`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'dislike',
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Gif Disliké', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    deleteDislikeGif() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      const reactionId = this.getMyDislikeId();
      fetch(`http://localhost:3000/api/gif/${id}/reaction/${reactionId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Like supprimé', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    getMyLikeId() {
      for (const reaction of this.gif.reactions) {
        if (this.userLogin == reaction.userId && reaction.type == 'like') {
          return reaction.id;
        }
      }
      return false;
    },

    getMyDislikeId() {
      for (const reaction of this.gif.reactions) {
        if (this.userLogin == reaction.userId && reaction.type == 'dislike') {
          return reaction.id;
        }
      }
      return false;
    },

    getCommentId() {
      for (const comment of this.gif.commentaires) {
        if (this.userLogin == comment.userId) {
          return comment.id;
        }
      }
      return false;
    },

    sendComment() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      fetch(`http://localhost:3000/api/gif/${id}/commentaire`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.comment),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Commentaire créé', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },

    deleteComment() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      const commentId = this.getCommentId();
      fetch(`http://localhost:3000/api/gif/${id}/commentaire/${commentId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('Commentaire supprimé', response);
          this.gifCreateFetch();
        })
        // Then with the error genereted...
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
/* eslint-enable no-restricted-syntax */
/* eslint-enable eqeqeq */
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

  .cardModif {
    display: block;
    text-align: center;
    width: 50%;
    margin: 0 auto 60px;
    padding: 5px 0 10px;
    background-color: lighten($color: #c6e5d9, $amount: 8%);
    border-radius: 5%;
    text-decoration: none;
    color: black;

    @include tablet {
      width: 80%;
    }

    .userName {
      text-align: left;
      margin: 0 10px -15px;
      color: grey;
      font-size: 0.8em;
    }

    .gif {
      margin: 0 0 10px;
      h2 {
        font-size: 1.3em;
      }
      img {
        max-width: 90%;
        height: auto;
        border-radius: 2%;
      }
    }
  }

  .like {
    border: 2px solid black;
    border-radius: 30%;
    outline: none;
    margin: 0 20px;
    font-size: 1.3em;
    background-color: lighten($color: #c6e5d9, $amount: 8%);
    &:hover {
      color: #3fb8af;
      cursor: pointer;
      border-color: #3fb8af;
    }
    &:disabled {
      color: gray;
      border-color: gray;
    }
    &.active {
      color: #3fb8af;
      cursor: pointer;
      border-color: #3fb8af;
    }
  }
  .dislike {
    border: 2px solid black;
    border-radius: 30%;
    outline: none;
    margin: 0 20px;
    font-size: 1.3em;
    background-color: lighten($color: #c6e5d9, $amount: 8%);
    &:hover {
      color: #ff3d7f;
      cursor: pointer;
      border-color: #ff3d7f;
    }
    &:disabled {
      color: gray;
      border-color: gray;
    }
    &.active {
      color: #ff3d7f;
      cursor: pointer;
      border-color: #ff3d7f;
    }
  }

  .commentaire {
    display: flex;
    flex-direction: column;
    .h2Comment {
      font-size: 1.4em;
      font-weight: bold;
      margin: 10px auto 20px;
    }

    .cardComment {
      width: 50%;
      margin: 10px auto;
      border-radius: 5%;
      background-color: lighten($color: #c6e5d9, $amount: 8%);

      @include tablet {
        width: 80%;
      }

      .userNameComment {
        color: grey;
        margin: 0 10px;
      }
      .comment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 10px;
        .commentDelete {
          border: none;
          outline: none;
          margin: 0 0 0 20px;
          font-size: 1.2em;
          color: grey;
          background-color: lighten($color: #c6e5d9, $amount: 8%);
          &:hover {
            color: #ff3d7f;
            cursor: pointer;
            border-color: #ff3d7f;
          }
        }
      }
    }
    input {
      max-width: 80%;
      margin: 10px auto;
      outline: none;
      border: 1px solid #333;
      border-radius: 5px;
      padding: 5px 10px;
    }

    .btn {
      outline: none;
      border: 1px solid #333;
      border-radius: 10px;
      margin: 10px auto 10px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 15px;
      transition: background-color 0.3s ease-in-out;
      &:hover {
        background-color: #ff3d7f;
        color: white;
      }
    }
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
  .btnModif {
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

.delete {
  display: flex;
  .btnDelete {
    outline: none;
    border: 1px solid #333;
    border-radius: 10px;
    margin: 40px auto;
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
