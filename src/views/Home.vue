<template>
  <div style="padding-top: 100px">
    <b-container fluid="sm">
      <b-media right-align vertical-align="center">
        <template #aside>
          <b-button variant="light"
            ><b-icon icon="plus"></b-icon> Añadir Película</b-button
          >
        </template>
        <h2 class="mt-0 mb-1">Listado de peliculas</h2>
      </b-media>
      <div fluid class="mt-4">
        <filmslider
          title="Más popular hoy"
          url="https://api.themoviedb.org/3/trending/all/day"
        ></filmslider>
        <filmslider
          title="Series más populares hoy"
          url="https://api.themoviedb.org/3/trending/tv/day"
        ></filmslider>
        <filmslider
          title="Peliculas mejor valoradas"
          url="https://api.themoviedb.org/3/movie/top_rated"
        ></filmslider>
      </div>
    </b-container>
  </div>
</template>
<script>
import filmslider from "@/components/SliderFilms";
export default {
  components: {
    filmslider,
  },
};
</script>