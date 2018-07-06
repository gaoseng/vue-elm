<template>
    <div class="home">
        <head-top signin-up='home' >
            <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
        </head-top>
        <nav class="city_nav">
            <div class="city_top">
                <span>当前定位的城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <img src="./../../images/allow_right.png" class="arrow_right">
            </router-link>
        </nav>
        <section class="city_hot">
          <h4 class="city_title">热门城市</h4>
          <ul class="city_hot_list clear">
            <router-link tag="li" v-for=" item in hotcity" :to="'/city/'+ item.id" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
        </section>
        <section class="group_city">
          <div v-for="(cities ,key) in sortGroupCity" :key="key" class="city_type">
            <h4 class="group_city_title">
              <span>{{key}}</span>
              <span v-if="key==='A'">(按字母排序)</span>
            </h4>
            <ul class="group_city_list .clear" >
              <router-link tag="li" v-for=" item in cities" :to="'/city/'+ item.id" :key="item.id">
              {{item.name}}
            </router-link>
            </ul>

          </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { cityGuess, hotcity, groupcity } from "../../service/getData";
import headTop from "./../../components/header/header";
// import axios from 'axios';
export default {
  name: "Home",
  data() {
    return {
      guessCity: "", //当前城市
      guessCityid: "", //当前城市id
      hotcity: [], //热门城市列表
      groupCity: {} //所有城市列表
    };
  },

  computed: {
    sortGroupCity(){
      // console.log(this.guesscity);
      // this.groupCity.sort((a,b)=>{
      //   console.log(a)
      // });
      // console.log(1)
      let obj = {};
      for(let i=65;i<=90;i++){
        if(this.groupCity[String.fromCharCode(i)]){
          obj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)]
        }
      }
      console.log(obj)
      return obj;
    }
  },
  created() {
    cityGuess().then(res => {
      this.guessCity = res.data.name;
      this.guessCityid = res.data.id;
      //   console.log(this.data,res)
    });
    //获取热门城市
    hotcity().then(res => {
      this.hotcity = res.data;
    });
    //获取所有城市
        groupcity().then(res => {
          
          // for(let item in res.data){
          //   // console.log(item);
          //   this.groupCity.push(res.data[item])
          // }
          
            this.groupCity = res.data;
            
        })
  },
  mounted() {},
  methods: {
    reload: function() {}
  },
  components: {
    headTop
  }
};
</script>

<style scoped lang='less'>
.home {
  // background-color: white;

  div {
    p {
      color: yellow;
    }
  }
  .city_nav {
    //   margin-top: 2rem;
    padding-top: 3.3rem;
    border-top: 1px solid #e4e4e4;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .city_top {
      font-weight: 900;
      font-size: 0.475rem;
      color: #9f9f9f;
      padding: 0 0.45rem;
      margin-bottom: 0.6rem;
      :last-child {
        float: right;
      }
    }
  }
  .guess_city {
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    width: 100%;
    display: block;
    padding: 0.6rem;
    .arrow_right {
      // @include wh(.6rem, .6rem);
      fill: #999;
      width: 1.6rem;
      height: 1.6rem;
      float: right;
    }
  }
  .city_hot {
    margin-top: 1rem;
    background-color: white;
    .city_title {
      // border-bottom: 0.025rem solid #e4e4e4;
      color: #666;
      font-weight: 400;
      text-indent: 0.45rem;
      border-top: 2px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      font: 0.85rem/1.45rem "Helvetica Neue";
      padding: .4rem 0;
    }
    .city_hot_list {
      // display: flex;
      // justify-content: flex-start;
      // flex-wrap: wrap;
      // margin
      li {
        float: left;
        text-align: center;
        color: #3190e8;
        border-bottom: 0.025rem solid #e4e4e4;
        border-right: 0.025rem solid #e4e4e4;
        width: 25%;
        height: 2.3rem;
        line-height: 2.3rem;
        font: 1rem/1.75rem "Microsoft YaHei";
        padding: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      li:nth-of-type(4n) {
        border-right: none;
      }
    }
  }
  .group_city{
    margin-top: 1rem;
    
    
    .city_type{
      margin-top: 1rem;
      background-color: white;
    }
    .group_city_title {
      // border-bottom: 0.025rem solid #e4e4e4;
      color: #666;
      font-weight: 400;
      text-indent: 0.45rem;
      border-top: 2px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      font: 0.85rem/1.45rem "Helvetica Neue";
      padding: .4rem 0;
    }
    .group_city_list {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      // margin
      li {
        // float: left;
        text-align: center;
        // color: #3190e8;
        color: #666;
        border-bottom: 0.025rem solid #e4e4e4;
        border-right: 0.025rem solid #e4e4e4;
        width: 25%;
        height: 2.3rem;
        line-height: 2.3rem;
        font: 1rem/1.75rem "Microsoft YaHei";
        padding: 0 .3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
      }
      li:nth-of-type(4n) {
        border-right: none;
      }
    }
  }
}
</style>