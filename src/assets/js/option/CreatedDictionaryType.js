/**
 * @Description: 
 * @Version: 1.0
 * @Author: yyp
 * @Date: 2022-11-24 11:08:17
 * @LastEditors: CSDN
 * @LastEditTime: 2022-12-14 09:58:14
 * @FilePath: \web\src\assets\js\option\CreatedDictionaryType.js
 * @Copyright (c) 2022 by CSDN 3201595386@qq.com, All Rights Reserved. 
 */
export default function (self) {
    return {
        submitText: "完成",
        filterDic: true, // 过滤数据字典，设置为true返回的对象不会包含$前缀的字典翻译,
        span: 24,
        gutter: 42,
        labelPosition: "top",
        align: "center",
        menuAlign: "center",
        detail: false,
        printBtn: false,
        submitBtn: false,
        emptyBtn: false,
        column: [
            {
                label: "字典类型名称",
                placeholder: "请填写字典类型名称(如：政治面貌)",
                prop: "dictName",
                span: 24,
                display: true,
                maxlength: 30,
                showWordLimit: true,
                required: true,
                rules: [
                    {
                        required: true,
                        message: "请填写字典类型名称",
                    },
                ],
            },
            {
                label: "字典类型",
                placeholder: "请填写字典类型(如：politicalOutlook)",
                prop: "dictType",
                span: 24,
                display: true,
                maxlength: 30,
                showWordLimit: true,
                required: true,
                rules: [
                    {
                        required: true,
                        message: "请填写字典类型",
                    },
                ],
            },
            {
                label: "字典分类",
                placeholder: "请选择字典分类",
                prop: "type",
                type: "radio",
                value: 1,
                dicData: [
                    {
                        label: "数据库类型",
                        value: 0,
                    },
                    {
                        label: "业务类型",
                        value: 1,
                    },
                ],
                required: true,
                rules: [
                    {
                        required: true,
                        message: "请选择字典分类",
                    },
                ],
            },
            {
                label: "排序",
                prop: "sort",
                span: 24,
                display: true,
                type: "number",
            },
            {
                label: "备注",
                placeholder: "请填写字典备注",
                prop: "remark",
                span: 24,
                display: true,
                type: "textarea",
                maxlength: 255,
                showWordLimit: true,
                minRows: 3,
                maxRows: 5
            },
        ],
    }
}