<template>
    <header class="header">
        <slot name = 'logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goback" @click="$router.go(-1)">
            返回
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if="signinUp" class="head_login">
            <span v-if="userInfo&&userInfo.username">{{userInfo.username}}</span>
            <span v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity" class="changecity" ></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
import {mapState ,mapActions} from 'vuex'
export default {
    data() {
        return {
            // goback: false,
            // signinUp:false,
            // headTitle:false
        }
    },
    props: ['signinUp', 'headTitle', 'goback'],
    computed:{
        ...mapState([
            'userInfo'
        ])
    },
    mounted(){
        //获取用户信息
        this.getUserInfo();
    },
    methods:{
        ...mapActions([
            'getUserInfo'
        ])
    }
};
</script>

<style scoped lang = 'less'>
.header {
  background-color: #3190e8;
  
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 .4rem;
  color: white;
  .head_goback{
      /* float: left; */
      position: absolute;
      /* left: 0; */
      /* margin-left: .4rem; */
      z-index: 1;
  }
   .head_login{
      float:right;
      color: white;
  }
  
  
  .title_head{
      /* text-align: center; */
      /* width: 100vw; */
      position: absolute;
      width: 100vw;
      text-align: center;
      left: 0;
      font-weight: 700;
      font-size: 1.3rem;
      top: 0;
  }
}
</style>