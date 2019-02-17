<template>
  <div class="information">
    <p>
      <h4 class="emphasised">Supported sites?</h4>
      <div>YouTube, SoundCloud, Vimeo, DailyMotion <span class="comment">- more coming soon..</span></div>
    </p>
    <p>
    <h4 class="emphasised">How does it work?</h4>
    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since</div>
    </p>
    <p>
      <h4 class="emphasised">What makes us the best?</h4>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown..</div>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Information'
}
</script>

<style scoped lang="scss">
  .information {
    margin: auto;
    width: 520px;
    font-size: 1.6rem;
    text-align: left;

    p {
      margin: 30px 0;
    }

    h4 {
      font-size: 1.7rem;
      margin: 10px 0;
    }
  }
</style>
