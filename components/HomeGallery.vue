<template>
  <div>
    <br><br><br>
    <h1>homeGallery mofos!</h1>
    <pre v-html="homeGallery" />
      <li v-for="slide in homeGallery" v-bind:key="slide.id">
            <img class="scroll" :src="slide.url"/>
      </li>  

  </div>
</template>

<script>
// import axios from 'axios'
import { getImageGalleryByPath } from '~/lib/api'

export default {
  data() {
    return {
      homeGallery: this.$store.state.galleries.homeGallery
      }
  },
  created() {
    this.getImageGalleryByPath("/gallery/featured-gallery")
  },
  methods: {
    getImageGalleryByPath(gallery) {
      if (!this.homeGallery) {
      return getImageGalleryByPath(gallery)
        .then((res) => {
        this.$store.state.galleries.homeGallery = res
        this.homeGallery = res
        })
      }
    }
  }
}

</script>

<style scoped>
li {
  list-style:none;  
}
img {
  max-width: 400px;
}
</style>