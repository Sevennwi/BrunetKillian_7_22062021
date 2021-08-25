<template>
  <header>
    <div>
      <img
        src="../assets/Logo/icon-left-font-monochrome-white.png"
        alt="Logo"
      />
    </div>

    <nav>
      <ul>
        <li><router-link to="/Connexion">Connexion</router-link></li>
        <li><router-link to="/Inscription">Inscription</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderLogin',
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">
#particles-js {
  display: none;
}

@mixin tablet {
  @media all and (max-width: 700px) {
    @content;
  }
}

header {
  background-color: rgba($color: #3fb8af, $alpha: 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 1;

  @include tablet {
    padding: 0 20px;
  }
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;

  @include tablet {
    flex-direction: column;
  }
}

li {
  padding: 0 20px;
  vertical-align: middle;
  font-weight: bold;
  font-size: 1.2em;

  @include tablet {
    padding: 15px 0;
  }

  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: lighten($color: #ff3d7f, $amount: 10%);
    }
  }
}

img {
  width: 150px;
  height: auto;
}
</style>
