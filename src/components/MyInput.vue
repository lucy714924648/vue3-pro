

<template>
  <div class="my-input">
    <el-input v-bind="$attrs" ref="inp">
      <template v-for="(item, name) in $slots" #[name]>
        <slot :name="name"> </slot>
      </template>
      <!-- <template #prefix>
        <slot name="prefix"> </slot>
      </template> -->
    </el-input>
  </div>
</template>
<script>
export default {
  created() {
    // console.log(this.$attrs);
    // console.log(this.$slots);
  },
  mounted() {
    const entries = Object.entries(this.$refs.inp);
    // console.log(this.$refs.inp);
    console.log(entries);
    for (const [key, value] of entries) {
      this[key] = value;
    }
  },
};
</script>
<style  scoped>
.my-input {
  transition: 0.3;
}
.my-input:hover,
.my-input:focus-within {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
}
</style>