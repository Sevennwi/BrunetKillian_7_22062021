<template>
    <section>
        <article>

            <form action="index.html">
                <p>Créateur de Gif</p>
                    <div class="row">
                        <label for="Name">Nom du Gif</label>
                        <input type="text" id="Name" placeholder="Nom du Gif">
                    </div>
                    <div class="row">
                        <label for="Description">Description du Gif</label>
                        <input type="text" id="Description" placeholder="Description du Gif">
                    </div>
                    <div class="row">
                        <label for="Image">Gif</label>
                        <input type="file" id="Image" placeholder="Gif" accept="image/png, image/jpeg">
                    </div>

                <div>
                    <button type="submit" class="btn" onsubmit="return false">Création</button>
                </div>

            </form>

        </article>
    </section>
    
</template>

<script>
export default {
  name: "Formulaire",
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">

section {
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

form {
    text-align: center;
    font-size: 1.2em;
    p {
        font-size: 1.4em;
        font-weight: bold;
    }
    .row {
        display: flex;
        flex-direction: column;
        padding: 10px 10px;
        label {
            margin: 10px;
        }
        input {
            margin: auto;
            border: none;
            outline: none;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 5px 10px;
            }
    }
    .btn {
       	border: none;
        outline: none;
        border: 1px solid #333;
        border-radius: 10px;
        margin: 10px 0px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: #B38686;
            color: white;
        }
    }
}

</style>