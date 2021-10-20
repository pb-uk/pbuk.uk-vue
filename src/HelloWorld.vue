<template>
  <h3>
    Hello World x{{ counter }} <app-button @click="increment">+</app-button>
  </h3>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const counter = ref(0);
    return {
      counter,
      increment: () => {
        ++counter.value;
      },
    };
  },
};
</script>
