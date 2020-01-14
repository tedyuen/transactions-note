/*
 * @Author: Ted Yuen 
 * @Date: 2020-01-13 23:09:54 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2020-01-13 23:29:20
 * @Desc: 资金管理接口
 */
import Router from 'koa-router';
import Capital from '../dbs/models/capital';
import { userId } from './utils/data';

let router = new Router({ prefix: '/api/capital' });

/**
 * 添加资金划转信息
 */
router.post('/addCapitalData', async ctx => {
  let params = {
    companyId: '5e183fb0a4c8c155bce3623a',
    amount: 2222.33,
    type: 0,
    remark: '第一次转入'
  }
  const capital = new Capital(Object.assign(ctx.request.body, {
    userId: userId
  }));
  let result = await capital.save();
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
})

/**
 * 获取资金划转信息列表
 */
router.get('/getAllCapital', async ctx => {
  try {
    let companyId = ctx.query.companyId;
    let type = ctx.query.type;
    let createDate = ctx.query.createDate;
    console.log("111111")
    let result = await Capital.find({
      userId: userId
    })
    console.log(result)
    if (result) {
      ctx.body = {
        code: 0,
        list: result
      }
    } else {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      list: []
    }
  }
})

export default router
