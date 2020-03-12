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
    <div v-for="hitQuestion in hits" :key="hitQuestion._id" class="flex items-center justify-between py-2 px-2">
      <div>
        {{ hitQuestion._source.title }}
      </div>
    </div>
    <!-- あとでHTMLのテンプレートにいれる -->
    <script type="text/javascript" src="https://www.draw.io/js/viewer.min.js"></script>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

// FIXME:pluginでnuxtコンテキストに入れる
const { Client } = require('elasticsearch')
const client = new Client({ host: 'localhost:9200' })

// FIXME:共通関数的なところに入れる
const escape_html = string => {
  console.log(`escape_html`, string)
  if(typeof string !== 'string') {
    console.log(`no escape_html`)
    return string;
  }
  return string.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

export default {
  components: {
    Logo
  },
  data() {
    return {
      title: 'Hello World!!!',
      tags: 'hello world tag sample',
      markdownText: `
# Hello MarkdownIt!!!

\`\`\`sh
### Hello
echo "Hello!"
\`\`\`

\`\`\`drawio
<mxfile modified="2020-03-10T05:19:40.758Z" host="www.draw.io" agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36" etag="-SZX1vSNL_npI-tu-96B" version="12.8.1" type="device"><diagram id="f106602c-feb2-e66a-4537-3a34d633f6aa" name="Page-1">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</diagram></mxfile>
\`\`\`
`,
      hits: []
    }
  },
  created() {
    this.$md.use((md, opts) => {
      console.log(`start`, md, opts);
      const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);
      console.log(`defaultRenderer`, defaultRenderer);
      md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
        console.log(`start fence`, tokens, idx, opts, env, self);
        const token = tokens[idx];
        console.log(`token`, token);
        if (token.info === "drawio") {
          // const jm = new jsMind({
          //   container: "jsmind_container",
          //   theme: "orange",
          //   editable: true,
          //   support_html: false,
          //   view: { engine: `svg` }
          // });
          // jm.show(JSON.parse(token.content.trim()));
          // console.log(`jsmind`, jm);
          const mxGraphData = {
            "highlight": "#0000ff",
            "nav": true,
            "resize": true,
            "toolbar": "zoom layers lightbox",
            "edit": "_blank",
            "xml": token.content.trim()
          }
          const mxGraphDataEscape = escape_html(JSON.stringify(mxGraphData))
          console.log(`mxGraphDataEscape`, mxGraphDataEscape)
          const mxGraphHtml = `
<div class="mxgraph" style="max-width: 100%; border: 1px solid transparent;" data-mxgraph="${mxGraphDataEscape}"></div>
`
          return mxGraphHtml;
        }
        return defaultRenderer(tokens, idx, opts, env, self);
      };
    });
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
        body: {
          query: {
            match: { tags: 'hello' }
          }
        },
        type:	`questions`
      })
      console.log(`search complete!!!`, result)
      this.hits = result.hits.hits
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
