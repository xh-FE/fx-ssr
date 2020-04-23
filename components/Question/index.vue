<template lang="pug">
  .w-670.m-auto.box-question.bg-white
    van-collapse(v-model="activeNames" accordion)
      van-collapse-item(title="大病互助计划是保险吗？靠谱吗？" name="1")
        span.fs-24 大病互助计划不是保险，是会员之间互帮互助的公益行为。加入互助行动是会员单向的捐赠或捐助行为，加入的会员不能因单向的捐赠或捐助行为预期获得确定的互助金。
      van-collapse-item(title="本计划涵盖的重大疾病都有哪些？" name="2")
        div.fs-24
          p 1. 恶性肿瘤
          p 2. 急性心肌梗塞
          p 3. 严重脑中风后遗症
          p 4. 重大器官移植术或者造血干细胞移植术开胸进行的冠状动脉搭桥术（或者称冠状动脉旁路移植术）
          p 5. 终末期肾病（或者称慢性肾功能衰竭尿毒症期）
          p 本计划将涵盖包括以上常见高发重大疾病在内的105项重疾与罕见病，具体病种说明待互助计划正式上线后可参见条款。
      van-collapse-item(title="已有医保，或有商业保险，还可以加入吗？" name="3")
        p.fs-24 可以的。如果已加入其它互助，也可以加入本计划。
      van-collapse-item(title="什么时候正式上线？到时候怎么加入？" name="4")
        //- TODO
        p.fs-24 本互助计划预计在5月底正式上线，您可通过关注xxxx微信公众号接收上线通知并加入计划。预约用户可留意短信或电话提醒。
      van-collapse-item(title="为什么需要充值1分钱才能获得权益？" name="5")
        p.fs-24 充值的小额互助金是用于帮助大病的会员。会员领取权益时，每人预存一点钱，放在一起，以后谁生病了就从这些钱里面出医疗费。这样就可以“每个人平时花很少的钱帮别人，自己生病也能得到救命钱”。
</template>

<script>
export default {
  data() {
    return {
      activeNames: ''
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ [class*='van-hairline']::after {
  /* border: 0; */
}
/* .van-cell:not(:last-child)::after */
/deep/ [class*='van-hairline']:first-child::after {
  border: 0;
}
/deep/ .van-cell {
  font-size: 27px;
  line-height: 89px;
}
/deep/ .van-cell__right-icon {
  line-height: 89px;
  font-size: 26px;
}
/deep/ .van-collapse-item__wrapper {
  font-size: 24px;
}
/deep/ .van-cell--clickable:active {
  background: #fff;
}
.box-question {
  border: 1px solid #eff0f3;
  box-shadow: 0px 3px 10px 0px rgba(225, 239, 255, 0.34);
  border-radius: 20px;
  padding: 10px;
}
</style>
