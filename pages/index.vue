<template>
  <div class="container">
    <div>
      <logo />
      <div v-html="$md.render(markdownText)"></div>
      <textarea v-model="markdownText"></textarea>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      markdownText: '# Hello MarkdownIt!!!'
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
