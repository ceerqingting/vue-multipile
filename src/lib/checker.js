/**
 * @file 展E宝公共校验方法文件
 *
 * @Author: copy
 * @Date: 2016-10-22 10:27:42
 */

const isChinese = (s) => {
  const pattern1 = /^[\u4E00-\u9FBF]+$/;
  const pattern2 = /^[\u3400-\u4DBF]+$/;
  const pattern3 = /^[\ue815-\ue864]+$/;
  return pattern1.test(s) || (pattern2.test(s) || pattern3.test(s));
};

/** *******************************************
 * 功能:获取字符串长度（汉字占两个字符）
 * 参数:无
 * 返回:
 **********************************************/

const nameLen = (s) => {
  let l = 0;
  const a = s.split('');
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].charCodeAt(0) < 299) {
      l += 1;
    } else {
      l += 2;
    }
  }
  return l;
};

// 检测中文字符个数
const calCStrNum = (str) => {
  const reg = /[\u4e00-\u9fa5]/g;  // 测试中文字符的正则
  if (reg.test(str)) {          // 使用正则判断是否存在中文
    return str.match(reg).length;
  }
  // 返回中文的个数
  return 0;
};

// 检测英文字符个数
const calEStrNum = (str) => {
  const reg = /[A-Z]/g;  // 测试大写英文字符的正则
  if (reg.test(str)) {
    return str.match(reg).length;
  }
  return 0;
};

// 计算中英文字符的长度
const calStrLen = (value) => {
  if (!value) return 0;
  return value.length + calCStrNum(value);
};

/**
 * check函数规范:通过则返回false,未通过则返回错误消息
 */
const checker = {
  checkNameAppoint(val) {
    const reg = /^[A-Za-z]+$/;
    let msg = false;
    if (val.length < 1) {
      msg = '称呼不能为空';
    } else if (val.length > 38) {
      msg = '称呼长度不能大于38位字符';
    } else if (!isChinese(val) && !reg.test(val)) {
      msg = '称呼只能为中文或者英文';
    }
    return msg;
  },

  checkNameBeneficiary: (value) => {
    const regHealth = /^([\u4e00-\u9fa5]{1,38}|[A-Z]{1,38}|[.·．\s])+$/;
    const trimVal = value.trim();
    if (trimVal === '') {
      return '姓名不能为空！';
    }
    if (nameLen(trimVal) > 38) {
      return '姓名的长度不能超过19个汉字，英文不能超过38个！';
    }

    const tempValue = trimVal.replace(/\s+/g, '');
    if (tempValue === '不详' || tempValue === '不祥' || tempValue === '未知' || tempValue === '不知道') {
      return '姓名格式不符合规范';
    }

    const tempTips = '姓名至少要有2个汉字或4个英文字母且只允许输入汉字、大写英文字母、半角点号"."、全角点号"·"及"．"';
    if (regHealth.test(trimVal)) {
      if (!(calCStrNum(trimVal) >= 2 || calEStrNum(trimVal) >= 4)) {
        return tempTips;
      }
      return false;
    }
    return tempTips;
  },

  checkIdNo: (idCard) => {
    const errorCode = ['验证通过!',
      '身份证号码输入错误，请重新输入',
      '身份证号码出生日期超出范围或含有非法字符!',
      '身份证号码输入错误，请重新输入',
      '身份证号码不能为空'];
    const area = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外',
    };
    let Y;
    let JYM;
    let S;
    let M;
    let idCardArray = [];
    idCardArray = idCard.split('');
    // 校验为空
    if (!idCard) {
      return errorCode[4];
    }
    // 地区检验
    if (area[parseInt(idCard.substr(0, 2), 10)] === null) {
      return errorCode[3];
    }

    // 身份号码位数及格式检验
    let ereg;
    switch (idCard.length) {
      case 15:
        if ((parseInt(idCard.substr(6, 2), 10) + 1900) % 4 === 0
          || ((parseInt(idCard.substr(6, 2), 10) + 1900) % 100 === 0
          && (parseInt(idCard.substr(6, 2), 10) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
        }
        if (ereg.test(idCard)) {
          return false;
        }
        return errorCode[2];
      case 18:
        // 18位身份号码检测
        // 出生日期的合法性检查
        // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
        // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
        if (parseInt(idCard.substr(6, 4), 10) % 4 === 0 ||
          (parseInt(idCard.substr(6, 4), 10) % 100 === 0 &&
          parseInt(idCard.substr(6, 4), 10) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}(19|[2-9][0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
        } else {
          ereg = /^[1-9][0-9]{5}(19|[2-9][0-9])[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
        }
        if (ereg.test(idCard)) { // 测试出生日期的合法性
          // 计算校验位
          S = ((parseInt(idCardArray[0], 10) + parseInt(idCardArray[10], 10)) * 7) +
            ((parseInt(idCardArray[1], 10) + parseInt(idCardArray[11], 10)) * 9) +
            ((parseInt(idCardArray[2], 10) + parseInt(idCardArray[12], 10)) * 10) +
            ((parseInt(idCardArray[3], 10) + parseInt(idCardArray[13], 10)) * 5) +
            ((parseInt(idCardArray[4], 10) + parseInt(idCardArray[14], 10)) * 8) +
            ((parseInt(idCardArray[5], 10) + parseInt(idCardArray[15], 10)) * 4) +
            ((parseInt(idCardArray[6], 10) + parseInt(idCardArray[16], 10)) * 2) +
            (parseInt(idCardArray[7], 10) * 1) +
            (parseInt(idCardArray[8], 10) * 6) +
            (parseInt(idCardArray[9], 10) * 3);
          Y = S % 11;
          M = 'F';
          JYM = '10X98765432';
          M = JYM.substr(Y, 1); // 判断校验位
          if (M === idCardArray[17]) {
            return false; // 检测ID的校验位
          }
          return errorCode[3];
        }
        return errorCode[2];
      default:
        return errorCode[1];
    }
  },

  checkPhone: (value) => {
    if (!value) return true;
    return !(/^(\+\d{2}-)?(13|14|15|17|18)\d{1}-?\d{5}(\d{3}|\*{3})$/.test(value.trim()));
  },

  // 邮件地址字符
  checkEmail: (value) => {
    if (!value){
      return "邮箱不能为空"
    }else{
      if(!(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value.trim()))){
        return "邮箱格式不正确"
      }else{
        return false;
      }
    }
  },

  calStrLen: (value) => {
    if (!value) return 0;
    return value.length + calCStrNum(value);
  },

  // checkAgentNo: (val) =>{
  //   let msg = false;
  //   let reg = /^\d{10}$/;
  //   if(val){
  //     if(!reg.test(val)){
  //       msg = "请输入正确的代码";
  //     }
  //   }else{
  //     msg =  "代码不能为空";
  //   }
  //   return msg;
  // },

  checkMessageCode: (val)=>{
    let msg = false;
    let reg = /^(\d{6})|(\d{7})$/;
    if(val){
      if(!reg.test(val)){
        msg = "请输入正确的验证码";
      }
    }else{
      msg =  "验证码不能为空";
    }
    return msg;
  },

  isEmpty: (val, msg) => {
    if(val) {
      return false;
    }else{
      return msg;
    }
  },
  // 护照
  checkPassport: (val) => {
    const reg = /^[A-Za-z0-9]+$/;
    let msg = false;
    if (val.length < 1) {
      msg = '护照不能为空';
    } else if (val.length < 3) {
      msg = '护照长度不能小于3位字符';
    } else if (val.length > 30) {
      msg = '护照长度不能大于30位字符';
    } else if (!reg.test(val)) {
      msg = '护照只能输入字母和数字';
    }
    return msg;
  },
  // 军人证
  checkMilitaryCard: (val) => {
    // 军人证 10-18 包含'字第' 字母、数字、汉字
    const reg = /^[\u4E00-\u9FA5a-zA-Z0-9]+$/;
    let msg = false;
    const valLen = calStrLen(val);
    if (valLen < 1) {
      msg = '军人证不能为空';
    } else if (val.indexOf('字第') === -1) {
      msg = '军人证必须包含\'字第\'';
    } else if (valLen < 10 || valLen > 18) {
      msg = '港澳台证长度必须在10位~18位字符之间';
    } else if (!reg.test(val)) {
      msg = '军人证只能输入字母、数字、中文';
    }
    return msg;
  },
  // 港澳台证件
  checkGangAoCard: (val) => {
    // 港澳台证件 8-30 字母、数字、汉字
    let msg = false;
    const valLen = calStrLen(val);
    if (valLen < 1) {
      msg = '港澳台证不能为空';
    } else if (valLen < 8 || valLen > 30) {
      msg = '港澳台证长度必须在8位~30位字符之间';
    } else if (!/^[\u4E00-\u9FA5a-zA-Z0-9]+$/.test(val)) {
      msg = '港澳台证只能输入字母、数字、中文';
    }
    return msg;
  },
  // 出生证
  checkBornCard: (val) => {
    // 出生证 10 数字、字母 10位，首位为大写字符
    const reg = /^[A-Z]{1}[A-Za-z0-9]{9}$/;
    let msg = false;
    if (!val) {
      msg = '出生证不能为空';
    } else if (!reg.test(val)) {
      msg = '出生证只能输入字母、数字，且字符长度为10';
    }
    return msg;
  },
  // 手机号
  checkTel: (val) => {
    const reg = /^1[34578]\d{9}$/;
    let msg = false;
    if (!val) {
      msg = '请输入手机号码';
    } else if (!reg.test(val)) {
      msg = '请输入正确的手机号';
    }
    return msg;
  },
  // 邮箱
  checkPostCode: (val) => {
    const reg = /^\d{6}$/;
    let msg = false;
    if (!val) {
      msg = '请输入邮政编码';
    } else if (!reg.test(val)) {
      msg = '请输入正确的邮政编码';
    }
    return msg;
  },
};

export default checker;
