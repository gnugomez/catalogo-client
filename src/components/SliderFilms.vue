<template>
  <div>
    <h5 class="text-primary font-weight-bold">Más populares</h5>
    <div class="scrollmenu">
      <div v-for="film in films" class="p-3 item" :key="film.title">
        <b-card
          overlay
          class="shadow"
          :img-src="imagesurl + film.poster_path"
          img-alt="Image"
          img-top
        >
          <b-link to="/film" class="card-link stretched-link"></b-link>
        </b-card>
        <div
          v-if="film.title"
          class="filmbg bgblur shadow"
          v-b-tooltip.hover.bottom="film.title"
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
          class="filmbg bgblur shadow"
          v-b-tooltip.hover.bottom="film.name"
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
      films: [],
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
  width: 85%;
  margin-bottom: 85px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 0;
  padding: 1rem;
  height: 83px;
  border-radius: 16.8px;
  transform: scale(0.8);
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
  padding-bottom: 100px !important;
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
  transform: scale(1.1);
}
.card-img-overlay {
  overflow: hidden;
  padding: 0 !important;
}

.card-img-top {
  height: 270px !important;
  object-fit: cover;
}
</style>