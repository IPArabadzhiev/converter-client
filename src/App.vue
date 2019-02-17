<template>
  <div id="app">
    <router-link to="/"><Header /></router-link>
    <transition name="slide-fade" appear>
      <router-view/>
    </transition>
    <Footer />
  </div>
</template>

<style lang="scss">
  @import "@/styles/_normalize.scss";
  @import "@/styles/_fonts.scss";
  @import "@/styles/_common.scss";

  #app {
    display: flex;
    flex-direction: column;
    width: 730px;
    height: 100%;
    margin: 0 auto;
    padding-top: 80px;
    color: #9e9c9c;
    font-family: "Gentona Light";
    font-weight: 100;
    text-align: center;
    box-sizing: border-box;

    footer{
      margin-top:auto;
    }
  }
</style>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    name: 'app',
    components: {
      Header,
      Footer
    }
  }
</script>