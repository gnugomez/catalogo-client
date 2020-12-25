<template>
  <div>
    <h5 class="text-primary font-weight-bold">Más populares</h5>
    <div class="scrollmenu">
      <div
        v-show="films == null"
        v-for="index in 20"
        :key="index"
        class="p-3 item"
      >
        <b-card no-body img-top>
          <b-skeleton-img card-img="top"></b-skeleton-img>
        </b-card>
      </div>
      <div v-for="film in films" class="p-3 item" :key="film.title">
        <b-card
          overlay
          class="shadow"
          :img-src="imagesurl + film.poster_path"
          img-top
        >
          <b-link
            :to="'movie/' + film.id + '/info/'"
            class="card-link stretched-link"
          ></b-link>
        </b-card>
        <div
          v-if="film.title"
          class="filmbg bgblur"
          v-b-tooltip.hover="film.title"
        >
          <h6 class="film-title">{{ film.title }}</h6>
          <b-card-text v-if="film.release_date">
            {{ film.release_date | moment }}
          </b-card-text>
          <b-card-text v-if="film.first_air_date">
            {{ film.first_air_date | moment }}
          </b-card-text>
        </div>
        <div
          v-if="film.name"
          class="filmbg bgblur"
          v-b-tooltip.hover="film.name"
        >
          <h6 v-if="film.name" class="film-title">{{ film.name }}</h6>
          <b-card-text v-if="film.release_date">
            {{ film.release_date | moment }}
          </b-card-text>
          <b-card-text v-if="film.first_air_date">
            {{ film.first_air_date | moment }}
          </b-card-text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      imagesurl: "https://image.tmdb.org/t/p/w500/",
      films: null,
    };
  },
  methods: {
    moment: function () {
      return moment();
    },
  },
  filters: {
    moment: function (date) {
      moment.locale("es");
      return moment(date).format("DD MMM YYYY");
    },
  },
  async mounted() {
    const urlParams = "?api_key=b5b7e89874ed859bc216d8a64d1341a8&language=es";
    await axios
      .get(`https://api.themoviedb.org/3/trending/all/day${urlParams}`)
      .then((res) => (this.films = res.data.results))
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="css" scoped>
.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}
.filmbg {
  position: absolute;
  width: 95%;
  margin-bottom: 5px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  padding: 1rem;
  height: 83px;
  border-radius: 18.8px;
  transform: scale(0.7);
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.card-body {
  padding: 0px;
  overflow: hidden;
}
.film-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-height: 20px;
  max-height: 20px;
}
.item {
  display: inline-block;
  position: relative;
}
.card {
  width: 170px;
  position: relative;
  border-radius: 18px;
  margin-bottom: 30px !important;
  overflow: hidden;
  transition: 0.5s;
}
.card:hover {
  transform: scale(1.05);
}
.card-img-overlay {
  overflow: hidden;
}

.card-img-top {
  height: 270px !important;
  object-fit: cover;
}
</style>