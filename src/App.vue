<template>
  <layout>
    <router-view/>
  </layout>
</template>

<script setup>
import {ref, provide} from "vue";
import Layout from "@/components/layout/Layout.vue";

const gp = {
  mainTitle: ref('LEEHX78')
};

provide('$gp', gp);
</script>

<style lang="scss">
#app { overflow: hidden; display: flex; flex-direction: column;}
</style>
