<template>
  <nav class="text-black font-bold text-xs" aria-label="Breadcrumb">
    <ol class="list-none p-0 inline-flex">
      <li class="flex items-center">
        <a href="/">Home</a>
      </li>
      <li v-for="(item, index) in items" :key="item.label" class="flex items-center">
        <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
        <a v-if="index !== items.length - 1" :href="item.url">{{ item.label }}</a>
        <a v-if="index === items.length - 1" :href="item.url" class="text-gray-500" aria-current="page">{{ item.label }}</a>
      </li>
    </ol>
  </nav>
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