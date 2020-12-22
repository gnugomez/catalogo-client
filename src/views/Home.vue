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
        <filmslider></filmslider>
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