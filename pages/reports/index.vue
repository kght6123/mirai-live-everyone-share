<template>
  <div class="p-2 relative">
    <Breadcrumbs class="mb-2" :items="[
    { label: 'kght6123', url: '#' },
    { label: '2020/04', url: '#' },
    { label: '4/6週', url: '#' },
    { label: '4/9(木)', url: '#' },
    ]" />
    <div class="flex flex-col">
      <div class="slide bg-blue-300">
        <h3 class="slide-title">スクラムタスク
          <div class="icon">➕</div>
        </h3>
        <div class="table">
          <div class="card">Pバックログ名</div>
          <div class="card">Sバックログ名</div>
          <div class="card">完了の定義</div>
          <div class="card">細分化タスク</div>
          <div class="card">予定</div>
          <div class="card">実績</div>
          <div class="card">進捗</div>
          <div class="card">FBなど</div>
          <div class="card">Pバックログ名</div>
          <div class="card">Sバックログ名</div>
          <div class="card">完了の定義</div>
          <div class="card">細分化タスク</div>
          <div class="card">予定</div>
          <div class="card">実績</div>
          <div class="card">進捗</div>
          <div class="card">FBなど</div>
        </div>
      </div>
      <div class="slide bg-indigo-300">
        <h3 class="slide-title">定期タスク
          <div class="icon">➕</div>
        </h3>
        <div class="table">
          <div class="card">完了の定義</div>
          <div class="card">細分化タスク</div>
          <div class="card">予定</div>
          <div class="card">実績</div>
          <div class="card">進捗</div>
          <div class="card">FBなど</div>
          <div class="card">完了の定義</div>
          <div class="card">細分化タスク</div>
          <div class="card">予定</div>
          <div class="card">実績</div>
          <div class="card">進捗</div>
          <div class="card">FBなど</div>
        </div>
      </div>
    </div>
    <!--nuxt-link to="/">戻る</nuxt-link-->
    <Balloons class="mt-2" :items="[
    { id: 1, name: 'A', message: '成果物と目的の差分は〜だよ！', my: true },
    { id: 2, name: 'A', message: '差分の理由は〜だよ！', my: true },
    { id: 3, name: 'B', message: 'フィードバックは〜だよ！！', my: false },
    { id: 4, name: 'A', message: '感謝！次からは気をつけるよ！', my: true },
    ]" />
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Balloons from '~/components/Balloons.vue'

export default {
  components: { Breadcrumbs, Balloons },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
