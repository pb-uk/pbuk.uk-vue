<template>
  <div></div>
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue';

export default defineComponent({
  emits: ['loaded'],

  setup(props, { emit }) {
    onMounted(() => {
      // Emit the real (not shadow) DOM element.
      emit('loaded', getCurrentInstance().ctx.$el);
    });
  },
});
</script>
