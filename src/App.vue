<template>
  <router-view class="main"/>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
* {
  user-select: none;
}
.main{
  overflow: scroll;
}
</style>
