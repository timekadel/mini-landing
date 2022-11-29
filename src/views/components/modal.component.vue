<template>
  <div class="wrapper fixed top-0 left-0 h-full w-full">
    <div class="modal">
      <h1 v-if="content.title">{{ content.title }}</h1>
      <h3 v-if="content.text">{{ content.text }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    displayState: Object,
    content: {
      type: Object,
      default: () => ({
        title: "No Title",
        text: "No Text",
        actions: {
          submit: {
            text: "No Text",
            callback: () => {},
          },
          cancel: {
            text: "No Text",
            callback: () => {},
          },
        },
      }),
    },
  },
  methods: {
    close() {},
  },
};
</script>

<style scoped>
.wrapper {
  background: rgba(0, 0, 0, 0.2);
}
.modal {
  background: rgb(0, 0, 0);
}
</style>
