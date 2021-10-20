<template>
  <div></div>
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue';

import { DynamicPlot2d } from './index';

export default defineComponent({
  emits: ['loaded'],

  setup(props, { emit }) {
    onMounted(() => {
      // Get the real (not shadow) DOM element.
      const { $el } = getCurrentInstance().ctx;
      emit('loaded', (options) => new DynamicPlot2d($el, options));
    });

    const cls = [];
    if (props.dismissible) {
      cls.push('alert-dismissible');
    }
    return {
      cls: cls.join(' '),
      dismiss(event) {
        emit('dismissed', { name: 'dismissed', event });
      },
    };
  },
});
</script>
