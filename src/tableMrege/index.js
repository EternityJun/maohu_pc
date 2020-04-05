// table表格合并
function tableMrege (data) {
  var array_a = []// 合并后的数据
  var index_ = {}// 每一项要合并的当前下标
  for (let i = 0; i < data.length; i++) {
    for (let obj_key in data[i]) { // 遍历键值对
      if (i == 0) {
        if (array_a[i]) { // 如果存在添加对应对象
          array_a[i][obj_key] = 1
        } else { // 如果不存在添加新的行
          array_a.push(JSON.parse(`{"${obj_key}":1}`))
        }
        index_[obj_key] = 0// 默认所有首个合并的下标
      } else {
        if (data[i][obj_key] == data[i - 1][obj_key]) { // 如果与上一行相等
          array_a[index_[obj_key]][obj_key] += 1// 对应的合并行数加一
          if (array_a[i]) { // 存在对应行
            array_a[i][obj_key] = 0
          } else {
            array_a.push(JSON.parse(`{"${obj_key}":0}`))
          }
        } else {
          if (array_a[i]) {
            array_a[i][obj_key] = 1
          } else {
            array_a.push(JSON.parse(`{"${obj_key}":1}`))
          }
          index_[obj_key] = i// 重置需要合并对应的下标
        }
      }
    }
  }
  return array_a
}
export default {
  tableMrege
}
