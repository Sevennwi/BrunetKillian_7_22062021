<template>
  <div class="home">
    <Header/>
    <Formulaire/>
    <Footer/>
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
