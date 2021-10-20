<template>
  <button :class="cls"><slot></slot></button>
</template>

<script>
import { defineComponent } from 'vue';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  warning: 'btn-warning',
  danger: 'btn-danger',
};

export default defineComponent({
  props: {
    variant: {
      type: [String, Boolean],
      default: false,
    },
  },

  setup(props) {
    const cls = ['btn'];

    if (props.variant) {
      cls.push(variants[props.variant] || props.variant);
    }

    return {
      cls: cls.join(' '),
    };
  },
});
</script>
