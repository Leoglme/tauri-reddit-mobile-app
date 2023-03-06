<template>
  <div class="d-flex column gap-2 w-full relative">
    <label class="font-semibold text-grey-800" v-if="label" :for="props.id">{{ label }}</label>

    <Field
        :as="rows ? 'textarea' : undefined"
        :rows="rows"
        :rules="rules"
        class="h-full"
        v-model="valueRef"
        :validateOnInput="true"
        v-slot="{meta, field}"
        :name="props.id"
        :placeholder="props.placeholder">
      <div class="relative">
        <MagnifyIcon fill-color="var(--grey-700)" class="search__input--icon" v-if="type === 'search'"/>
        <span v-if="prefix" class="prefix text-grey-700">{{prefix}}</span>
        <input ref="input" class="input pr-3 py-2 w-full bg-grey-200 text-grey-800"
               :style="[hasIcon ? 'padding-left: 40px' : null, round ? '--radius: 50px' : null]" v-bind="field" :type="typeRef"
               :id="props.id"
               :placeholder="props.placeholder"
               :class="[(meta.validated && !meta.valid ? 'error': null), (type === 'search' ? 'pl-9' : 'pl-3'), (prefix ? 'pl-5' : 'pl-3')]">
        <div class="relative-items flex items-center gap-2">
          <span v-if="maxCharacter">{{ maxCharacter - valueRef.length }}</span>
          <CloseCircleOutline fill-color="var(--grey-700)" @click="valueRef = ''" class="close-icon cursor-pointer" v-if="showReset" :size="20"/>

          <div class="toggle-password"
               v-if="type === 'password'"
               @click.prevent="handleTogglePassword">
            <Eye fill-color="var(--grey-700)" :size="20" v-if="!togglePassword" title="Afficher le mot de passe" fill="var(--grey-200)" />
            <EyeOff fill-color="var(--grey-700)" :size="20" v-if="togglePassword" title="Masquer le mot de passe" fill="var(--grey-200)" />
          </div>
        </div>
      </div>
    </Field>

    <ErrorMessage class="text-red" :name="props.id" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, watch } from "vue";
import { ErrorMessage, Field } from "vee-validate";
import Eye from 'vue-material-design-icons/Eye.vue';
import EyeOff from 'vue-material-design-icons/EyeOff.vue';
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
/*PROPS*/
const props = defineProps({
  type: { type: String, default: "text" },
  id: { type: String, default: "field" },
  value: { type: String, default: "" },
  label: { type: String, default: null },
  rows: { type: Number, default: null },
  rules: { type: String, default: null },
  prefix: { type: String, default: null },
  showReset: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  placeholder: { type: String, default: null }
});

/*REFS*/
const valueRef = ref(props.value);
const togglePassword = ref(false);
const typeRef = ref(props.type);
const maxCharacter = ref();

if (props.rules?.includes("max")){
  const regex = /(\d+)/;
  const match = regex.exec(props.rules);
  maxCharacter.value = match && parseInt(match[0])
}

/*ACTIONS*/
const handleTogglePassword = () => {
  togglePassword.value = !togglePassword.value;
  typeRef.value = togglePassword.value ? "text" : "password";
};
/*EMIT*/
const emit = defineEmits(["update:value"]);

/*WATCH*/
watch(() => valueRef.value, (val) => {
  emit("update:value", val);
});
watch(() => props.value, (val) => {
  valueRef.value = val;
});

/*SLOT*/
const slot = useSlots();
const hasIcon = !!slot["default"];
</script>

<style lang="scss">
.prefix {
  position: absolute;
  top: 10px;
  left: 8px;
}

.search__input--icon {
  position: absolute;
  bottom: 8px;
  left: 8px;
}

.relative-items {
  position: absolute;
  bottom: 10px;
  right: 12px;
}
.toggle-password {
  cursor: pointer;
}
.toggle-password, .close-icon {
  & svg:hover path {
    fill: var(--grey-800);
  }
  & svg:active path {
    fill: var(--grey-700);
  }
}

.input {
  border-radius: var(--radius);
  border: 2px solid transparent;
  transition: border 0.1s ease-in;

  &.error {
    border-color: var(--red);
  }

  &:hover:not(.error) {
    border-color: var(--grey-500)
  }
  &:focus:not(.error) {
    border-color: var(--primary)
  }

}
</style>
