// data
import CreatedProject from '@/assets/js/option/CreatedProject.js'
import EditProject from '@/assets/js/option/EditProject.js'

// components
import DeleteProject from "@/components/modules/project/deleteProject.vue";

export default {
  components: {
    DeleteProject,
  },
  data: function () {
    return {
      // 创建项目
      created_project_option: CreatedProject,

      // 编辑项目
      edit_project_option: EditProject,

      // 删除项目
      delete_project_view: false,
      delete_project_data: undefined,

      dicttype: undefined
    };
  },
  mounted() {
    this.getTypeByDicttype();
  },
  methods: {
    // 字典类型
    async getTypeByDicttype() {
      let data = await this.api.getTypeByDicttype(this, { type: 0 });
      if (data) {
        // console.log(data);
        this.dicttype = data;
      }
    },

    // 创建项目
    async created_project() {
      let list = await this.api.getTypeByDicttype(this, {
        type: 0
      })
      if (list) {
        let created_project_option = this.created_project_option(this);
        created_project_option.column[1].dicData = list.map(e => ({
          label: e.dictType,
          value: e.id,
        }))
        created_project_option.column[1].value = list[0]?.id
        this.DialogForm({
          title: "创建项目",
          width: "812px",
          height: 328,
          option: created_project_option,
          callback: async (res) => {
            // console.log(res.data);
            let data = await this.api.addByProject(this, res.data)
            if (data.code == 200) {
              this.$message.success(data.msg);
              this.getPageByProject()
              res.close()
            } else {
              this.$message.error(data.error);
            }
          },
        });
      }
    },

    // 删除项目
    async deleteProject({ password, upData }) {
      if (password != '') {
        let data = await this.api.deleteByProject(this, {
          password: password,
          id: this.delete_project_data.id
        })
        // console.log(data);
        if (data) {
          this[upData]();
          this.$message.success(data.msg);
          this.delete_project_view = false
        }
      } else {
        this.$message.warning('请输入密码')
      }
    },
    // 项目卡片
    project_card_delete(e) {
      this.delete_project_view = true
      this.delete_project_data = e
    },
    project_card_view(e) {
      this.$router.push({
        name: "Table",
        query: {
          id: e.id,// 项目id
          datasourceType: e.datasourceType,// 数据库类型
          name: e.name,// 项目名称
          path: e.path,// 项目路径+模块名称
          prefix: e.prefix,// 项目的表的统一前缀
        },
      });
    },
    async project_card_edit(e, fun) {
      let list = await this.api.getTypeByDicttype(this, {
        type: 0
      })
      if (list) {
        this.e = e;// 用于 编辑时，重名验证
        let edit_project_option = this.edit_project_option(this);
        edit_project_option.column[2].dicData = list.map(e => ({
          label: e.dictType,
          value: e.id,
        }))
        edit_project_option.column[2].value = list[0]?.id
        this.DialogForm({
          title: "编辑项目",
          width: "812px",
          height: 618,
          data: e,
          option: edit_project_option,
          callback: async (res) => {
            // console.log(res);
            let data = await this.api.updateByProject(this, res.data)
            if (data.code == 200) {
              this.$message.success(data.msg);
              fun();
              res.close()
            } else {
              this.$message.error(data.error);
            }
          },
        });
      }
    },
  },
};
