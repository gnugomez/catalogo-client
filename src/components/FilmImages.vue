<template>
  <div>
    <b-carousel controls>
      <b-carousel-slide
        v-for="backdrop in $parent.filmImg.backdrops"
        :key="backdrop.id"
        :img-src="$parent.imagesurl + backdrop.file_path"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>