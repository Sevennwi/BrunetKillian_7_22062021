<template>
    <section>
        <article>

            <div v-if="gif" class="card">
                <router-link to="/gif-modification" class="cardBody">
                    <div class="userName">
                        <p>{{gif.user.email}}</p>
                    </div>
                    <div class="gif">
                        <h2>{{ gif.title }}</h2>
                        <img :src="gif.imageUrl" alt="Gif">
                        <p>{{gif.description}}</p>
                    </div>

                </router-link>


                <div>  <!-- Faire 4 boutons create destroy-->
                    <button v-if="!hasLiked" @click.prevent.stop="likeGif()" class="like"><i class="fas fa-arrow-up"></i></button>
                    <button v-if="hasLiked" @click.prevent.stop="deleteLikeGif()" class="like active"><i class="fas fa-arrow-up"></i></button>
                    <button v-if="!hasDisliked" @click.prevent.stop="dislikeGif()" class="dislike"><i class="fas fa-arrow-down"></i></button>
                    <button v-if="hasDisliked" @click.prevent.stop="deleteDislikeGif()" class="dislike active"><i class="fas fa-arrow-down"></i></button>
                </div>
            </div>

             <!-- Faire la carte v-if ici pour modif et suppression-->
            <div v-if=" gif && gif.userId == userLogin">
                <form @submit="gifModifFetch()" onsubmit="return false">
                    <p>Modificateur de Gif</p>
                        <div class="row">
                            <label for="Name">Nouveau nom du Gif</label>
                            <input type="text" id="Name" placeholder="Nom du Gif" pattern="[a-zA-Z0-9- ]+" maxlength="20" v-model="gif.title">
                        </div>
                        <div class="row">
                            <label for="Description">Nouvelle description du Gif</label>
                            <input type="text" id="Description" placeholder="Description du Gif" pattern="[a-zA-Z0-9- ]+" maxlength="30" v-model="gif.description">
                        </div>
                        <div class="row">
                            <label for="Image">Nouveau Gif</label>
                            <input type="file" id="Image" placeholder="Gif">
                        </div>

                    <div>
                        <button type="submit" class="btn">Modification</button>
                    </div>

                </form>

                <div class="delete">
                    <button @click="gifDeleteFetch()" class="btn" onsubmit="return false">Suppresion du Gif</button>
                </div>
            </div>

        </article>
    </section>
    
</template>

<script>
export default {
  name: "FormulaireModif",
    data: function() {
        return {
            gif: null,
            userLogin: localStorage.getItem('userId'),
        }
    },

    created() {
        this.gifCreateFetch()
    },

    computed: {
        hasLiked: function() {
            for (let reaction of this.gif.reactions) {
                if (this.userLogin == reaction.userId && reaction.type == "like") {
                    return true
                }
            } 
            return false
        },

        hasDisliked: function() {
            for (let reaction of this.gif.reactions) {
                if (this.userLogin == reaction.userId && reaction.type == "dislike") {
                    return true
                }
            } 
            return false
        }
    },

   methods: {

        gifCreateFetch: function () { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        fetch('http://localhost:3000/api/gif/'+ id, {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
        }
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
        this.gif = response
        console.log('Success:', response);
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        gifModifFetch: function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        const image = document.getElementById('Image').files[0]
        const gifData = new FormData();
        gifData.append("image", image);
        gifData.append("gif", JSON.stringify({
            title: this.gif.title,
            description: this.gif.description,
        }))
        console.log(gifData)
        fetch('http://localhost:3000/api/gif/'+ id, {
        method: 'PUT',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
        },
        body: gifData,
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((gif) => {
        console.log('Success:', gif);
        location.replace(location.origin)
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        gifDeleteFetch: function() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        fetch('http://localhost:3000/api/gif/' + id, {
        method: 'DELETE',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
        console.log('Success:', response);
        location.replace(location.origin)
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        
        likeGif: function () { 
        console.log('coucou')
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        fetch('http://localhost:3000/api/gif/'+ id +"/reaction", {
        method: 'POST',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            type: 'like'
        }) 
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("Gif liké", response)
            this.gifCreateFetch()
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        deleteLikeGif: function () { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        const reactionId = this.getMyLikeId()
        fetch('http://localhost:3000/api/gif/'+ id +"/reaction/" + reactionId, {
        method: 'DELETE',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((response) => {
            console.log("Like supprimé", response)
            this.gifCreateFetch()
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        dislikeGif: function () { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        fetch('http://localhost:3000/api/gif/'+ id +"/reaction", {
        method: 'POST',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            type: 'dislike'
        }) 
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("Gif Disliké", response)
            this.gifCreateFetch()
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        deleteDislikeGif: function () { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        const reactionId = this.getMyDislikeId()
        fetch('http://localhost:3000/api/gif/'+ id +"/reaction/" + reactionId, {
        method: 'DELETE',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((response) => {
            console.log("Like supprimé", response)
            this.gifCreateFetch()
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        getMyLikeId: function() {
            for (let reaction of this.gif.reactions) {
                if (this.userLogin == reaction.userId && reaction.type == "like") {
                    return reaction.id
                }
            } 
        },

        getMyDislikeId: function() {
            for (let reaction of this.gif.reactions) {
                if (this.userLogin == reaction.userId && reaction.type == "dislike") {
                    return reaction.id
                }
            } 
        }

    }
};


</script>

<style lang="scss">

section {
    flex-grow: 1;
    flex-shrink: 0;
}

article {
    background-color: rgba($color: #C6E5D9, $alpha: 1);
    width: 50%;
    margin: 0 auto;
    padding: 20px 0px;
    z-index: 1;

    .like {
        border: 2px solid black;
        border-radius: 30%;
        outline: none;
        margin: 0 20px;
        font-size: 1.3em;
        background-color: lighten($color: #C6E5D9, $amount: 8%);
        &:hover {
            color: #3FB8AF;
            cursor: pointer;
            border-color: #3FB8AF;
        }
        &.active {
            color: #3FB8AF;
            cursor: pointer;
            border-color: #3FB8AF;
        }
    }
    .dislike {
        border: 2px solid black;
        border-radius: 30%;
        outline: none;
        margin: 0 20px;
        font-size: 1.3em;
        background-color: lighten($color: #C6E5D9, $amount: 8%);
        &:hover {
            color: #FF3D7F;
            cursor: pointer;
            border-color: #FF3D7F;
        }
        &.active {
        color: #FF3D7F;
        cursor: pointer;
        border-color: #FF3D7F;
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
            margin: auto;
            border: none;
            outline: none;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 5px 10px;
            }
    }
    .btn {
       	border: none;
        outline: none;
        border: 1px solid #333;
        border-radius: 10px;
        margin: 30px 0px 10px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #FF3D7F;
            color: white;
        }
    }
}

.delete {
    display: flex;
        .btn {
       	border: none;
        outline: none;
        border: 1px solid #333;
        border-radius: 10px;
        margin: 40px auto;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #FF3D7F;
            color: white;
        }
    }
}

</style>