<template>
    <div id="alert_text">
        <!-- <header></header> -->
        <main>
            <section class="alert_icon">
                <span></span>
                <span></span>
            </section>
            <section class="alert_text">
                <span>{{alertText}}</span>
            </section>
            <button class="btn_confirm" @click="confirm">确认</button>
        </main>
    </div>
</template>

<script>
export default {
  name: "alertText",
  props: ['alertText'],
  methods:{
      confirm(){
          this.$emit('closeTip','ss');
      }
  }
};
</script>

<style scoped lang= 'less'>
#alert_text {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 600;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* background-color: white; */
  main{
      background-color: white;
      width: 18rem;
      display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        flex-wrap: wrap;
        flex-direction: column;
        padding-top: 1rem;
        top: 30%;
        left: calc(~'(100% - 18rem) / 2');
        color: gray;
        margin-bottom: 7rem;
        text-align: center;
        
  }
  .alert_icon {
    width: 5rem;
    height: 5rem;
    border: 0.3rem solid #f8cb86;
    border-radius: 50%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    
    span:nth-child(1){
        
       border: .12rem solid #f8cb86; 
       height: 1.4rem;
       width: .15rem;
       margin: .3rem;
       /* transform: rotateZ(90) */
    }
     span:nth-child(2){
       border: 2px solid #f8cb86; 
       height: .2rem;
       width: .2rem;
       border-radius: 50%;
    }
  }
  .alert_text{
      margin: 1rem 0;
  }
  .btn_confirm{
      width: 100%;
      background-color: #4cd964;
      height: 2rem;
      color: white;
      font-size: 1rem;
  }
}
</style>