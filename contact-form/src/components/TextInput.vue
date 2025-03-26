<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      v-model="inputValue"
      v-bind="$attrs"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, useAttrs } from "vue"

// Props definition
const props = defineProps({
  type: { type: String, default: "text" },
  modelValue: { type: String, default: "" },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  validation: { type: Function, default: null },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:modelValue"])
const inputValue = ref(props.modelValue)

// Access $attrs
const inputAttrs = useAttrs() // This will get the $attrs
console.log(useAttrs())
const updateValue = (event) => {
  const newValue = event.target.value
  if (props.validation && !props.validation(newValue)) {
    // handle invalid input
  } else {
    emit("update:modelValue", newValue)
  }
}
const $attrs = useAttrs()
console.log($attrs)
</script>
