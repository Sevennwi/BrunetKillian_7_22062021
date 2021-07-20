<template>
    <header>
        <div>
            <router-link to="/"><img src="../assets/Logo/icon-left-font-monochrome-white.png" alt="Logo"></router-link>
        </div>

        <nav>
            <ul>
                <li><router-link to="/">Accueil</router-link></li>
                <li><router-link to="/gif-creation">Créer un Gif</router-link></li>
                <li><router-link to="/profil">Profil</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">

header {
    background-color: rgba($color: #3FB8AF, $alpha: 1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 100px;
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 1;
}


ul{
    list-style-type: none;
    display: flex;
    flex-direction: row;

}

li {
    padding: 0px 20px;
    vertical-align: middle;
    font-weight: bold;
    font-size: 1.2em;

    a {
        color: white;
        text-decoration: none;
        &:hover {
            color: lighten($color: #FF3D7F, $amount: 10%);
        }
    }
}


img {
    width: 150px;
    height: auto;
    &:hover {
        opacity: 0.7;
    }
}

</style>