/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 22:24:09 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2019-12-01 23:51:18
 * @Desc: 证券信息
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schem

const StockRecord = new Schema({
  // 证券公司id
  companyId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 用户id
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 股票代码
  stockCode: {
    type: String,
    require: true
  },
  // 股票名称
  stockName: {
    type: String,
    require: true
  },
  //  股票类型 (1:a股 2:ETF)
  stockType: {
    type: Number,
    require: true,
    default: 1
  },
  // 当前价格 (单位元)
  price: {
    type: Number,
    require: true,
    default: 1
  }
})

export default mongoose.model('StockRecord', StockRecord);