<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
var canvas = document.getElementById('particles-js');
var app = document.getElementById('app');
console.log(canvas.height)
canvas.height = app.height;

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
}

body {
    margin: 0;
    padding: 0;
  }

  #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
