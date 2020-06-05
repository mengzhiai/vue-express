<!--
 * @Date: 2020-05-21 14:05:42
 * @LastEditors: jun
 * @LastEditTime: 2020-06-05 17:00:23
 * @FilePath: \vue-express\src\views\Home.vue
--> 
<template>
<div>
  <el-row>
    <el-col :span="20">
      <el-input v-model="searchData" size="small" placeholder="" @keyup.enter.native="init"></el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" size="small" @click="create">新建</el-button>

    </el-col>
  </el-row>
  <el-table :data="tableData" border stripe>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="age" label="年龄">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <div>
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleleRow(scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
  </el-pagination>
  <el-dialog :visible.sync="optionDialog" width="400px" @close="closeDialog">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄:">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="optionDialog=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</div>
</template>

<script>
import {
  numberToChinese
} from '../until/common'
export default {
  data() {
    return {
      form: {
        name: '',
        age: null
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      optionDialog: false,
      searchData: ''
    }
  },
  mounted() {
    this.init();
    console.log(numberToChinese(12345));
  },
  methods: {
    init() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        searchData: this.searchData
      }
      this.axios.get('/api/demo', {
        params: data
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      })
      this.axios.get('/api').then(res=>{
        
      })
    },
    sizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    currentChange(val) {
      this.pageNum = val;
      this.init();
    },
    create() {
      this.optionDialog = true;
    },
    //编辑
    edit(row) {
      this.optionDialog = true;
      this.axios.get('/api/demo/detail', {
        params: {
          id: row.id
        }
      }).then(res => {
        this.form = res.data.data;
      })
    },
    onSubmit() {
      if (this.form.id === '') {
        this.axios.post('/api/demo/add', this.form).then(res => {
          console.log(res.data.data);
          this.init();
          this.optionDialog = false;
        })
      }else{
        this.axios.post('/api/demo/update', this.form).then(res => {
          console.log(res.data.data);
          this.init();
          this.optionDialog = false;
        })
      }
    },
    deleleRow(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: row.id
        }
        this.axios.post('/api/demo/delete', data).then(res => {
          this.init();
        })
      }).catch(() => {});
    },
    closeDialog() {
      this.form = {};
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
