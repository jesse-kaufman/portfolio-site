<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :id="name"
      v-model="inputValue"
      v-bind="$attrs"
      :name="name"
      :type="type"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["update:modelValue"])
const inputValue = ref(props.modelValue)

const updateValue = (event) => {
  inputValue.value = event.target.value
  emit("update:modelValue", inputValue.value)
}
</script>
