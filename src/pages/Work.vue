<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

const works = import.meta.glob('../works/**/Index.vue');

function makeWorkModulePath(names: string | string[]) {
  let workPathPart;
  if (typeof names === 'string') {
    workPathPart = names;
  } else {
    workPathPart = names.join('/');
  }
  return `../works/${workPathPart}/Index.vue`;
}

const route = useRoute();
const Work = defineAsyncComponent(
  works[makeWorkModulePath(route.params.names)]
);
</script>

<template>
  <Work />
</template>
