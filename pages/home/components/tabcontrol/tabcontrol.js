// pages/home/components/tabcontrol/tabcontrol.js
Component({
  properties: {
    title:{
      type:Array,
      value:[]
    }
  },
  data: {
    currentIndex:0
  },
  methods: {
    tabClick(e){
      this.setData({
        currentIndex:e.currentTarget.dataset.index
      })
      this.triggerEvent('tabClick',{index:this.data.currentIndex},{})
    }
  }
})
