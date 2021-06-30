<template>
  <div class="home">
    <Header msg="Welcome to Groupomania" />
    <Formulaire msg="Welcome to Groupomania" />
    <Footer msg="Welcome to Groupomania" />
  </div>
</template>


<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Formulaire from "@/components/Formulaire.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Gif",
  components: {
    Header,
    Formulaire,
    Footer,
  },
};
</script>
