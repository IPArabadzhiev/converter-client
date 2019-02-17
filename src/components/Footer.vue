<template>
  <transition name="pop" appear>
    <footer>
      <span class="fleft">&copy;happy<span class="comment">converter</span></span>
      <span class="comment fright">
        <router-link to="/about">about</router-link>
        <router-link to="/dmca">dmca</router-link>
        <router-link to="/terms">terms</router-link>
      </span>
    </footer>
  </transition>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
  footer {
    width: 100%;
    height: 106px;
    line-height: 106px;
    font-size: 1.6rem;
    border-top: 1px solid #eeeeee;

    > span,
    a {
      margin: 0 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    a {
      transition: 0.3s all ease-out;

      &:hover {
        color: #9e9c9c;
      }
    }
  }
</style>
