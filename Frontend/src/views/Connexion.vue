<template>
  <div class="home">
    <!-- vue particule -->
    <HeaderLogin />
    <SectionConnex />
    <Footer />
  </div>
</template>

<script>
/* eslint-disable*/
// @ is an alias to /src
import HeaderLogin from '@/components/HeaderLogin.vue';
import SectionConnex from '@/components/SectionConnex.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    HeaderLogin,
    SectionConnex,
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
