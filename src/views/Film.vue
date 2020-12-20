<template>
  <div>
    <div
      class="header"
      style="
        background-image: url(https://images2.alphacoders.com/111/thumb-1920-1116537.png);
      "
    >
      <div class="sub-card bgblur">
        <b-row>
          <b-col><h2 style="position: absolute">Titulo Película</h2></b-col>
          <b-col col lg="3" class="headButtons">
            <b-button size="sm" style="float: right" variant="danger"
              >Eliminar</b-button
            >
            <b-button
              size="sm"
              style="float: right; margin-right: 10px"
              variant="light"
              >Editar</b-button
            ></b-col
          >
        </b-row>
      </div>
    </div>
    <b-container fluid="sm">
      <b-media>
        <b-row>
          <div class="col-md-8 mb-4">
            <h2>Media Body</h2>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.t
            </p>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.t
            </p>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.t
            </p>
            <h2>Imagenes de la película</h2>
            <p>Pequeña descripcion...</p>
            <div>
              <b-carousel
                id="carousel-no-animation"
                style="text-shadow: 0px 0px 2px #000"
                no-animation
                indicators
                img-width="1024"
                img-height="480"
              >
                <b-carousel-slide
                  caption="First slide"
                  img-src="https://picsum.photos/1024/480/?image=10"
                ></b-carousel-slide>
                <b-carousel-slide
                  caption="Second Slide"
                  img-src="https://picsum.photos/1024/480/?image=12"
                ></b-carousel-slide>
                <b-carousel-slide
                  caption="Third Slide"
                  img-src="https://picsum.photos/1024/480/?image=22"
                ></b-carousel-slide>
                <b-carousel-slide
                  caption="Fourth Slide"
                  img-src="https://picsum.photos/1024/480/?image=23"
                ></b-carousel-slide>
              </b-carousel>
            </div>
          </div>
          <div class="col-md-4">
            <b-card title="Más Información" class="mb-2">
              <center>
                <b-avatar
                  src="https://placekitten.com/300/300"
                  size="14vw"
                  class="mt-4 mb-4"
                ></b-avatar>
              </center>
              <h5 class="text-center">Author Name</h5>
              <b-card-text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </b-card-text>
            </b-card>
          </div>
        </b-row>
        <!-- b-[Optional: add media children here for nesting] -->
      </b-media>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "Film",
};
</script>
<style lang="css">
.header {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 485px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  transition: 0.5s;
}
.sub-card h2 {
  font-size: 30px;
}
.sub-card {
  max-width: 1115px;
  background-color: rgba(255, 255, 255, 0.24);
  padding: 50px;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  margin-bottom: 30px;
  border-radius: 15px;
  transition: 0.2s;
}
.sub-card:hover {
  transform: scale(1.05);
}

@media only screen and (max-width: 1190px) {
  .header {
    height: 194px;
  }
  .sub-card {
    max-width: 1190px;
    height: 138px;
    margin-bottom: 0px;
    border-radius: 0px;
  }
  .sub-card h2 {
    font-size: 25px;
  }
  .sub-card:hover {
    transform: scale(1);
  }
}
</style>