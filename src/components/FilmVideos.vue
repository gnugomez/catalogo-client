<template>
  <div>
    <b-container fluid="sm">
      <div class="scrollmenu">
        <div
          class="item p-3 br-3"
          v-for="video in $parent.filmVid"
          :key="video.key"
        >
          <vue-plyr>
            <div data-plyr-provider="youtube" :data-plyr-embed-id="video.key" />
          </vue-plyr>
        </div>
      </div>
    </b-container>
  </div>
</template>
<style lang="css" scoped>
.scrollmenu {
  max-width: 85vw;
  overflow: auto;
  white-space: nowrap;
}
.item {
  width: 90%;
  display: inline-block;
  position: relative;
}
</style>