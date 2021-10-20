<template>
  <div class="alert alert-warning show fade" :class="cls" role="alert">
    <div v-if="title" class="alert-heading h3">{{ title }}</div>
    <slot></slot>
    <button
      @click="dismiss"
      v-if="dismissible"
      type="button"
      class="btn-close"
      xdata-bs-dismiss="alert"
      aria-label="Close"
    >
      x
    </button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    dismissible: { type: Boolean, default: false },
    variant: { type: [String, Boolean], default: 'Woo' },
    title: null,
  },

  emits: ['dismissed'],

  setup(props, { emit }) {
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
