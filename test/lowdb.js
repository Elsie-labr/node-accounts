const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
// 获取db对象
const db = low(adapter)

// 初始化数据
db.defaults({ posts: [], user: {} }).write()

// 写入数据
// Add a post
db.get('posts').unshift({ id: 1, title: 'lowdb is awesome' }).write()

// 获取单条
let res = db.get('posts').find({ id: 1 })
console.log(res)

// 获取数据
console.log(db.get('posts').value())

// 删除数据
// db.get('posts').remove({ id: 1 }).write()

// 更新数据
db.get('posts').find({ id: 1 }).assign({ title: '今天下雨啦！！！' })
