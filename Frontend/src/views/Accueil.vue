<template>
  <div class="home">
    <!-- vue particule -->
    <Header/>
    <Section/>
    <Footer/>
  </div>
</template>


<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Section from "@/components/Section.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Section,
    Footer,
  },
};
</script>

<style lang="scss">

  .home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

</style>
