<template>
  <div>
    <v-dialog/>
    <modals-container/>
    <FooterMenuBar :items="[
    { label: 'kght6123', url: '#' },
    { label: '2020/04', url: '#' },
    { label: '4/6週', url: '#' },
    { label: '4/9(木)', url: '#' },
    ]" />
    <nuxt />
  </div>
</template>

<script>
import FooterMenuBar from '~/components/FooterMenuBar.vue'

export default {
  components: { FooterMenuBar },
  data() {
    return {}
  },
  methods: {}
}
</script>
