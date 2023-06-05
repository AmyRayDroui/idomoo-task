<template>
  <div class="flex flex-col">
    <label :for="id" class="pl-4">{{ labelText }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      class="bg-inputBg w-full p-3 rounded-lg"
    >
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    id: String,
    labelText: String,
    options: Array,
    modelValue: String,
    type: String,
  },
};
</script>
