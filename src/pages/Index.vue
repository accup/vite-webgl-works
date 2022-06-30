<script setup lang="ts">
const works = import.meta.glob("../works/**/Index.vue");

function extractNameFromPath(path: string) {
    return /\.\.\/works\/(.*)\/Index.vue/.exec(path)?.[1];
}
</script>


<template>
    <ul>
        <template v-for="(_, path) in works">
            <router-link :to="`/works/${extractNameFromPath(path)}`">
                <li>{{ extractNameFromPath(path) }}</li>
            </router-link>
        </template>
    </ul>
</template>