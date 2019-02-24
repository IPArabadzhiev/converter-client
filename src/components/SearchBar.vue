<template>
  <div>
    <div class="search-bar" :class="{ 'empty-focused': emptyFocused }">
      <input class="search"
             :class="{'not-converted': !isConverted}"
             type="text"
             @focus="onSearchFocus"
             @blur="onSearchBlur"
             @input="onSearchInput"
             v-model="searchValue"
             ref="searchInput"
      />
      <template v-if="isConverted">
        <button class="download-button" @click="download"><div class="dw-arrow-down">&gt;<div class="dw-arrow-yellow">&gt;</div></div> DOWNLOAD</button>
      </template>
      <template v-else-if="isConverting">
        <button class="convert-button inactive">{{ progress }}<span class="format">%</span></button>
      </template>
      <template v-else>
        <button
                class="convert-button"
                :class="{ inactive: !success, disabled: !success }"
                @click="convert"
        >
          <div class="icon-convert" :class="{ rotate: isGettingInformation }"></div> <span class="format">MP3</span>
        </button>
      </template>
      <div class="search-placeholder">{{ placeholderText }}</div>
    </div>
    <div v-if="error" class="negative error-message">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',

    data() {
      return {
        searchValue: '',
        emptyFocused: false,
        isConverting: false,
        isConverted: false,
        progress: 0,
        placeholder: 'Enter supported link..',
        videoName: '',
        checkUrlTimeout: 0,
        error: '',
        success: false,
        isGettingInformation: false,
        fileName: '',
        format: ''
      }
    },

    computed: {
      placeholderText() {
        return this.videoName || this.placeholder
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
      },

      onSearchInput() {
        // reset some flags
        this.success = false;
        this.videoName = '';
        this.isGettingInformation = true;
        this.isConverted = false;
        this.isConverting = false;
        this.fileName = '';
        this.format = '';

        clearTimeout(this.checkUrlTimeout);
        this.checkUrlTimeout = setTimeout(() => {
          this.$http.post('/getInformation', {
            url: this.searchValue
          }).then((response) => {
            this.error = response.data.error;
            this.success = response.data.success;

            if (this.success && response.data.info) {
              this.videoName = response.data.info.title;
              this.url = this.searchValue;
              this.searchValue = '';
              this.isGettingInformation = false;
              this.$refs.searchInput.blur();
            }
          });
        }, 300);
      },

      parseProgress(progressString) {
        let progress = 0;
        let result = {};
        let progressArray = progressString.split('|');
        if (progressArray.length) {
          // if everything is complete the last part is json similar to {success: true}
          let lastProgress = '';
          while (!lastProgress && progressArray.length) {
            lastProgress = progressArray.pop();
          }
          if (lastProgress) {
            try {
              result = JSON.parse(lastProgress);
              if (typeof result.success === 'undefined') {
                progress = parseInt(lastProgress, 10);
              }
            } catch (e) {
              progress = parseInt(lastProgress, 10);
            }
          }
        }

        this.isConverted = result.success;
        this.fileName = result.fileName;
        this.format = result.format;

        if (progress !== 0) {
          this.progress = progress;
        }
      },
      
      convert() {
        if (this.success) {
          // not using axios because it does not support stream responses
          let xhr = new XMLHttpRequest();
          xhr.open('POST', this.baseUrl + '/convertVideo', true);
          xhr.send(JSON.stringify({ url: this.url }));
          this.isConverting = true;
          this.isConverted = false;
          let timer = setInterval(() => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              this.isConverting = false;
              clearInterval(timer);
            }
            this.parseProgress(xhr.responseText);
          }, 200);
        }
      },

      download() {
        this.$http({
          url: '/download?fileName=' + this.fileName + '&format=' + this.format,
          method: 'GET',
          responseType: 'blob'
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.fileName + '.' + this.format);
          document.body.appendChild(link);
          link.click();
        });
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
      width: calc(100% - 195px); // 100% - (padding left and right and button width),

      &.not-converted {
        width: calc(100% - 125px); // 100% - (padding left and right and button width),
      }
    }

    .search-placeholder {
      position: absolute;
      top: 0;
      max-width: 490px;
      max-height: 100px;
      overflow: hidden;
      left: $padding-left-search;
      text-align: left;
      pointer-events: none;
      transition: 0.2s all ease-out;
    }

    .download-button,
    .convert-button {
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

      &:not(.inactive):hover {
        border-radius: 0 31px 0 31px;
      }

      &:not(.inactive):active {
        border-radius: 31px;
        transform: translate(1px, 1px);
      }

      &.disabled {
        opacity: 0.4;
      }
    }

    .convert-button {
      width: 104px;
      height: 62px;
      background-color: #ff5551;
      
      &.inactive {
        cursor: auto;
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

    .dw-arrow-yellow,
    .format {
      color: #fee7a3;
    }

    .icon-convert {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 10px;
      vertical-align: middle;
      background: url('../assets/icon-convert.png') 0 0 no-repeat;
    }
  }

  .error-message {
    position: absolute;
    top: 240px;
    left: 50%;
    width: 650px;
    max-height: 100px;
    overflow-y: auto;
    transform: translateX(-50%);
    word-break: break-all;
  }
</style>
