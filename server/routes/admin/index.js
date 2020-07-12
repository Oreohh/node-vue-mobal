module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true //动态参数传到路由
  })
  

  //新建
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      status: 'success'
    })
  })
  //列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  //详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //封装，登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  //资源中间件
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  //上传图片
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (res, req) => {
    const file = res.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    req.send(file)
  })

  //登录
  app.post('/admin/api/login', async(req, res) => {
    const { username, password } = req.body
    //1、根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //2、校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    // console.log(password+' '+user.password+' '+isValid)
    assert(isValid, 422, '密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //3、返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({token})
  })

  //assert错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}