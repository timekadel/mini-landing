<template>
  <div
    v-if="content.length"
    v-show="this.$utils.scrollHandler.scrollY"
    @click="$router.replace(`#${content[0].name}`)"
    class="cursor-pointer z-30 flex items-center justify-center fixed hover:shadow-2xl group-hover:{shadow-2xl,bg-red-500} hover:opacity-90 hover:w-28 transition-all bottom-5 right-5 rounded-full bg-white text-opacity-10 h-12 w-24 opacity-70"
  >
    <eva-icon name="chevron-up" fill="black"></eva-icon>
    <b class="opacity-80">UP!</b>
  </div>
</template>

<script>


export default {
  name: "ScrollupComponent",
  props:{
    content: {
      type: Array,
      default: ()=>([])
    }
  }
}
</script>
