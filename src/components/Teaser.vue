<template>
  <div v-if="filmTeaser != null">
    <div v-if="filmTeaser[0]">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="filmTeaser[0].key"
        />
      </vue-plyr>
    </div>
    <div v-if="!filmTeaser[0]">
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="$parent.filmVid[0].key"
        />
      </vue-plyr>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      filmTeaser: null,
    };
  },
  props: { filmID: Number },
  mounted() {
    const lang = "&language=es";
    const apiKey = "?api_key=b5b7e89874ed859bc216d8a64d1341a8";

    if (this.$route.params.id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos${
            apiKey + lang
          }`
        )
        .then((res) => {
          this.filmTeaser = res.data.results;
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${this.filmID}/videos${
            apiKey + lang
          }`
        )
        .then((res) => {
          this.filmTeaser = res.data.results;
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>