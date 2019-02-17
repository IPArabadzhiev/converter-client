<template>
  <div class="home">
    <SearchBar />
    <Information />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import Information from '@/components/Information.vue'

export default {
  name: 'home',
  components: {
    SearchBar,
    Information
  }
}
</script>
