<template>
  <div :class="$style.layout">
    <slot />
  </div>
</template>

<style module>
.layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
}
</style>
