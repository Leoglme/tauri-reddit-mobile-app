<template>
  <div class="loader">
    <div class="center-spin" />
    <div class="inner-spin">
      <div class="inner-arc inner-arc_start-a" />
      <div class="inner-arc inner-arc_end-a" />

      <div class="inner-arc inner-arc_start-b" />
      <div class="inner-arc inner-arc_end-b" />
      <div class="inner-moon-a" />
      <div class="inner-moon-b" />
    </div>
    <div class="outer-spin">
      <div class="outer-arc outer-arc_start-a" />
      <div class="outer-arc outer-arc_end-a" />

      <div class="outer-arc outer-arc_start-b" />
      <div class="outer-arc outer-arc_end-b" />
      <div class="outer-moon-a" />
      <div class="outer-moon-b" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$size: 60px;
$outer-moon-left: 24px;
$inner-moon-left: 16px;

.loader {
  position: relative;
  --center: translate(-50%, -50%);
  --spinner: var(--primary);
}

.center-spin {
  position: absolute;
  width: calc($size / 3.33);
  height: calc($size / 3.33);
  background: var(--spinner);
  border-radius: 50%;
  transform: var(--center);
}
.outer-spin,
.inner-spin {
  position: absolute;
}
.outer-spin {
  animation: spin 3.5s linear infinite;
}
.outer-arc,
.inner-arc {
  position: absolute;
  border-radius: 50%;
  border: 4px solid;
}
.outer-arc {
  width: $size;
  height: $size;
}
.outer-arc_start-a {
  border-color: transparent transparent transparent var(--spinner);
  transform: var(--center) rotate(65deg);
}
.outer-arc_end-a {
  border-color: var(--spinner) transparent transparent transparent;
  transform: var(--center) rotate(45deg);
}
.outer-arc_start-b {
  border-color: transparent transparent transparent var(--spinner);
  transform: var(--center) rotate(65deg) scale(-1, -1);
}
.outer-arc_end-b {
  border-color: var(--spinner) transparent transparent transparent;
  transform: var(--center) rotate(45deg) scale(-1, -1);
}

.outer-moon-a {
  position: absolute;
  width: calc($size / 6.67);
  height: calc($size / 6.67);
  background: var(--spinner);
  border-radius: 50%;
  left: -$outer-moon-left;
  transform: var(--center) translate(52px, 0);
}
.outer-moon-b {
  position: absolute;
  width: calc($size / 6.67);
  left: $outer-moon-left;
  height: calc($size / 6.67);
  background: var(--spinner);
  border-radius: 50%;
  transform: var(--center) translate(-52px, 0);
}
.inner-spin {
  animation: spin 2.5s linear infinite;
}
.inner-arc {
  width: calc($size / 1.62);
  height: calc($size / 1.62);
}
.inner-arc_start-a {
  border-color: transparent transparent transparent var(--spinner);
  /*NOTE: the order here very much matters!  */
  transform: var(--center) rotate(65deg);
}
.inner-arc_end-a {
  border-color: var(--spinner) transparent transparent transparent;
  transform: var(--center) rotate(45deg);
}
.inner-arc_start-b {
  border-color: transparent transparent transparent var(--spinner);
  transform: var(--center) rotate(65deg) scale(-1, -1);
}
.inner-arc_end-b {
  border-color: var(--spinner) transparent transparent transparent;
  transform: var(--center) rotate(45deg) scale(-1, -1);
}
.inner-moon-a {
  position: absolute;
  width: calc($size / 8.3);
  height: calc($size / 8.3);
  background: var(--spinner);
  border-radius: 50%;
  left: -$inner-moon-left;
  transform: var(--center) translate(33px, 0);
}
.inner-moon-b {
  position: absolute;
  width: calc($size / 8.3);
  height: calc($size / 8.3);
  background: var(--spinner);
  border-radius: 50%;
  left: $inner-moon-left;
  transform: var(--center) translate(-33px, 0);
}
</style>
