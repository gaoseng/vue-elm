<template>
    <div id="login">
        <head-top goback="true" headTitle= '登录'></head-top>
        <section class="client_info">
            <div class="user_name">
                <input type="text" v-model.lazy="userName" placeholder="账号">
            </div>
            <div class="user_password">
                <input type="password" v-if="!showPassword" v-model.lazy="password" placeholder="密码">
                <input type="text" v-else v-model.lazy="password" placeholder="密码">
                <div class="button_switch " :class="{change_to_text:!showPassword}">
                    <div class="circle_button " :class="{trans_to_right:showPassword}"  @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </div>
            <div class="captcha_code_container">
                <input type="text" v-model.lazy="codeNumber" placeholder="验证码">
                <div class="img_change">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="img_btn">
                        <p>看不清</p>
                        <p @click="cahngeImg()">换一张</p>
                    </div>
                </div>
            </div>
            <button class="login" @click="login">登录</button>
        </section>
        <alert-tip v-if="showAlert" @closeTip="closeTip"  :alertText='alertText'></alert-tip>
    </div>
</template>

<script>
import headTop from "./../../components/header/header";
import alertTip from "./../../components/common/alertTip";
import {mapMutations} from "vuex"

import {
  mobileCode,
  checkExsis,
  sendLogin,
  getcaptchas,
  accountLogin
} from "../../service/getData";
export default {
  name: "login",
  data() {
    return {
      userInfo: "",
      userName: "",
      password: "",
      codeNumber: null,
      showPassword: false,
      captchaCodeImg: null, //验证码地址
      showAlert: false,
      alertText: null
    };
  },
  created() {
    this.cahngeImg();
  },
  mounted() {},
  methods: {
    ...mapMutations(['RECORD_USERINFO']),
    changePassWordType() {
      this.showPassword = !this.showPassword;
    },
    async cahngeImg() {
      await getcaptchas().then(res => {
        console.log(res.data.code);
        this.captchaCodeImg = res.data.code;
      })
    },
    async login() {
      if (!this.userName) {
        this.showAlert = true;
        this.alertText = "请输入手机号/邮箱/用户名";
        return;
      } else if (!this.password) {
        this.showAlert = true;
        this.alertText = "请输入密码";
        return;
      } else if (!this.codeNumber) {
        this.showAlert = true;
        this.alertText = "请输入正确的验证码";
        return;
      }
      this.userInfo = {
        __v: 0,
        username: "gaosen",
        user_id: 12080,
        id: 12080,
        city: "深圳",
        registe_time: "2018-07-06 09:34",
        _id: "5b3ec72f0913b76ad60e4c99",
        column_desc: {
          gift_mall_desc: "0元好物在这里",
          game_link: "https://gamecenter.faas.ele.me",
          game_is_show: 1,
          game_image_hash: "05f108ca4e0c543488799f0c7c708cb1jpeg",
          game_desc: "玩游戏领红包"
        },
        point: 0,
        mobile: "",
        is_mobile_valid: true,
        is_email_valid: false,
        is_active: 1,
        gift_amount: 3,
        email: "",
        delivery_card_expire_days: 0,
        current_invoice_id: 0,
        current_address_id: 0,
        brand_member_new: 0,
        balance: 0,
        avatar: "default.jpg"
      };
      // console.log(this.userInfo);
      this.RECORD_USERINFO(this.userInfo);
      this.$router.go(-1)
    },
    closeTip($event) {
      console.log($event);
      this.showAlert = false;
    }
  },
  components: {
    headTop,
    alertTip
  },
  
};
</script>

<style scoped lang="less">
#login {
  // background-color: #F5F5F5;
  .client_info {
    margin-top: 3.3rem;
    input {
      width: 60%;
      height: 2rem;

      font-size: 1rem;
    }
    // background-color: white;
    .user_name {
      margin-top: 1rem;
      background-color: white;
      padding: 0.4rem 1rem;
      border-bottom: 1px solid rgb(241, 241, 241);
    }
    .user_password {
      background-color: white;
      padding: 0.4rem 1rem;
      border-bottom: 1px solid rgb(241, 241, 241);
      line-height: 2rem;
    }
    .button_switch {
      float: right;
      position: relative;
      font-size: 0.4rem;
      width: 3.6rem;
      height: 1rem;
      border-radius: 0.5rem;
      line-height: 1rem;
      background-color: #4cd964;
      margin-top: 0.5rem;
      // padding: 0 .5rem;
      text-align: center;
      color: white;
      .circle_button {
        width: 1rem;
        background-color: #f1f1f1;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        position: absolute;
        top: -0.3rem;
        transition: all 0.3s linear;
      }
      .trans_to_right {
        transform: translateX(2rem);
      }
    }
    .change_to_text {
      background-color: #ccc;
      color: white;
    }
    .captcha_code_container {
      background-color: white;
      padding: 0.4rem 1rem;
      border-bottom: 1px solid rgb(241, 241, 241);
      line-height: 2rem;
      .img_change {
        float: right;
        display: flex;
        font-size: 0.5rem;
        img {
          height: 2rem;
          width: 3.5rem;
        }
        .img_btn {
          // display: flex;
          // flex-wrap: wrap;
          p {
            height: 1rem;
            line-height: 1rem;
            width: 3.3rem;
            text-align: center;
          }
          p:last-child {
            color: green;
          }
        }
      }
    }
    .login {
      margin-top: 2rem;
      width: 100%;
      background-color: #4cd964;
      height: 2.5rem;
      color: white;
      font-size: 1.2rem;
    }
  }
}
</style>