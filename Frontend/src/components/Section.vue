<template>
    <section>
        <article id="card-container">
            <div>
                <p>Test</p>
                <button @click="gifFetch()">Click</button>
                <!-- Faire la carte ici -->
                <div v-for="gif in Gifs" :key="gif.id">
                    test {{ gif.id }}  {{ gif.title }}
                </div>
            </div>
        </article>
    </section>
    
</template>

<script>
export default {
  name: "Section",

      data: function() {
        return {
            Gifs: [],
        }
    },
    created() {
        this.gifFetch()
    },


   methods: {
        gifFetch: function () { 
        fetch('http://localhost:3000/api/gif', {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }})
        .then((response) => response.json())
        .then((response) => {
            this.Gifs = response
        })
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
    background-color: rgba($color: #C6E5D9, $alpha: 1);
    width: 50%;
    margin: 0 auto;
    padding: 20px 0px;
    z-index: 1;
}


</style>