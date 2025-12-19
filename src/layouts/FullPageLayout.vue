<template>
  <div class="full-page-layout">
    <slot />
  </div>
</template>

<style scoped>
.full-page-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
</style>
