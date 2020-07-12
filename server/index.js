const express = require("express")

const app = express()
//express实例上设置一个变量
app.set('secret', 'ses454ws5sd54sd54s54')

app.use(require('cors')())
app.use(express.json())
//托管静态文件
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})