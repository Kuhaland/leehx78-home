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
#app { overflow: hidden; display: flex; flex-direction: column;}
</style>
