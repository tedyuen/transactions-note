/*
 * @Author: Ted Yuen 
 * @Date: 2020-01-10 15:48:15 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2020-01-10 16:10:17
 * @Desc: 用户接口
 */
import Router from 'koa-router';
import Users from '../dbs/models/users'

let router = new Router({ prefix: '/api/users' })

/**
 * 添加用户
 */
router.post('/addUser', async (ctx) => {
  let params = {
    username: 'ted',
    realName: '小西瓜',
    email: 'tedyuen.goo@gmail.com',
    password: '123456'
  }
  let username = ctx.request.body.username;
  if (await Users.findOne({ username })) {
    ctx.body = {
      code: -1,
      msg: '用户名已存在'
    }
  } else {
    const users = new Users(ctx.request.body);
    let result = await users.save();
    if (result) {
      ctx.body = {
        code: 0,
        msg: '新增成功'
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '新增失败'
      }
    }
  }
})

export default router
