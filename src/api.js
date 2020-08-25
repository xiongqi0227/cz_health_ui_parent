/** 全局ajax axios */
import axios from 'axios'
import { Message } from 'element-ui'

/** axios 基本项设置 */
axios.defaults.baseURL = 'http://localhost:10010/api'
axios.defaults.timeout = 3000

// 全局ajax错误处理
axios.interceptors.response.use(response => {
    return response
}, error => {
    Message.error(error.message)
    return Promise.reject(error)
})

/** 测试模板 */
export function test (user) {
    return axios.post('/test',user)
}
// ---------------知识库 start-----------------
//--------------- 运动项目库 start------------
/** 分页条件查询运动项目列表 */
export function findSplList(pageParams) {
    return axios.post('/kbservice/spl/findSplList',pageParams)
}
/** 添加运动项目 */
export function addSpl(splObj) {
    return axios.post('/kbservice/spl/addSpl',splObj)
}
/** 根据id查询运动项目 */
export function findSplById(splId) {
    return axios.get('/kbservice/spl/findSplById/'+splId)
}
/** 修改运动项目 */
export function editSpl(splForm) {
    return axios.put('/kbservice/spl',splForm)
}
/** 删除运动项目 */
export function deleteSpl(splId) {
    return axios.delete(`/kbservice/spl/${splId}`)
}
//--------------- 运动项目库 end------------

//--------------- 膳食库 start------------
/** 分页查询膳食库列表 */
export function findFbList(pageParams) {
    return axios.post('/kbservice/fb/findFbList',pageParams)
}
/** 添加食品 */
export function addFb(fbObj) {
    return axios.post('/kbservice/fb/addFb',fbObj)
}
/** 根据id查询食品 */
export function findFbById(fbId) {
    return axios.get('/kbservice/fb/findFbById/'+fbId)
}
/** 修改食品 */
export function editFb(fbObj) {
    return axios.put('/kbservice/fb',fbObj)
}
/** 删除食品 */
export function deleteFb(fbId) {
    return axios.delete(`/kbservice/fb/${fbId}`)
}
//--------------- 膳食库 end------------

//--------------- 疾病库 start------------
/** 分页条件查询疾病列表 */
export function findDbList(pageParams) {
    return axios.post('/kbservice/db/findDbList',pageParams)
}
/** 添加疾病 */
export function addDb(dbObj) {
    return axios.post('/kbservice/db/addDb',dbObj)
}
/** 根据id查询疾病 */
export function findDbById(dbId) {
    return axios.get('/kbservice/db/findDbById/'+dbId)
}
/** 修改疾病 */
export function editDb(dbForm) {
    return axios.put('/kbservice/db',dbForm)
}
/** 删除疾病 */
export function deleteDb(dbId) {
    return axios.delete(`/kbservice/db/${dbId}`)
}
//--------------- 疾病库 end------------

//--------------- 健康方案 start------------
/** 分页条件查询健康方案列表 */
export function findHpList(pageParams) {
    return axios.post('/kbservice/hp/findHpList',pageParams)
}
/** 添加健康方案 */
export function addHp(hpObj) {
    return axios.post('/kbservice/hp/addHp',hpObj)
}
/** 根据id查询健康方案 */
export function findHpById(hpId) {
    return axios.get('/kbservice/hp/findHpById/'+hpId)
}
/** 修改健康方案 */
export function editHp(hpForm) {
    return axios.put('/kbservice/hp',hpForm)
}
/** 删除健康方案 */
export function deleteHp(hpId) {
    return axios.delete(`/kbservice/hp/${hpId}`)
}
//--------------- 健康方案 end------------
// ---------------知识库 end-----------------

// ---------------会员管理 start-----------------
// ---------------会员档案 start-----------------
/** 分页条件查询会员档案列表 */
export function findMpList(pageParams) {
    return axios.post('/mmservice/mp/findMPList',pageParams)
}
/** 添加会员（基本信息） */
export function addMpei(mpeiObj) {
    return axios.post('/mmservice/mp/addMpei',mpeiObj)
}
/** 添加会员（动态信息） */
export function addMpDi(mpdiObj) {
    return axios.post('/mmservice/mp/addMpDi',mpdiObj)
}
/** 添加会员（病史） */
export function addMpMh(mpmhObj) {
    return axios.post('/mmservice/mp/addMpMh',mpmhObj) 
}
/** 获取档案号 */
export function getMPNumber() {
    return axios.get('/mmservice/mp/getMPNumber')
}
/** 删除会员档案 */
export function deleteMp(mpId) {
    return axios.delete(`/mmservice/mp/${mpId}`)
}
/** 根据id查询会员档案（基本信息） */ 
export function findMpEiById(mpId) {
    return axios.get('/mmservice/mp/findMpEiById/'+mpId)
}  
/** 根据id查询会员档案（动态信息） */
export function findMpDiById(mpId) {
    return axios.get('/mmservice/mp/findMpDiById/'+mpId)
}
/** 根据id查询会员档案（病史） */
export function findMpMhById(mpId) {
    return axios.get('/mmservice/mp/findMpMhById/'+mpId)
}
/** 修改会员档案（基本信息） */
export function editMpei(mpeiForm) {
    return axios.put('/mmservice/mp/editMpei',mpeiForm)
}
/** 修改会员档案（动态信息） */
export function editMpdi(mpdiForm) {
    return axios.put('/mmservice/mp/editMpdi',mpdiForm)
}
/** 修改会员档案（病史） */
export function editMpmh(mpmhForm) {
    return axios.put('/mmservice/mp/editMpmh',mpmhForm)
}
/** 查询所有健康管理师 */
export function findAllUser() {
    return axios.get('/ssservice/user/findAllUser')
}
// ---------------会员档案 end-----------------
// ---------------会员管理 end-----------------

// ---------------系统设置 start-----------------
// ---------------用户管理 start-----------------
/** 用户登录 */
export function login(userForm) {
    return axios.post('/ssservice/user/userLogin',userForm)
}
/** 根据电话号码查询用户 */
export function findUserByPhone(phoneObj) {
    return axios.post('/ssservice/user/findUserByPhone?phone='+phoneObj)
}
/** 修改密码 */
export function editPassword(userObj) {
    return axios.post('/ssservice/user/editPassword',userObj)
}
/** 发送短信 */
export function sendSms(phone) {
    return axios.post('/ssservice/sms?phone='+phone)
}
/** 电话号码登录 */
export function phoneLogin(phoneForm) {
    return axios.post('/ssservice/user/phoneLogin',phoneForm)
}
/** 注册用户 */
export function register(user) {
    return axios.post('/ssservice/user/register',user)
}
/** 分页条件查询用户列表 */
export function findUmList(pageParams) {
    return axios.post('/ssservice/user/findUmList',pageParams)
}
/** 根据id查询用户 */
export function findUmById(umId) {
    return axios.get('/ssservice/user/findUmById/'+umId)
}   
/** 修改用户 */
export function editUm(user) {
    return axios.put('/ssservice/user',user)
}
/** 删除用户 */
export function deleteUm(umId) {
    return axios.delete(`/ssservice/user/${umId}`)
}
// ---------------用户管理 end-----------------
// ---------------系统设置 end-----------------
