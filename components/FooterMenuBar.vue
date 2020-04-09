<template>
  <div class="fixedfooter">
    <div class="tw icon">t</div>
    <div class="fb icon">f</div>
    <div class="hb icon">B!</div>
    <div class="line icon">line</div>
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
  position: fixed;
  bottom: 0;
  height: 50px;
  height: calc(50px + env(safe-area-inset-bottom));
  width: 100%;
  display: flex;
  z-index: 998;
}
.icon {
  height: 100%;
  width: calc(100% / 4);
  line-height: 50px;
  line-height: calc(50px + env(safe-area-inset-bottom));
  text-align: center;
  color: white;
  font-weight: bold;
}
.tw {
  background: #00aced;
  font-size: 40px;
}
.fb {
  background: #305097;
  font-size: 37px;
}
.hb {
  background: #008fde;
  font-size: 32px;
}
.line {
  background: #5ae628;
  font-size: 29px;
}
</style>