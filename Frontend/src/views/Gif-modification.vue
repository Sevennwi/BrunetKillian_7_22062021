<template>
  <div class="home">
    <Header />
    <FormulaireModif />
    <Footer />
  </div>
</template>

<script>
/* eslint-disable*/
// @ is an alias to /src
import Header from '@/components/Header.vue';
import FormulaireModif from '@/components/FormulaireModif.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Gif',
  components: {
    Header,
    FormulaireModif,
    Footer,
  },
};
</script>
