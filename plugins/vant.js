import Vue from 'vue'
import 'vant/lib/index.css'
import { CountDown, Image, Collapse, CollapseItem, Toast } from 'vant'

const components = [CountDown, Image, Collapse, CollapseItem, Toast]

components.forEach((component) => {
  Vue.use(component)
})
