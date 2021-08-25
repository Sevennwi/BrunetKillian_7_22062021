<template>
  <div class="home">
    <!-- vue particule -->
    <Header />
    <SectionProfil />
    <Footer />
  </div>
</template>

<script>
/* eslint-disable*/
// @ is an alias to /src
import Header from '@/components/Header.vue';
import SectionProfil from '@/components/SectionProfil.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Header,
    SectionProfil,
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
