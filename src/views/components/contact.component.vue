<template>
  <div
    id="contact"
    class="pt-20 pb-16 text-center items-center flex flex-col max-w-xs sm:max-w-xl md:max-w-3xl gap-y-8 lg:max-w-4xl xl:max-w-6xl md:w-1/2 xl:gap-y-12"
  >
    <h1 :class="{ 'text-white': !content.light }" class="z-10 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold text-opacity-90">
      {{ content.title }}
    </h1>
    <h3 :class="{ 'text-white': !content.light }" class="text-center z-10 text-xl sm:text-2xl xl:text-3xl max-w-3xl font-thin text-opacity-90">
      Don't be shy, get in touch with me.
    </h3>
    <div class="flex flex-col gap-5 w-full items-center">
      <div class="w-full flex flex-col gap-2">
        <input
          @input="formValidity.email = true"
          :class="{ invalid: !formValidity.email }"
          v-model="email"
          placeholder="email@domain.com"
          type="email"
          name="email"
        />
        <div class="flex" v-if="!formValidity.email">
          <div class="flex-1" />
          <p class="text-xs font-light" style="color: #ec1e58">Invalid email address.</p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-2">
        <input
          @input="formValidity.name = true"
          :class="{ invalid: !formValidity.name }"
          v-model="name"
          placeholder="Your Name"
          type="text"
          name="name"
        />
        <div class="flex" v-if="!formValidity.name">
          <div class="flex-1" />
          <p class="text-xs font-light" style="color: #ec1e58">Invalid name format.</p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-2">
        <textarea
          @input="formValidity.message = true"
          :class="{ invalid: !formValidity.message }"
          v-model="message"
          placeholder="Your Message"
          name="message"
        />
        <div class="flex" v-if="!formValidity.message">
          <div class="flex-1" />
          <p class="text-xs font-light" style="color: #ec1e58">Message body should be at least 10 characters long.</p>
        </div>
      </div>
    </div>
    <div
      @click="submit"
      class="text-white border-2 border-white cursor-pointer transition-all rounded-full text-lg font-medium uppercase pl-8 pr-8 opacity-70 p-2"
    >
      <template v-if="sendState === 0">submit message</template>
      <div v-else-if="sendState === 1" class="loader" />
    </div>
  </div>
</template>

<script>
const SEND_STATES = {
  IDLE: 0,
  SENDING: 1,
};

export default {
  name: "contactComponent",
  props: {
    content: Object,
  },
  data() {
    return {
      name: "",
      email: "",
      message: "",
      formValidity: {
        email: true,
        name: true,
        message: true,
      },
      sendState: SEND_STATES.IDLE,
    };
  },
  methods: {
    submit() {
      if (this.validate() && this.sendState === SEND_STATES.IDLE) {
        this.sendState = SEND_STATES.SENDING;
        this.$http
          .post("https://formsubmit.co/ajax/eb166882bfe47ee1704efb785a915f0e", {
            name: this.name,
            email: this.email,
            message: this.message,
            _subject: "New message from timekadel.com",
            _honey: true,
            _template: "table",
          })
          .then(() => {
            this.sendState = SEND_STATES.IDLE;
            this.resetForm();
          })
          .catch(() => {
            this.sendState = SEND_STATES.IDLE;
            this.resetForm();
          });
      }
    },
    resetForm() {
      this.email = "";
      this.name = "";
      this.message = "";
      this.formValidity.email = true;
      this.formValidity.name = true;
      this.formValidity.message = true;
    },
    validate() {
      this.validateEmail();
      this.validateMessage();
      this.validateName();
      console.log(this.formValidity);
      return !Object.values(this.formValidity).includes(false);
    },
    validateEmail() {
      this.formValidity.email =
        String(this.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || false;
      return this.formValidity.email;
    },
    validateName() {
      this.formValidity.name = String(this.name).match(/^[a-zA-Z\u00C0-\u017F]+(([',. -][a-zA-Z\u00C0-\u017F ])?[a-zA-Z\u00C0-\u017F]*)*$/) || false;
      return this.formValidity.name;
    },
    validateMessage() {
      this.formValidity.message = this.message.length >= 10;
      return this.formValidity.message;
    },
  },
};
</script>

<style scoped>
.loader {
  height: 20px;
  width: 20px;
  border: 2px dashed white;
  border-radius: 50%;
  animation: loader 2s infinite;
}
@keyframes loader {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.invalid {
  border-color: #ec1e58 !important;
}
input {
  border-radius: 10px;
  height: 50px;
  background: transparent;
  background: rgba(255, 255, 255, 0.1);
  padding: 0 16px;
  font-size: 18px;
  color: white;
  outline: none;
  margin: 0;
  opacity: 0.7;
  width: 100%;
  border: 1px solid transparent;
  transition: all 0.25s ease-in-out;
}
textarea {
  border-radius: 10px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  font-size: 18px;
  color: white;
  outline: none;
  margin: 0;
  opacity: 0.7;
  height: 150px;
  resize: none;
  width: 100%;
  border: 1px solid transparent;
  transition: all 0.25s ease-in-out;
}
</style>
