<template>
  <div class="layout-main">
    <div class="layout-main-content" v-for="n in 100">
      dfasfdafdsafs
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "Index" });

</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.layout-main {
  display: flex; flex-direction: column; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
