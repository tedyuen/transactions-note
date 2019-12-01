/*
 * @Author: Ted Yuen 
 * @Date: 2019-12-01 23:50:08 
 * @Last Modified by: Ted Yuen
 * @Last Modified time: 2019-12-01 23:51:33
 * @Desc: 用户表
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Users = new Schema({
  // 登录用户名
  username: {
    type: String,
    unique: true,
    require: true
  },
  // 真实姓名
  realName: {
    type: String,
    require: true,
    default: ''
  },
  // email
  email: {
    type: String,
    require: true,
    default: ''
  },
  password: {
    type: String,
    require: true
  },
  createDate: {
    type: Date,
    require: true
  }
})

export default mongoose.model('Users', Users);