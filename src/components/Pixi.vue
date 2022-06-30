<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as PIXI from "pixi.js";

const props = defineProps<{
  vert?: string,
  frag?: string,
}>();

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const app = new PIXI.Application({ view: canvas.value, resizeTo: window });

  const filter = new PIXI.Filter(props.vert, props.frag, {
    uTime: 0.0,
    uMouse: new PIXI.Point(),
    uScreen: new PIXI.Point(),
  });

  app.stage.filterArea = app.renderer.screen;
  app.stage.filters = [filter];
  app.stage.interactive = true;

  let totalTime = 0.0;
  app.ticker.add(function (delta) {
    for (const sprite of app.stage.children) {
      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;
    }

    filter.uniforms.uTime = totalTime;
    filter.uniforms.uMouse.copyFrom(
      new PIXI.Point(
        app.renderer.plugins.interaction.mouse.global.x,
        app.screen.height - app.renderer.plugins.interaction.mouse.global.y
      )
    );
    filter.uniforms.uScreen.copyFrom(
      new PIXI.Point(app.screen.width, app.screen.height)
    );
    totalTime += delta / 60;
  });
});
</script>

<template>
  <canvas ref="canvas">お使いのブラウザでは Canvas を利用できません。</canvas>
</template>