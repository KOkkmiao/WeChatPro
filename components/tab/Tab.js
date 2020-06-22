// components/tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabTap(e) {
      const { index } = e.target.dataset;
      this.triggerEvent("handleTabTapSupper", { index });
    }
  }
})
