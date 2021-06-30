<template>
    <header>
        <div>
            <router-link to="/"><img src="../assets/Logo/icon-left-font-monochrome-white.png" alt="Logo"></router-link>
        </div>

        <nav>
            <ul>
                <li><router-link to="/">Accueil</router-link></li>
                <li><router-link to="/Gif-creation">Créer un Gif</router-link></li>
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
    background-color: rgba($color: #B38686, $alpha: 1);
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
        color: #f2f2f2;
        text-decoration: none;
        &:hover {
            color: #FFD9D9;
        }
    }
}


img {
    width: 200px;
    height: auto;
    &:hover {
        opacity: 0.7;
    }
}

</style>