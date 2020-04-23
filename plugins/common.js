import Vue from 'vue'
import { vueBaberrage } from 'vue-baberrage'
import TimeTick from '../components/TimeTick'
import ua from '@/utils/ua'

// 插件形式
const useComponentList = [vueBaberrage]
// 组件形式
const componentList = [TimeTick]

useComponentList.forEach((component) => {
  Vue.use(component)
})

componentList.forEach((component) => {
  Vue.component(component.name, component)
})

Vue.prototype.ua = ua
