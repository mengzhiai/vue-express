<!--
 * @Date: 2020-06-04 15:50:00
 * @LastEditors: jun
 * @LastEditTime: 2020-06-05 17:12:48
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
      let data = {
        username: 'admin',
        pwd: 'admin123'
      }
      this.axios.post('/api/login', data).then(res => {
        if(res.data.message === '登录成功'){
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
