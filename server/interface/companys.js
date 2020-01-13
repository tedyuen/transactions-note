/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 23:25:19 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2020-01-13 22:00:23
 * @Desc: 证券公司接口
 */
import Router from 'koa-router';
import Company from '../dbs/models/company'

let router = new Router({ prefix: '/api/company' })

/**
 * 添加证券公司
 */
router.post('/addCompany', async (ctx) => {
  // let params = {
  //   name: '平安证券',
  //   isDefault: 0,
  //   accountType: 0,
  //   stockCommissionRates: 2.5,
  //   stockCinCommission: 0,
  //   etfCommissionRates: 2.5,
  //   etfCinCommission: 0,
  //   szTransferFee: 0,
  //   shTransferFee: 1
  // }
  let name = ctx.request.body.name;
  if (await Company.findOne({ name })) {
    ctx.body = {
      code: -1,
      msg: '证券公司已存在'
    }
  } else {
    const company = new Company(Object.assign(ctx.request.body, {
      userId: '5e183266eb10b6490dfee5f5'
    }));
    let result = await company.save();
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

/**
 * 获取所有证券公司信息
 */
router.get('/getAllCompanys', async ctx => {
  try {
    var companyName = new RegExp(ctx.query.companyName || '', 'i');
    let result = await Company.find({
      $or: [{ "name": { $regex: companyName } }]
    })
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

/**
 * 设置默认券商
 */
router.post('/setDefault', async ctx => {
  try {
    let _id = ctx.request.body.id;
    let update = await Company.updateMany({}, { isDefault: 1 }).exec();
    if (update.ok === 1) {
      let setResult = await Company.updateOne({ _id: _id }, {
        isDefault: 0
      }).exec();
      if (setResult.ok === 1) {
        ctx.body = {
          code: 0,
          msg: '设置成功'
        }
      } else {
        ctx.body = {
          code: -1,
          msg: '设置失败'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '设置失败'
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: '设置失败'
    }
  }
})

router.get('/getFlow', async ctx => {
  ctx.body = {
    data: { "code": 200, "content": "查询成功", "data": { "flowId": "11", "canvasWidth": 700, "canvasHeight": 600, "nodeList": [{ "id": "node-3zs7tk7nco", "name": "中央储备粮天门直属油库", "left": "61px", "top": "40px", "deleted": false, "type": 0, "canDel": true }, { "id": "node-p4yoe1gba", "name": "大连北良港", "left": "93px", "top": "295px", "deleted": false, "type": 1, "canDel": true }, { "id": "node-c9yhn0xiw", "name": "中储粮（盘锦）物流有限公司\r\n辽宁省盘锦辽东湾新区荣兴港区纬四路", "left": "402px", "top": "143px", "deleted": false, "type": 2, "canDel": true }], "lineList": [{ "lineId": "line-6ktuc47cwt", "from": "node-3zs7tk7nco", "to": "node-p4yoe1gba", "transType": 0, "volume": "3333", "unitPrice": "9999" }, { "lineId": "line-i84wloyo19", "from": "node-3zs7tk7nco", "to": "node-c9yhn0xiw", "transType": 1, "volume": "9999", "unitPrice": "9999" }, { "lineId": "line-4pyoecfouo", "from": "node-c9yhn0xiw", "to": "node-p4yoe1gba", "transType": 2, "volume": "9999", "unitPrice": "9999" }, { "lineId": "line-ms7glxzcpl", "from": "node-3zs7tk7nco", "to": "node-p4yoe1gba", "transType": 2, "volume": "9999", "unitPrice": "9999" }] } }
  }
})

export default router
