<template>
    <div id="city">
        <head-top goback="true" :head-title="cityname">
            <!-- <span slot='logo' >ele.me</span> -->
            <router-link slot="changecity" to="/home" class="change_city" >切换城市</router-link>
        </head-top>
        <section class="city_query">
            <input type="text" v-model="queryStr" placeholder="输入学校、商务楼、地址" @input="changeValue">
            <button @click="btnQuery">查询</button>
        </section>
        <section class="search_history" v-show="historytitle">
            搜索历史
        </section>
        <section class="search_info" v-if="historytitle">
            <ul v-for="(item,index) in searchHistory" :key="index" @click="nexpPage(item)">
                <h4>{{item.name}}</h4>
                <li>{{item.address}}</li>
            </ul>
            <h4 class="clear_history" @click="clearHistory">清除历史</h4>
        </section>
        <section class="search_info search_clk" v-else>
            <ul v-for="(item,index) in searchInfo" :key="index" @click="nexpPage(item)">
                <h4>{{item.name}}</h4>
                <li>{{item.address}}</li>
            </ul>
        </section>
    </div>
</template>

<script>
import headTop from "./../../components/header/header";
import { currentcity, searchplace } from "./../../service/getData";
import { getStore, setStore, removeStore } from "./../../config/mUtils";
export default {
  name: "city",
  data() {
    return {
      queryStr: "",
      cityid: "", // 当前城市id
      cityname: "",
      searchInfo: [],
      searchHistory: [], // 历史搜索记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false // 搜索无结果，显示提示信息
    };
  },
  mounted() {
    this.cityid = this.$route.params.cityid;
    currentcity(this.cityid).then(res => {
      this.cityname = res.data.name;
    });
    this.initData();
  },
  methods: {
    btnQuery() {
      this.historytitle = false;
      searchplace(this.cityid, this.queryStr).then(res => {
        this.searchInfo = res.data;
      });
    },
    changeValue() {
      // console.log(this.queryStr)
      this.searchInfo = [];
    },
    nexpPage(item) {
      console.log(this.searchHistory);
      // let history =getStore('searchHistory');
      if (this.searchHistory) {
        let ifHistory = this.searchHistory.find(history => {
          return history.geohash === item.geohash;
        });
        if (!ifHistory) {
          this.searchHistory.push(item);
        }
      } else {
        this.searchHistory.push(item);
      }
      setStore("searchHistory", this.searchHistory);
    },
    clearHistory() {
      removeStore("searchHistory");
      this.searchHistory = [];
    },
    initData() {
      if (getStore("searchHistory")) {
        this.searchHistory = JSON.parse(getStore("searchHistory"));
      } else {
        this.searchHistory = [];
        // console.log('searchHistory');
      }
      // this.searchHistory();
    }
  },
  components: {
    headTop
  }
};
</script>

<style scoped lang="less">
#city {
  .change_city {
    position: absolute;
    right: 0.4rem;
    color: white;
  }
  .city_query {
    margin-top: 3.3rem;
    background-color: white;
    input {
      width: 90%;
      height: 2rem;
      font-size: 1rem;
      margin-left: 5%;
      text-align: center;
      border: 1px solid gainsboro;
      margin-top: 0.5rem;
      border-radius: 5px;
    }
    button {
      width: 90%;
      margin-left: 5%;
      background-color: #4cd964;
      margin-top: 0.5rem;
      border-radius: 5px;
      height: 2rem;
      color: white;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
  .search_history {
    color: #666;
    padding: 0.3rem 0.4rem;
    font-size: 0.8rem;
    border-top: 2px solid gainsboro;
    border-bottom: 2px solid gainsboro;
  }
  .search_info {
    &.search_clk {
      margin-top: 1.4rem;
    }
    .clear_history {
      background-color: white;
      background-color: white;
      /* padding: .4rem 10%; */
      text-align: right;
      height: 2rem;
      line-height: 2rem;
      padding: 0 10%;
      color: #333;
      font-size: .8rem;
    }
    ul {
      background-color: white;
      border-bottom: 1px solid gainsboro;
      padding: 1.2rem 10%;
      //   &:first-child{
      //       border-top: 1px solid gainsboro;
      //   }
      h4 {
        color: #666;
        font-size: 1rem;
      }
      li {
        font-size: 0.8rem;
        color: #666;
      }
    }
  }
}
</style>