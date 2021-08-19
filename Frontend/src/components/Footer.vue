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

@mixin tablet {
    @media all and (max-width: 700px) {
        @content;
    }
}

footer {
     display: flex;
     justify-content: space-around;
     background-color: #3FB8AF;
     padding-bottom: 30px;
     flex-grow: 0;
     flex-shrink: 0;
     z-index: 1;
     .text-center {
          text-align: center;
          font-size: 1.3em;
          color: white;

     }
     .row {
          display: flex;
          flex-direction: row;

          @include tablet {
               flex-direction: column;
          }
          .col-sm-3 {
               margin: auto;

               @include tablet {
               padding: 10px 0px;
               }
               .social {
               font-size: 2em;
               padding: 10px 20px;
               color: white;
               &:hover {
                         color: rgba($color: #FF3D7F, $alpha: 0.8);
                    }
               }
          }
     }
}

</style>