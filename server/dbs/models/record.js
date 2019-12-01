/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 10:51:10 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2019-12-01 22:30:21
 * @Desc: 交易记录
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SellRecords = new Schema({
  // 卖出价格
  sellPrice: {
    type: Number,
    requrie: true,
    default: 0
  },
  // 买入日期
  sellDate: {
    type: Date,
    require: true
  },
  // 卖出数量
  sellCount: {
    type: Number,
    require: true,
    deafult: 0
  },
  /**
   * 佣金
   * 
   * 证券公司佣金 = 价格 * 数量 * 手续费率。
   * 最高不超过成交金额的 3‰，最低 5 元起，单笔交易佣金不满 5 元按 5 元收取。
   */
  commission: {
    type: Number,
    require: true,
    default: 0
  },
  /**
   * 过户费
   * 
   * 过户费 = 价格 * 数量 * 0.02‰ 。
   * 按成交股票的金额 0.02‰ 收取，单位为元。
   * 一般沪市收取，深市不收取。
   */
  tansferFee: {
    type: Number,
    require: true,
    default: 0
  },
  // 印花税 (印花税 = 价格 * 数量 * 1‰)
  stampDuty: {
    type: Number,
    require: true,
    default: 0
  }
})
// 买入记录
const BuyRecords = new Schema({
  // 证券公司id
  companyId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 股票id
  stockId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 买入价格
  buyPrice: {
    type: Number,
    requrie: true,
    default: 0
  },
  // 买入日期
  buyDate: {
    type: Date,
    require: true
  },
  // 买入数量(股数)
  buyCount: {
    type: Number,
    require: true,
    default: 100
  },
  // 佣金
  commission: {
    type: Number,
    require: true,
    default: 0
  },
  // 过户费
  tansferFee: {
    type: Number,
    require: true,
    default: 0
  },
  // 卖出记录
  sellRecords: [SellRecords]
})

export default mongoose.model('BuyRecords', BuyRecords);