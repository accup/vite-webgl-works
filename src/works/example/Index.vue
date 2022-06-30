<script setup lang="ts">
import Pixi from '../../components/Pixi.vue';
import frag from './shader.frag?raw';
</script>

<template>
  <Pixi :frag="frag" />
</template>
