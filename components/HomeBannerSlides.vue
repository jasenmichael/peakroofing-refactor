<template>
  <div>
    <br><br><br>
    <h1>homeBannerSlides yo!</h1>
    <pre v-html="homeBannerSlides" />
  </div>
</template>

<script>
// import axios from 'axios'
import { getImageGalleryByPath, getFileByUuid } from '~/lib/api'

export default {
  data() {
  return {
    homeBannerSlides: this.$store.state.galleries.homeBannerSlides
    }
  },
  created() {
    this.getImageGalleryByPath("/gallery/main-banner-slideshow")
  },
  methods: {
    getImageGalleryByPath(gallery) {
      if (!this.homeBannerSlides) {
      return getImageGalleryByPath(gallery)
        .then((res) => {
        this.$store.state.galleries.homeBannerSlides = res
        this.homeBannerSlides = res
        })
      }
    }
  }
}

</script>

<style>

</style>