<template>
  <div class="switch-container">
    <label class="switch">
      <input
        type="checkbox"
        :checked="checked"
        @change="toggleSwitch"
      />
      <span class="slider round" />
    </label>
  </div>
</template>

<script lang="ts" setup>
/*REFS*/
const props = defineProps({
  checked: { type: Boolean, required: true },
})

/*EMIT*/
const emit = defineEmits(['update:checked'])

/*METHODS*/
const toggleSwitch = () => {
  emit('update:checked', !props.checked)
}
</script>

<style scoped>
.switch-container {
  display: inline-block;
}

.switch {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--grey-400);
  transition: 0.2s;
}

.slider::before {
  position: absolute;
  content: '';
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 3px;
  background-color: var(--white);
  transition: 0.2s;
}

input:checked + .slider {
  background-color: var(--blue);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--blue);
}

input:checked + .slider::before {
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round::before {
  border-radius: 50%;
}
</style>
