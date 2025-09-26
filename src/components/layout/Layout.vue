<template>
  <div class="layout">
    <Header />
    <main class="layout-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

defineOptions({ name: "Layout" })
</script>

<style scoped lang="scss">
.layout {
  display: flex; flex-direction: column; min-height: 100vh;
  &-content { display: flex; flex: 1 }
}
</style>
