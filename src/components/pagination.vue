<template>
  <div class="component-standard-pagination" v-show="totalPage>1">
    
    <nav class="">
      <ul class="pagination">
        <li>
          <a :class="{'disabled': currentPage == 1}" class="btn" href="javascript:void(0);" aria-label="First" @click='onChangePage("first")' >
            &laquo;{{firstPageText}}
          </a>
        </li>
        <li>
          <a :class="{'disabled': currentPage == 1}" class="btn" href="javascript:void(0);" aria-label="Previous" @click="onChangePage('previous')" >
            &lt;{{previousPageText}}
          </a>
        </li>
        <li v-if="isMoreIcon&&paginationData[0]>1">
          <span>...</span>
        </li>
        <template v-for="index in paginationData">
          <li :class="{'active': currentPage == index}">
            <a  class="btn" href="javascript:void(0);" v-html='index' @click="onChangePage(index)" ></a></li>        
        </template>
        <li v-if="isMoreIcon&&paginationData[paginationPage-1]<totalPage">
          <span>...</span>
        </li>
        <li>
          <a :class="{'disabled': currentPage == totalPage}" class="btn" href="javascript:void(0);" aria-label="Next" @click="onChangePage('next')" >
            {{nextPageText}}&gt;
          </a>
        </li>
        <li>
          <a :class="{'disabled': currentPage == totalPage}" class="button" href="javascript:void(0);" aria-label="Last" @click="onChangePage('last')" >
            {{lastPageText}}&raquo;
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  props: {
    total: {
      type: Number,
      default(){
        return 0
      }
    },
    perPage: {
      type: Number,
      default (){
        return 10
      }
    },
    onPerPageChange: {
      type: Function
    },
    paginationPage: {     //分页脚标默认数目
      type: Number,
      default(){
        return 5
      }
    },
    isShowPageSize: {
      type: Boolean,
      default(){
        return false
      }
    },
    isMoreIcon: {
      type: Boolean,
      default(){
        return true
      }
    },
    onPageChange: {
      type: Function
    },
    firstPageText: {
      type: String,
      default(){
        return '首页'
      }
    },
    previousPageText: {
      type: String,
      default(){
        return '前一页'
      }
    },
    nextPageText: {
      type: String,
      default(){
        return '下一页'
      }
    },
    lastPageText: {
      type: String,
      default(){
        return '末页'
      }
    }
  },
  components: {
  },
  watch: {
    currentPage(val){
      //onChangePage callback
      this.onPageChange(val)
    },
    perPage(){
      this.currentPage = 1
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total/this.perPage)
    },
    firstNum(){
      return (this.currentPage - 1) * this.perPage + 1
    },
    lastNum(){

      return (this.currentPage * this.perPage) > this.total ? this.total : (this.currentPage * this.perPage)
    },
    paginationData() {
      let pageArray = []
      if(this.totalPage <= this.paginationPage){
        for(let index = 1; index <= this.totalPage; index++){
          pageArray.push(index)
        }
      }else if(this.totalPage > this.paginationPage){
        let firstPageNum = this.currentPage > parseInt(this.paginationPage/2) ? this.currentPage - parseInt(this.paginationPage/2) : 1

        if(this.currentPage + this.paginationPage > (this.totalPage +1)){
          firstPageNum = this.totalPage - this.paginationPage + 1
        }
        for(let index = firstPageNum; index < (firstPageNum + this.paginationPage); index++){
          pageArray.push(index)
        }
      }
      return pageArray;
    }
  },
  methods: {
    onChangePage(page){
      if(page == 'first'){
        this.currentPage = 1
      }else if(page == 'previous'){
        if(this.currentPage != 1){
          this.currentPage--
        }
        
      }else if(page == 'next'){
        if(this.currentPage != this.totalPage){
          this.currentPage++
        }
        
      }else if(page == 'last'){
        this.currentPage = this.totalPage

      }else if(!isNaN(Number(page))){
        this.currentPage = page
      }else{
        console.log('there are something wrong in onChangePage method.')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .smaller{
    font-size: 12px;
  }
  .p-msg{
    height: 50px;
    line-height: 30px;
  }
  .totalPageNum{
    display: inline-block;
    margin: 20px 0;
    vertical-align: top;
  }
  .component-standard-pagination{
    overflow: hidden;
  }
  .component-standard-pagination .pagination{
    float: right !important;
  }
</style>
