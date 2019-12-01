/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 23:57:46 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2019-12-01 23:58:36
 * @Desc: 资本流向
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Capital = new Schema({
  // 用户id
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 证券公司id
  companyId: {
    type: Schema.Types.ObjectId,
    require: true
  },
  // 资金量 (单位元)
  amount: {
    type: Number,
    require: true,
    default: 0
  },
  // 类型： 0：转入 1:转出
  type: {
    type: Number,
    require: true,
    default: 0
  },
  // 资金转入/出日期
  createDate: {
    type: Date,
    requrie: true
  },
  // 资金转入/出更新日期
  updateDate: {
    type: Date,
    requrie: true
  }
})

export default mongoose.model('Capital', Capital);