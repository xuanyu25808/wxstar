// pages/home/home.js
Page({
  data: {
    message: [{
        name: 'xiao1',
        age: 14
      },
      {
        name: 'xiao2',
        age: 15
      },
      {
        name: 'xiao3',
        age: 16
      },
      {
        name: 'xiao4',
        age: 17
      },
    ],
    counter: 0
  },
  handleClick() {
    this.data.message.push({name:'aa',age:1231})
    this.setData({
      message: this.data.message
    })
    console.log(this.data.message)

  }
})