<template>
    <section>
        <article id="card-container">
            <div>
                <p>Test</p>
                <button @click="gifFetch()">Click</button>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aliquid at error consequatur libero commodi odit! Fugiat obcaecati ipsum, eligendi libero expedita maxime, ullam illum quidem veritatis, doloribus aperiam enim.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aliquid at error consequatur libero commodi odit! Fugiat obcaecati ipsum, eligendi libero expedita maxime, ullam illum quidem veritatis, doloribus aperiam enim.</p>

            </div>
        </article>
    </section>
    
</template>

<script>
export default {
  name: "Section",

   methods: {
        gifFetch: function () { 
        fetch('http://localhost:3000/api/gif', {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        //Then with the error genereted...
        .catch((error) => {
        console.error('Error:', error);
        });
        },

    }
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