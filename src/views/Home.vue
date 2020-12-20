<template>
  <div style="padding-top: 100px">
    <div fluid="sm">
      <b-media
        right-align
        vertical-align="center"
        style="padding-left: 80px; padding-right: 80px"
      >
        <template #aside>
          <b-button variant="light"
            ><b-icon icon="plus"></b-icon> Añadir Película</b-button
          >
        </template>
        <h2 class="mt-0 mb-1">Listado de peliculas</h2>
      </b-media>
      <div fluid class="mt-4">
        <swiper
          :pagination="{ clickable: true }"
          :slides-per-view="7"
          :space-between="30"
          free-mode="true"
        >
          <swiper-slide>
            <b-card
              overlay
              img-src="https://images2.alphacoders.com/111/thumb-1920-1116537.png"
              img-alt="Image"
              img-top
            >
              <div class="filmbg">
                <h4>Title</h4>
                <b-card-text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </b-card-text>
              </div>
              <b-link to="/film" class="card-link stretched-link"></b-link>
            </b-card>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.filmbg {
  padding: 1.25rem;
  height: 100%;
  border-radius: 6.8px;
  background-color: rgba(255, 255, 255, 0.541) !important;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}
.filmbg:hover {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
.card {
  padding: 0 !important;
  color: White;
  border-radius: 8px;
  margin-bottom: 30px !important;
  overflow: hidden;
  transition: 0.5s;
}
.card-img-overlay {
  overflow: hidden;
  padding: 0 !important;
}

.card-img-top {
  height: 270px !important;
  opacity: 0.75;
  object-fit: cover;
}
</style>