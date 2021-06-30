<template>
    <footer>
          <div class="div-footer">
               <div class="div-social">
                    <p class="text-center">
                         Retrouvez nous également sur les réseaux sociaux de l'entreprise !<br>
                    </p>
                    <div class="row">
                         <div class="col-sm-3">
                              <div>
                                   <a class="social" href="https://twitter.com" target="blank"><span class="fa fa-twitter"></span> <span class="sr-only">Twitter</span></a>
                              </div>
                         </div>
                         <div class="col-sm-3">
                              <div>
                                   <a class="social" href="https://www.facebook.com" target="blank"><span class="fa fa-facebook"></span> <span class="sr-only">Facebook</span></a>
                              </div>
                         </div>
                         <div class="col-sm-3">
                              <div>
                                   <a class="social" href="https://www.reddit.com" target="blank"><span class="fa fa-dribbble"></span> <span class="sr-only">Reddit</span></a>
                              </div>
                         </div>
                         <div class="col-sm-3">
                              <div>
                                   <a class="social" href="https://www.instagram.com" target="blank"><span class="fa fa-instagram"></span> <span class="sr-only">Instagram</span></a>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
    </footer>
</template>


<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>

<style lang="scss">

    footer {
        display: flex;
        justify-content: space-around;
        background-color: #B38686;
        padding-bottom: 10px;
        flex-grow: 0;
        flex-shrink: 0;
        z-index: 1;
        .text-center {
            text-align: center;
            font-size: 1.3em;
            color: #f2f2f2;

        }
        .row {
            display: flex;
            flex-direction: row;
            .col-sm-3 {
                margin: auto;
                .social {
                    font-size: 2em;
                    padding: 10px 20px;
                    color: #f2f2f2;
                    &:hover {
                            color: #FFD9D9;
                    }
                }
            }
        }
    }

</style>