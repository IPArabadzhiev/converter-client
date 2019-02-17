<template>
  <transition name="pop" appear>
    <h1>
      <img alt="Converter logo" src="../assets/logo.png">
      <span class="emphasised">Happy</span> Converter
    </h1>
  </transition>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="scss">
h1 {
  padding: 0;
  font-size: 3.8rem;
  font-weight: 100;

  img {
    margin-right: 40px;
    vertical-align: middle;
  }
}
</style>
