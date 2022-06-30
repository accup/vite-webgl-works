<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
    <main :key="$route.path">
        <router-view />
    </main>
</template>