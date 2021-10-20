export default {
  template: `<button class="btn">~<slot></slot>~</button>`,

  props: {
    variant: {
      type: [String, Boolean],
      default: false,
    },
    title: null,
  },

  setup() {
    const cls = [];
    return {
      cls: cls.join(' '),
    };
  },

  methods: {
    click(event) {
      this.$emit('click', { name: 'click', event });
    },
  },
};
