<template>
  <div class="p-2">
    <Breadcrumbs :items="[
    { label: 'プロジェクト名', url: '#' },
    { label: '案件名', url: '#' },
    { label: 'プロダクトバックログ名', url: '#' },
    { label: 'スプリントバックログ', url: '#' },
    ]" />
    <div class="board">
      <draggable
        id="first"
        data-source="juju"
        :list="list"
        draggable=".card"
        group="a"
        class="card-group bg-blue-300"
      >
        <div
          v-for="element in list"
          :key="element.name"
          class="card"
          @click="show"
        >
          <div>{{ element.name }}</div>
          <div>完了の定義</div>
          <!--div>細分化タスク１</div>
          <div>細分化タスク２</div>
          <div>細分化タスク３</div-->
          <div class="icon">5</div>
        </div>
        <div slot="header" class="card-group-header">
          <h3 class="title">TODO</h3>
          <div class="icon" @click="add">➕</div>
        </div>
      </draggable>
      <draggable
        id="first"
        data-source="juju"
        :list="list"
        draggable=".card"
        group="a"
        class="card-group bg-blue-300"
      >
        <div
          v-for="element in list"
          :key="element.name"
          class="card"
          @click="showDialog"
        >
          <div>{{ element.name }}</div>
          <div>完了の定義</div>
          <!--div>細分化タスク１</div>
          <div>細分化タスク２</div>
          <div>細分化タスク３</div-->
          <div class="icon">5</div>
        </div>
        <div slot="header" class="card-group-header">
          <h3 class="title">1Week</h3>
          <div class="icon" @click="add">➕</div>
        </div>
      </draggable>
      <draggable
        :list="list2"
        draggable=".card"
        group="a"
        class="card-group bg-indigo-300"
      >
        <div
          v-for="element in list2"
          :key="element.name"
          class="card"
          @click="showModalComponent"
        >
          <div>{{ element.name }}</div>
          <div>完了の定義</div>
          <!--div>細分化タスク１</div>
          <div>細分化タスク２</div>
          <div>細分化タスク３</div-->
          <div class="icon">5</div>
        </div>
        <div slot="header" class="card-group-header">
          <h3 class="title">DOING</h3>
          <div class="icon" @click="add2">➕</div>
        </div>
      </draggable>
      <draggable
        :list="list3"
        draggable=".card"
        group="a"
        class="card-group bg-gray-400"
      >
        <div
          v-for="element in list3"
          :key="element.name"
          class="card"
        >
          <div>{{ element.name }}</div>
          <div>完了の定義</div>
          <!--div>細分化タスク１</div>
          <div>細分化タスク２</div>
          <div>細分化タスク３</div-->
          <div class="icon">5</div>
        </div>
        <div slot="header" class="card-group-header">
          <h3 class="title">DONE</h3>
          <div class="icon" @click="add3">➕</div>
        </div>
      </draggable>
    </div>
    <Balloons class="mt-2" :items="[
    { id: 1, name: 'A', message: '成果物と目的の差分は〜だよ！', my: true },
    { id: 2, name: 'A', message: '差分の理由は〜だよ！', my: true },
    { id: 3, name: 'B', message: 'フィードバックは〜だよ！！', my: false },
    { id: 4, name: 'A', message: '感謝！次からは気をつけるよ！', my: true },
    ]" />
    <modal name="hello-world">
      hello, world!
    </modal>
    <nuxt-link to="/works">投稿＆全文検索のサンプルへ飛ぶ</nuxt-link>
    <nuxt-link to="/reports">個別ページのサンプルへ飛ぶ</nuxt-link>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import Balloons from '~/components/Balloons.vue'

export default {
  components: {
    draggable,
    Breadcrumbs,
    Balloons
  },
  data() {
    return {
      id: 6,
      list: [
        { name: "スプリント１", id: 0 },
        { name: "スプリント２", id: 1 },
        { name: "スプリント３", id: 2 }
      ],
      list2: [
        { name: "スプリント４", id: 3 },
        { name: "スプリント５", id: 4 }
      ],
      list3: [
        { name: "スプリント６", id: 5 },
        { name: "スプリント７", id: 6 }
      ]
    }
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan1 " + this.id, id: this.id++ })
    },
    replace: function() {
      this.list = [{ name: "Edgard1", id: this.id++ }]
    },
    add2: function() {
      this.list2.push({ name: "Juan2 " + this.id, id: this.id++ })
    },
    replace2: function() {
      this.list2 = [{ name: "Edgard2", id: this.id++ }]
    },
    add3: function() {
      this.list3.push({ name: "Juan3 " + this.id, id: this.id++ })
    },
    replace3: function() {
      this.list3 = [{ name: "Edgard3", id: this.id++ }]
    },
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    showDialog () {
      this.$modal.show('dialog', {
        title: 'Alert!',
        text: 'You are too awesome',
        buttons: [
          {
            title: 'Deal with it',
            handler: () => { alert('Woot!') }
          },
          {
            title: '',       // Button title
            default: true,    // Will be triggered by default if 'Enter' pressed.
            handler: () => {} // Button click handler
          },
          {
            title: 'Close'
          }
        ]
      })
    },
    showModalComponent () {
      this.$modal.show(Logo, {
        text: 'This text is passed as a property'
      }, {
        draggable: true
      })
    }
  }
}
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
