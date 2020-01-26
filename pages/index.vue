<template>
  <div class="h-screen">
    <div class="flex h-10 p-1">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-400 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" v-model="title">
    </div>
    <div class="flex h-10 p-1">
      <input class="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-400 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Tags" v-model="tags">
    </div>
    <div class="flex h-64 py-2 px-3">
      <div class="w-1/2 bg-gray-400 h-full" v-html="$md.render(markdownText)"></div>
      <textarea class="w-1/2 bg-gray-400 h-full" v-model="markdownText"></textarea>
    </div>
    <div class="flex items-center justify-between p-1">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline" type="button">
        投稿
      </button>
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
      title: 'Hello World!!!',
      tags: 'hello world tag sample',
      markdownText: '# Hello MarkdownIt!!!\n```sh\n### Hello\necho "Hello!"\n```\n'
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
