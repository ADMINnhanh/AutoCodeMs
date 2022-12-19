
//通用请求结构体
async function generalConstruction(self, method, str, data = {}, option, carrier) {
    let config = {
        url: self.$common.basePath + str,
        method,
    };
    if (method == 'post')
        config[carrier || 'data'] = data;
    else if (method == 'get' || method == 'delete')
        config[carrier || 'params'] = data;

    Object.assign(config, option)

    let returnData = null;
    await self
        .axios(config)
        .then(function (res) {
            // console.log(res);
            if (res.code == 200) {
                returnData = res.data || res;
            } else {
                self.$message.error(res.error || res.msg);
                console.error(res.error || res.msg);
            }
        })
        .catch(function (error) {
            console.error(error);
            self.$message.error(error);
        });
    return returnData;
}


export default {
    // 首页
    async dataStatistics(self) {
        return await generalConstruction(self, 'get', '/homepage/dataStatistics');
    },
    async projectTable(self) {
        return await generalConstruction(self, 'get', '/homepage/projectTable');
    },
    async codeGenerationNumber(self, data) {
        return await generalConstruction(self, 'post', '/homepage/codeGenerationNumber', data);
    },

    // 项目管理 
    async getPageByProject(self, data, option = {}) {
        return await generalConstruction(self, 'post', '/project/getPage', data, option);
    },
    async updateByProject(self, data) {
        return await generalConstruction(self, 'post', '/project/update', data);
    },
    async deleteByProject(self, data) {
        return await generalConstruction(self, 'delete', '/project/delete', data, null, 'data');
    },
    async addByProject(self, data) {
        return await generalConstruction(self, 'post', '/project/add', data);
    },
    async getListByProject(self) {
        return await generalConstruction(self, 'get', '/project/getList');
    },
    async getOneByProject(self, id) {
        return await generalConstruction(self, 'get', '/project/getOne/' + id);
    },
    async dataRecoveryByProject(self) {
        return await generalConstruction(self, 'get', '/project/dataRecovery');
    },
    async updateDataByProject(self, data) {
        return await generalConstruction(self, 'post', '/project/recoverData', data);
    },

    // 日志 
    async loginByLog(self, data) {
        return await generalConstruction(self, 'post', '/login/getPage', data);
    },
    async operationByLog(self, data) {
        return await generalConstruction(self, 'post', '/operation/getPage', data);
    },
    async errorByLog(self, data) {
        return await generalConstruction(self, 'post', '/error/getPage', data);
    },

    // 表管理
    async getPageByTable(self, data) {
        return await generalConstruction(self, 'post', '/table/getPage', data);
    },
    async copyByTable(self, data) {
        return await generalConstruction(self, 'post', '/table/copy', data, { showLoading: true, });
    },
    async getListByTable(self, data) {
        return await generalConstruction(self, 'post', '/table/getList', data);
    },

    // 联表管理
    async addByTableRelation(self, data) {
        return await generalConstruction(self, 'post', '/table-relation/add', data);
    },
    async updateByTableRelation(self, data) {
        return await generalConstruction(self, 'post', '/table-relation/update', data);
    },

    // 字典类型管理
    async getPageByDicttype(self, data, option = {}) {
        return await generalConstruction(self, 'post', '/dicttype/getPage', data, option);
    },
    async updateByDicttype(self, data) {
        return await generalConstruction(self, 'post', '/dicttype/update', data);
    },
    async addByDicttype(self, data) {
        return await generalConstruction(self, 'post', '/dicttype/add', data);
    },
    async deleteByDicttype(self, data) {
        return await generalConstruction(self, 'delete', '/dicttype/delete', data, null, 'data');
    },
    async getTypeByDicttype(self, data) {
        return await generalConstruction(self, 'get', '/dicttype/getByType', data);
    },

    // 功能管理 
    async updateFiledByFunction(self, data) {
        return await generalConstruction(self, 'post', '/function/updateField', data);
    },

    // 字段管理
    async getFieldByField(self, data) {
        return await generalConstruction(self, 'get', '/field/getFieldByTableId', data);
    },
}
