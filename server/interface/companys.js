/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 23:25:19 
 * @Last Modified by:   Ted Yuen 
 * @Last Modified time: 2019-12-01 23:25:19 
 * @Desc: 证券公司接口
 */
import Router from 'koa-router';
import Company from '../dbs/models/company'

let router = new Router({ prefix: '/api/company' })

/**
 * 添加证券公司(测试)
 */
router.post('/addCompany', async (ctx) => {
  const company = new Company({
    name: '平安证券',
    isDefault: 0,
    accountType: 0,
    stockCommissionRates: 2.5,
    stockCinCommission: 0,
    etfCommissionRates: 2.5,
    etfCinCommission: 0,
    szTransferFee: 0,
    shTransferFee: 1
  })
  let result = await company.save();
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail'
    }
  }
})

/**
 * 获取所有证券公司信息
 */
router.get('/getAllCompanys', async ctx => {
  try {
    let result = await Company.find()
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
