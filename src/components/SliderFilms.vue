<template>
  <div>
    <h5 class="text-primary font-weight-bold">{{ title }}</h5>
    <div class="scrollmenu">
      <div
        v-show="films == null"
        v-for="index in 20"
        :key="index"
        class="p-3 item"
      >
        <b-card no-body img-top>
          <b-skeleton-img animation card-img="top"></b-skeleton-img>
        </b-card>
      </div>
      <div v-for="film in films" class="p-3 item" id="film" :key="film.title">
        <div v-if="film.title">
          <b-card
            overlay
            class="shadow"
            :img-src="imagesurl + film.poster_path"
            img-top
          >
            <b-link
              :to="'/movie/' + film.id + '/info/'"
              class="card-link stretched-link"
            ></b-link>
          </b-card>
          <div class="filmbg" v-b-tooltip.hover="film.title">
            <h6 class="film-title">{{ film.title }}</h6>
            <b-card-text>
              {{ film.release_date | moment }}
            </b-card-text>
          </div>
        </div>
        <div v-if="film.name">
          <b-card
            overlay
            class="shadow"
            :img-src="imagesurl + film.poster_path"
            img-top
          >
            <b-link
              :to="'/tv/' + film.id + '/info/'"
              class="card-link stretched-link"
            ></b-link>
          </b-card>
          <div class="filmbg" v-b-tooltip.hover="film.name">
            <h6 class="film-title">{{ film.name }}</h6>
            <b-card-text>
              {{ film.first_air_date | moment }}
            </b-card-text>
          </div>
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
  props: { title: String, url: String },
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
      .get(this.url + urlParams)
      .then((res) => {
        this.films = res.data.results;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style lang="css" scoped>
.scrollmenu {
  overflow: auto;
  white-space: nowrap;
}
.scrollmenu::-webkit-scrollbar {
  display: none;
}
.item {
  display: inline-block;
  position: relative;
}
.filmbg {
  background-color: white;
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
.card {
  width: 170px;
  position: relative;
  border-radius: 18px;
  margin-bottom: 30px !important;
  overflow: hidden;
  transition: 0.5s;
}

.card-img-top {
  height: 270px !important;
  object-fit: cover;
}
</style>