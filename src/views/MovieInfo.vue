<template>
  <div v-if="film != null">
    <div
      class="header"
      v-bind:style="{
        backgroundImage: 'url(' + imagesurl + film.backdrop_path + ')',
      }"
    >
      <b-card
        overlay
        class="shadow-lg poster"
        :img-src="imagesurl + film.poster_path"
        img-alt="Image"
        img-top
      >
      </b-card>
      <div class="sub-card">
        <b-row>
          <div class="col-md-10">
            <h2 class="film-title">
              <b>{{ film.title }}</b> ({{ film.release_date | year }})
            </h2>
          </div>
          <div class="headButtons col-md-2">
            <b-button
              size="sm"
              variant="light"
              v-b-tooltip.hover="'Añadir a favoritos'"
              ><b-icon icon="heart"></b-icon
            ></b-button>
            <b-button
              size="sm"
              variant="light"
              v-b-tooltip.hover="'Añadir a mi lista'"
              ><b-icon icon="plus"></b-icon
            ></b-button>
          </div>
        </b-row>
      </div>
    </div>
    <b-container fluid="md">
      <b-media>
        <b-row>
          <div class="col-md-8 mb-4" style="position: relative">
            <div v-if="film.overview">
              <h2>Argumento</h2>
              <p>{{ film.overview }}</p>
            </div>
            <b-nav pills class="mb-2">
              <h2 class="mr-4">Media</h2>
              <b-nav-item :to="{ name: 'teaser' }">Teaser</b-nav-item>
              <b-nav-item :to="{ name: 'videos' }">Videos</b-nav-item>
              <b-nav-item-dropdown
                id="my-nav-dropdown"
                text="Más"
                toggle-class="nav-link-custom"
                right
              >
                <b-dropdown-item :to="{ name: 'images' }"
                  >Imágenes</b-dropdown-item
                >
                <b-dropdown-item to="posters">Pósters</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav>
            <router-view></router-view>
          </div>
          <div class="col-sm-4">
            <b-card class="mb-2">
              <b>Estado: </b> {{ film.status }}
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
      <filmslider
        title="Recomendado"
        :url="
          'https://api.themoviedb.org/3/movie/' + film.id + '/recommendations'
        "
      ></filmslider>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

import filmslider from "@/components/SliderFilms";

export default {
  data() {
    return {
      imagesurl: "https://image.tmdb.org/t/p/original/",
      film: null,
      filmImg: null,
      filmVid: null,
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
  },
  filters: {
    fullDate: function (date) {
      moment.locale("es");
      return moment(date).format("DD MMM YYYY");
    },
    year: (date) => {
      moment.locale("es");
      return moment(date).format("YYYY");
    },
  },
  mounted() {
    const lang = "&language=es";
    const apiKey = "?api_key=b5b7e89874ed859bc216d8a64d1341a8";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}${
          apiKey + lang
        }`
      )
      .then((res) => {
        this.film = res.data;
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}/images${apiKey}`
      )
      .then((res) => {
        this.filmImg = res.data;
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos${apiKey}`
      )
      .then((res) => {
        this.filmVid = res.data.results;
      })
      .catch((err) => console.log(err));
  },
  components: {
    filmslider,
  },
};
</script>
<style lang="css" scoped>
.poster {
  border: none;
  z-index: 2;
  margin-top: 90px;
  margin-left: 45px;
  width: 300px;
  border-radius: 25px;
  position: relative;
  margin-bottom: 30px !important;
  overflow: hidden;
  transition: 0.5s;
}
.card-img-overlay {
  overflow: hidden;
}

.card-img-top {
  height: 450px !important;
  object-fit: cover;
}

.header {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 665px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
  transition: 0.5s;
}
.sub-card h2 {
  font-size: 30px;
}
.sub-card {
  background-image: linear-gradient(to bottom, transparent, white);
  padding: 50px;
  padding-top: 100%;
  padding-bottom: 40px;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  transition: 0.2s;
}
.film-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-height: 40px;
  max-height: 40px;
}
.headButtons button {
  margin-left: 10px;
  float: right;
}
@media only screen and (max-width: 1190px) {
  .poster {
    transform: scale(0.6);
    margin: auto;
  }
  .header {
    height: 494px;
  }
  .sub-card {
    padding: 30px;
    padding-top: 140%;
  }
  .sub-card h2 {
    font-size: 25px;
  }
  .sub-card:hover {
    transform: scale(1);
  }
}
@media only screen and (max-width: 765px) {
  .headButtons button {
    margin-left: 10px;
    float: unset;
  }
  .headButtons {
    width: 130px;
    margin: auto;
  }
  .film-title {
    text-align: center;
  }
  .sub-card {
    backdrop-filter: blur(20px);
    padding: 10px;
    padding-bottom: 40px;
    padding-top: 140%;
  }
}
</style>