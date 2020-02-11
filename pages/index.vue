<template>
  <div class="h-screen">
    <div class="flex h-10 py-1 px-2">
      <input class="w-full py-2 px-3 leading-tight" type="text" placeholder="Title" v-model="title">
    </div>
    <div class="flex h-10 py-1 px-2">
      <input class="w-full py-2 px-3 leading-tight" type="text" placeholder="Tags" v-model="tags">
    </div>
    <div class="flex h-64 py-1 px-2">
      <div class="w-1/2 py-2 px-3 h-full" v-html="$md.render(markdownText)"></div>
      <textarea class="w-1/2 py-2 px-3 h-full" v-model="markdownText"></textarea>
    </div>
    <div class="flex items-center justify-between py-2 px-2">
      <button class="py-2 px-4 w-full rounded" type="button" @click="registQuestion">
        投稿する
      </button>
    </div>
    <div class="flex items-center justify-between py-2 px-2">
      <button class="py-2 px-4 w-full rounded" type="button" @click="searchQuestion">
        検索する
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

// FIXME:pluginでnuxtコンテキストに入れる
const { Client } = require('elasticsearch')
const client = new Client({ host: 'localhost:9200' })

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
  },
  methods: {
    async registQuestion() {
      const res = await this.$axios.$post(
        '/api/question/regist',
        // `/api/test`,
        { title: this.title, tags: this.tags, body: this.markdownText }
      )
      console.log(`regist complete!!!`, res)
    },
    async searchQuestion() {
      const result = await client.search({
        index: 'admin',
        // body: { foo: 'bar' }
        // _type	questions
      })
      console.log(`search complete!!!`, result)
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
