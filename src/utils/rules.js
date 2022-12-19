/*
 * @Author: xcl
 * @Date: 2022-04-20 16:40:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-20 16:52:09
 * @Description: 表单验证工具类
 */
export default {
  /**
   * 验证数字
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  checkNumber: function (rule, value, callback) {
    if (value) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg =
        /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      setTimeout(() => {
        if (!regPos.test(value) || regNeg.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    } else {
      callback();
    }
  },

  /**
   * 验证电话
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   * @param {*} type 
   */
  telephoneValidator: function (rule, value, callback, type) {
    var telReg = /^1[3|4|5|7|8|9][0-9]{9}$/;
    var fixReg = /\d{3}-\d{8}|\d{4}-\d{7}/;
    let valid = telReg.test(value) || fixReg.test(value) || !value;
    let errInfo = "请输入正确格式 (XXXXXXXXXXX或XXX-XXXXXXX)";
    if (type == 0) {
      //验证手机号和固定号码
      valid = telReg.test(value) || fixReg.test(value) || !value;
      errInfo = "请输入正确格式 (XXXXXXXXXXX或XXX-XXXXXXX)";
    } else if (type == 1) {
      //只验证手机号
      valid = telReg.test(value) || !value;
      errInfo = "请输入正确格式 (XXXXXXXXXXX)";
    } else if (type == 2) {
      //只验证固定号码
      valid = fixReg.test(value) || !value;
      errInfo = "请输入正确格式 (XXX-XXXXXXX)";
    }
    if (valid) {
      callback();
    } else {
      callback(new Error(errInfo));
    }
  },

  /**
   * 多个电话号码验证
   * @param {多个电话号码如：84709123,84547366} str 
   * @param {*} callback 
   */
  multiplePhoneValid(str, callback) {
    /**
     * 电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）
     */
    // let regNeg1 =
    //   /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;

    // 区号 - 电话 / (区号)电话 /（区号）电话 / (区号) - 电话 /（区号）-电话
    // 加区号总长11位 区号4就号码7 区号3就号码8
    let regNeg =
      /((02[0-9]|852|853|886|010)-\d{8})|(0[3-9]\d{2}-\d{7})|(\((02[0-9]|852|853|886|010)\)[-]?\d{8})|(\(0[3-9]\d{2}\)\d{7})|(（(02[0-9]|852|853|886|010)）[-]?\d{8})|(（0[3-9]\d{2}）\d{7})|(((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3|5|6|8|9|])|)\d{8})/

    if (str.indexOf(",") != -1) {
      if (str.split(",").every((e) => {
        console.log(e)
        return regNeg.test(e)
      })) {
        callback();
      } else {
        callback(new Error("请输入正确格式"));
      }
    } else {
      if (regNeg.test(str)) {
        callback();
      } else {
        callback(new Error("请输入正确格式"));
      }
    }
  },

  /**
   * 文本验证字符长度
   * @param {文本详细信息} rule 
   * @param {文本的值} value 
   * @param {回调函数} callback 
   * @param {文本类型 single为单行(20)，textarea为多行(128)} type 
   * @returns 
   */
  wordNumberValid(rule, value, callback, type) {
    if (value) {
      if (type == "single") {
        if (value.length > 20) {
          return callback(new Error("最大字数不能超过20个字"));
        }
        return callback();
      } else {
        if (value.length > 128) {
          return callback(new Error("最大字数不能超过128个字"));
        }
        return callback();
      }
    }
    return callback();
  },

  /**
   * 常见的正则验证
   */
  emailReg: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  mobileReg: /^1[34578]\d{9}$/,
  accountReg: /^[a-zA-Z]\w{4,15}$/, // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
  passwordReg: /^[a-zA-Z]\w{5,17}$/, // 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)
  chineseReg: /^[\u4e00-\u9fa5]{0,}$/, // 汉字\中文字符的正则表达式
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证号码验证

  tipPlacement: 'bottom',

  /**
   * 表名- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  tableNameStandard(rule, value, callback) {
    if (/^[a-z]+[0-9]*([_]{1}[a-z0-9]+)*$/.test(value) == false) {
      callback(new Error("不符合数据库表名命名规范，eg：user、t_user、t_user1、v1_user"));
    } else {
      //校验通过
      callback();
    }
  },
  tableNameStandardTip: '格式：以小写英文字母开头，字符可由数字、小写英文字母组成，可使用下划线隔开；eg：user、t_user、t_user1、v1_user',
  /**
   * 字段名- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  fieldNameStandard(rule, value, callback) {
    if (/^[a-z]+([_]{1}[a-z]+)*$/.test(value) == false) {
      callback(new Error("不符合数据库字段名称命名规范，eg：name、name_school"));
    } else {
      //校验通过
      callback();
    }
  },
  fieldNameStandardTip: '格式：以小写英文字母开头，字符可由小写英文字母组成，可使用下划线隔开；eg：name、name_school',
  /**
   * 项目路径+模块名称- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  pathNameStandard(rule, value, callback) {
    if (value && /^[a-z]+([.]{1}[a-z]+)*$/.test(value) == false) {
      callback(new Error("不符合命名规范，eg：com.wjtsc.code"));
    } else {
      //校验通过
      callback();
    }
  },
  pathNameStandardTip: '格式：以小写英文字母开头，字符由小写英文字母组成，可使用【.】隔开；eg：com.wjtsc.code',
  /**
   * 账户- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  userNameStandard(rule, value, callback) {
    //  校验账号的正则 
    if (/^[a-zA-Z0-9]{5,20}$/.test(value) == false) {
      callback(new Error("不符合账号规范"));
    } else {
      //校验通过
      callback();
    }
  },
  userNameStandardTip: '格式：允许5-20字节，账号可由英文字母、数字组成',
  /**
   * 密码- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  passwordNameStandard(rule, value, callback) {
    //  校验密码的正则 
    if (/^[a-zA-Z0-9@.]{8,20}$/.test(value) == false) {
      callback(new Error("不符合密码规范"));
    } else {
      //校验通过
      callback();
    }
  },
  passwordNameStandardTip: '格式：允许8-20字节，密码可由英文字母、数字、【@】、【.】组成',
  /**
   * 手机号- 规范验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   */
  phoneNameStandard(rule, value, callback) {
    //  校验英文的正则 
    if (value && /^1[34578]\d{9}$/.test(value) == false) {
      callback(new Error("不符合手机号规范"));
    } else {
      //校验通过
      callback();
    }
  },

  /**
   * 通过api进行重名验证
   * @param {*} rule 
   * @param {*} value 
   * @param {*} callback 
   * @param {*} safe 
   * @param {*} config 
   * @param {*} nameProp 
   * @param {*} idProp 
   * @returns 
   */
  byAPIDuplicationName(rule, value, callback, safe, config = {}, nameProp = 'name', idProp = 'id') {
    let self = safe;

    // console.log(safe.dialogType)
    // console.log(safe.dialogDataId)

    if (!value) {
      return;
    }
    self
      .axios(config)
      .then(function (res) {
        if (res.code === 200) {
          let data = res.data;
          // 编辑修改表单时，排除它本身之后，在进行重名验证
          if (safe.dialogType == 'edit') {
            data = data.filter((item) => {
              return item[idProp] !== safe.dialogDataId;
            });
          }
          let item = data.filter((item) => {
            return item[nameProp] === value;
          });
          if (item.length > 0) {
            callback(new Error(`【${value}】已存在！不可重名！`));
          } else {
            //校验通过
            callback();
          }
        } else {
          callback(new Error("请求错误"));
        }
      })
      .catch(function (error) {
        callback(new Error("Error"));
      });

  }
}