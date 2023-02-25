<template>
  <div class="loader">
    <div class="center-spin"></div>
    <div class="inner-spin">
      <div class="inner-arc inner-arc_start-a"></div>
      <div class="inner-arc inner-arc_end-a"></div>

      <div class="inner-arc inner-arc_start-b"></div>
      <div class="inner-arc inner-arc_end-b"></div>
      <div class="inner-moon-a"></div>
      <div class="inner-moon-b"></div>

    </div>
    <div class="outer-spin">
      <div class="outer-arc outer-arc_start-a"></div>
      <div class="outer-arc outer-arc_end-a"></div>

      <div class="outer-arc outer-arc_start-b"></div>
      <div class="outer-arc outer-arc_end-b"></div>
      <div class="outer-moon-a"></div>
      <div class="outer-moon-b"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: relative;
  --center: translate(-50%, -50%);
  --spinner: var(--primary);
}

.center-spin {
  position: absolute;
  width: 30px;
  height: 30px;
  background: var(--spinner);
  border-radius: 50%;
  transform: var(--center);
}
.outer-spin, .inner-spin {
  position: absolute;
}
.outer-spin {
  animation: spin 4s linear infinite;
}
.outer-arc, .inner-arc {
  position: absolute;
  border-radius: 50%;
  border: 4px solid;
}
.outer-arc {
  width: 100px;
  height: 100px;
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
  width: 15px;
  height: 15px;
  background: var(--spinner);
  border-radius: 50%;
  left: -4px;
  transform: var(--center) translate(52px, 0);
}
.outer-moon-b {
  position: absolute;
  width: 15px;
  left: 4px;
  height: 15px;
  background: var(--spinner);
  border-radius: 50%;
  transform: var(--center) translate(-52px, 0);
}
.inner-spin {
  animation: spin 3s linear infinite;
}
.inner-arc {
  width: 62px;
  height: 62px;
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
  width: 12px;
  height: 12px;
  background: var(--spinner);
  border-radius: 50%;
  left: -4px;
  transform: var(--center) translate(33px, 0);
}
.inner-moon-b {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--spinner);
  border-radius: 50%;
  left: 4px;
  transform: var(--center) translate(-33px, 0);
}

</style>
