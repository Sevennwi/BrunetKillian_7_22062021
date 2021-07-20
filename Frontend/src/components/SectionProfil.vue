<template>
    <section>
        <article id="card-container">
            <form @submit="userModifyFetch()" id="inscriForm">
                <p>Profil Utilisateur</p>
                    <div class="row">
                        <label for="Name">Pseudo</label>
                        <input type="text" id="Name" placeholder="Pseudo" v-model="dataUpdate.email">
                    </div>
                    <div class="row">
                        <label for="pass">Mot de passe</label>
                        <input type="password" id="pass" placeholder="Mot de passe" v-model="dataUpdate.password">
                    </div>

                <div>
                    <button type="submit" class="btn" id="btn">Mise à jour</button>
                </div>

            </form>

            <div>
                <button type="submit" class="btn" id="btnDeco" @click="userDeco()">Déconnexion</button>
            </div>

            <div>
                <button type="submit" class="btn" id="btnDelete" @click="userDelete()">Suppression du compte</button>
            </div>

        </article>
    </section>
    
</template>

<script>
export default {
  name: "SectionProfil",
    data: function() {
        return {
            dataUpdate: {
               email: null,
               password: null 
            },
             msg: ""
        }
    },

   methods: {

        userModifyFetch: function () { 
        console.log(this.dataUpdate)
        fetch('http://localhost:3000/api/user/2', {
        method: 'PUT',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.dataUpdate),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((user) => {
        console.log('Success:', user);
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

        userDeco: function() {
            localStorage.clear()
            window.location.reload()
        },

        userDelete: function() {
        fetch('http://localhost:3000/api/user/' + localStorage.getItem('userId'), {
        method: 'DELETE',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((user) => {
        console.log('Success:', user);
        localStorage.removeItem('token')
        window.location.reload()
        })
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
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
        margin: 10px 0px;
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

#btnDeco {
       	border: none;
        outline: none;
        display: flex;
        border: 1px solid #333;
        border-radius: 10px;
        margin: 60px auto;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #FF3D7F;
            color: white;
        }
}

#btnDelete {
       	border: none;
        outline: none;
        display: flex;
        border: 1px solid #333;
        border-radius: 10px;
        margin: 60px auto;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #FF3D7F;
            color: white;
        }
}

</style>