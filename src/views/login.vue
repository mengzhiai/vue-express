<!--
 * @Date: 2020-06-04 15:50:00
 * @LastEditors: jun
 * @LastEditTime: 2020-06-04 15:50:57
 * @FilePath: \vue-express\src\views\login.vue
--> 
<template>
<div>

</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios.get('/api/login').then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
