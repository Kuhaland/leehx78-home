<template>
  <router-view/>
</template>

<script setup>
import {ref, provide} from "vue";

const gp = {
  mainTitle: ref('LEEHX78')
};

provide('$gp', gp);
</script>

<style lang="scss">
#app { display: flex; flex-direction: column; width: 100%; height: 100%;}
</style>
