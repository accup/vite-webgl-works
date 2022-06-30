<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';

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
  () => import(makeWorkModulePath(route.params.names))
);
</script>

<template>
  <Work />
</template>
