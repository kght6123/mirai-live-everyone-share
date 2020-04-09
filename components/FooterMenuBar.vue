<template>
  <div class="fixedfooter">
    <div class="icon">ttt</div>
    <div class="icon">fff</div>
    <div class="icon">B!B!</div>
    <div class="icon">line</div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type     : Array,
      require  : false,
      default: () => []
    },
  }
}
</script>

<style>
body {
  padding-bottom: 50px;
}
</style>

<style scoped>
.fixedfooter {
  @apply bg-gray-200 rounded-lg p-2 m-2;
  position: fixed;
  bottom: 0;
  height: 75px;
  height: calc(75px + env(safe-area-inset-bottom));
  width: 100%;
  display: flex;
  z-index: 998;
  /* backdrop-filter: blur(7px); */
  /* background: rgba(255, 255, 255, 0.1); */
  box-shadow:
  0 0px 2px rgba(0, 0, 0, 0.034),
  0 0px 4.8px rgba(0, 0, 0, 0.048),
  0 0px 9px rgba(0, 0, 0, 0.06),
  0 0px 16.1px rgba(0, 0, 0, 0.072),
  0 0px 30.1px rgba(0, 0, 0, 0.086),
  0 0px 72px rgba(0, 0, 0, 0.12)
;
}
.icon {
  @apply text-indigo-600 rounded-lg;
  height: 100%;
  width: calc(100% / 4);
  line-height: 50px;
  line-height: calc(50px + env(safe-area-inset-bottom));
  text-align: center;
  font-size: 12px;
}
.icon:hover, .icon:active, .icon:focus {
  @apply bg-indigo-200;
  /* background-color: rgba(255, 255, 255, 0.75); */
}
</style>