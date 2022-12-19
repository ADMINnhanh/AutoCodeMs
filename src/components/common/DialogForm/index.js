/**
 * @Description: 表单弹窗
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-24 14:30:58
 * @LastEditors: CSDN
 * @LastEditTime: 2022-11-24 16:29:04
 * @FilePath: \web\src\components\common\DialogForm\index.js
 * @Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
 */

import vue from 'vue'

import DialogForm from './DialogForm.vue'

const dialogForm = vue.extend(DialogForm)

function showToast(e) {

    const _toast = new dialogForm({
        data() {
            return e
        }
    })
    // 把实例化的 CustToast.vue 添加到 body 里 
    document.body.appendChild(_toast.$mount().$el)
}

export default showToast

