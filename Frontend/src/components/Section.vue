<template>
    <section>
        <article id="card-container">
            <div>
                <p>Test</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aliquid at error consequatur libero commodi odit! Fugiat obcaecati ipsum, eligendi libero expedita maxime, ullam illum quidem veritatis, doloribus aperiam enim.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aliquid at error consequatur libero commodi odit! Fugiat obcaecati ipsum, eligendi libero expedita maxime, ullam illum quidem veritatis, doloribus aperiam enim.</p>

            </div>
        </article>
    </section>
    
</template>

<script>
export default {
  name: "Section",
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">

section {
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
}

article {
    background-color: rgba($color: #FFD9D9, $alpha: 1);
    width: 50%;
    margin: 0 auto;
    padding: 20px 0px;
    z-index: 1;
}


</style>