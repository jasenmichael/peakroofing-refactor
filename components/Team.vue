<template>
  <div>
    <br><br><br>
    <h1>Bad Ass Team yo!</h1>
    <pre v-html="team" />
  </div>
</template>

<script>
// import axios from 'axios'
import { getTeam } from '~/lib/api'

export default {
  data() {
    return {
      team: this.$store.state.team
      }
  },
  created() {
    this.getTeam()
  },
  methods: {
    getTeam() {
      if (!this.team) {
      return getTeam()
        .then((res) => {
        this.$store.state.team = res
        this.team = res
        })
      }
    }
  }
}

</script>

<style>

</style>