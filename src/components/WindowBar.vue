<template>
  <div data-tauri-drag-region class="titlebar">
    <div class="titlebar-button" id="titlebar-minimize">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="#85868a" stroke="#85868a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </div>

    <!--<div class="titlebar-button" id="titlebar-maximize">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#85868a" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      </svg>
    </div>-->

    <div class="titlebar-button" id="titlebar-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="#85868a" stroke="#85868a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .titlebar {
    height: 150px;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .titlebar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 31px;
    height: 22px;
    border-top: 2px solid #36383e;
  }

  #titlebar-minimize:hover {
    background: #23252b;
    & svg {
      stroke: #ffff;
    }
  }

  #titlebar-close {
    border-right: 2px solid #36383e;
  }

  #titlebar-close:hover {
    background: #dd1313;
    & svg {
      stroke: #ffff;
    }
  }

  #titlebar-close {
    margin-left: 5px;
  }
</style>