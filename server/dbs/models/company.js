/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 10:07:34 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2019-12-01 23:48:50
 * @Desc: 证券公司
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SecuritieCompany = new Schema({
  // 用户id
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 证券公司名字
  name: {
    type: String,
    unique: true,
    require: true
  },
  // 是否默认 0:默认 1:不是默认
  isDefault: {
    type: Number,
    require: true,
    default: 0
  },
  // 账户类型 0:普通账户 1:两融账户
  accountType: {
    type: Number,
    require: true,
    default: 1
  },
  // 股票交易佣金费率 (单位:万分之一)
  stockCommissionRates: {
    type: Number,
    require: true,
    default: 0
  },
  // 股票最低交易佣金 (单位:元)
  stockCinCommission: {
    type: Number,
    require: true,
    default: 0
  },
  // 场内基金交易佣金费率 (单位:万分之一)
  etfCommissionRates: {
    type: Number,
    require: true,
    default: 0
  },
  // 场内基金最低交易佣金 (单位:元)
  etfCinCommission: {
    type: Number,
    require: true,
    default: 0
  },
  // 深市是否收取监管费 (过户费 0: 不收取 1:收取)
  szTransferFee: {
    type: Number,
    require: true,
    default: 0
  },
  // 沪市是否收取监管费 (过户费 0: 不收取 1:收取)
  shTransferFee: {
    type: Number,
    require: true,
    default: 0
  },
  // 年化融资利率 (百分比)
  financeRate: {
    type: Number,
    require: true,
    default: 0
  }
})

export default mongoose.model('SecuritieCompany', SecuritieCompany);