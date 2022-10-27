<template>
  <nut-swipe>
    <nut-cell round-radius="0" :desc="data.name" />
    <template #right>
      <nut-button
        @tap="() => emitEvent('edit', data.name, data.id)"
        style="height:100%"
        shape="square"
        type="info"
        >编辑</nut-button
      >
      <nut-button
        @tap="() => emitEvent('delete', data.name, data.id)"
        style="height:100%"
        shape="square"
        type="danger"
        >删除</nut-button
      >
    </template>
  </nut-swipe>
</template>

<script setup>
const props = defineProps({
  data: Object
});

console.log('???',props.data);
const emit = defineEmits(["dispatch"]);
const emitEvent = (action, name, id) => {
  emit("dispatch", action, name, id);
};
</script>
