<template>
  <div class="search-bar" :class="{ 'empty-focused': emptyFocused }">
    <input class="search"
           type="text"
           @focus="onSearchFocus"
           @blur="onSearchBlur"
           v-model="searchValue"
    />
    <button class="download-button"><div class="dw-arrow-down">&gt;<div class="dw-arrow-yellow">&gt;</div></div> DOWNLOAD</button>
    <div class="search-placeholder">Enter supported link..</div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',

    data() {
      return {
        searchValue: '',
        emptyFocused: false
      }
    },

    methods: {
      onSearchFocus() {
        if (!this.searchValue) {
          this.emptyFocused = true;
        }
      },

      onSearchBlur() {
        if (!this.searchValue) {
          this.emptyFocused = false;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $padding-left-search: 40px;

  .search-bar {
    position: relative;
    width: 100%;
    height: 100px;
    margin: 130px auto;
    padding: 0 20px 0 $padding-left-search;
    line-height: 100px;
    font-size: 2.1rem;
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    border-radius: 50px 50px 50px 0;
    transition: 0.3s border-radius ease-out;

    &,
    & .search {
      background-color: #f7f7f7;
    }

    &.empty-focused {
      border-radius: 50px;

      .search-placeholder {
        opacity: 0.4;
        transform: translateY(-30px);
        font-size: 1.5rem;
      }
    }

    .search,
    .search-placeholder {
      width: calc(100% - 195px); // 100% - (padding left and right and button width)
    }

    .search-placeholder {
      position: absolute;
      top: 0;
      left: $padding-left-search;
      text-align: left;
      pointer-events: none;
      transition: 0.2s all ease-out;
    }

    .download-button {
      width: 174px;
      margin-left: 20px;
      height: 62px;
      line-height: 62px;
      color: #ffffff;
      font-family: "Gentona Medium";
      font-size: 1.7rem;
      font-weight: 600;
      background-color: #ff3e39;
      border-radius: 31px;
      vertical-align: middle;
      transition: 0.3s all ease-out;

      &:hover {
        border-radius: 0 31px 0 31px;
      }

      &:active {
        border-radius: 31px;
        transform: translate(1px, 1px);
      }
    }

    .dw-arrow-down,
    .dw-arrow-yellow {
      display: inline-block;
    }

    .dw-arrow-down {
      font-size: 3rem;
      vertical-align: middle;
      transform: rotate(90deg);
    }

    .dw-arrow-yellow {
      color: #fee7a3;
    }
  }
</style>
