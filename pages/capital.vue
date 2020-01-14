<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper m-b-10">
        <a-form
          :form="form"
          @submit="handleSearch"
          layout="inline"
          class="ant-advanced-search-form"
        >
          <div class="table-search-frame">
            <a-row :gutter="24" class="table-search-form">
              <a-col :span="10">
                <a-form-item label="选择日期">
                  <a-range-picker
                    v-decorator="['date']"
                    :placeholder="['开始日期','结束日期']"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="证券公司">
                  <a-select v-decorator="['companyId', { initialValue: -1 }]">
                    <a-select-option
                      v-for="item in companySelectData"
                      :key="item._id"
                      :value="item._id"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item>
                  <a-button type="primary" @click="()=>{this.$refs.editCompany.add(0);}">新增</a-button>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item>
                  <a-button type="primary" html-type="submit" class="m-r-10">查询</a-button>
                  <a-button
                    @click="
                    () => {
                      this.form.resetFields();
                    }
                  "
                  >重置</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </a-form>
      </div>
      <div class="card-container">
        <a-tabs defaultActiveKey="1" @change="chooseTabs">
          <a-tab-pane tab="Tab 1" :key="1"></a-tab-pane>
          <a-tab-pane tab="Tab 3" :key="2"></a-tab-pane>
        </a-tabs>
        <a-table
          :columns="columns"
          :dataSource="data"
          bordered
          rowKey="_id"
          :pagination="pagination"
          :locale="{emptyText:'暂无数据'}"
        >
          <template
            slot="transferFee"
            slot-scope="text, record"
          >沪:{{record.shTransferFee===0?'否':'是'}} / 深:{{record.szTransferFee===0?'否':'是'}}</template>
          <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
              <span>
                <a @click="() => {}">编辑</a>
              </span>
              <span v-if="record.isDefault === 1">
                <a @click="setDefault(record._id)">设为默认</a>
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </a-card>
    <edit-company ref="editCompany"/>
  </div>
</template>

<script>
import EditCompany from "../components/company/EditCompany";
export default {
  components: {
    EditCompany
  },
  data() {
    return {
      form: this.$form.createForm(this),
      columns: [
        {
          title: "证券公司",
          dataIndex: "name"
        },
        {
          title: "金额",
          dataIndex: "amount"
        },
        {
          title: "转入日期",
          dataIndex: "updateDate"
        },
        {
          title: "备注",
          dataIndex: "remark"
        },
        {
          title: "操作",
          dataIndex: "operation"
        }
      ],
      pagination: {
        total: 50,
        current: 1,
        position: "bottom"
      },
      data: [],
      companyList: []
    };
  },
  mounted() {
    this.getCompanyList();
  },
  computed: {
    companySelectData() {
      return [
        {
          _id: -1,
          name: "全部公司"
        },
        ...this.companyList
      ];
    }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      let date = this.form.getFieldValue("date");
      console.log(date);
    },
    // 获取资金列表
    async getCapitalList() {

    },
    // 获取公司列表
    async getCompanyList() {
      let companyName = this.form.getFieldValue("companyName");
      const {
        status,
        data: { list }
      } = await this.$axios.get("/api/company/getAllCompanys", {
        params: {
          companyName
        }
      });
      if (status === 200) {
        this.companyList = list;
      }
    },
    // 点击tab
    chooseTabs(key) {
      console.log(key);
    },
    // 设为默认
    async setDefault(_id) {
      const {
        status,
        data: { code, msg }
      } = await this.$axios.post("/api/company/setDefault", {
        id: _id
      });
      if (status === 200) {
        if (code === 0) {
          this.$message.success(msg);
          this.getCompanyList();
        } else {
          this.$message.error(msg);
        }
      }
    }
  }
};
</script>

<style lang="less">
.editable-row-operations {
  a {
    margin-right: 8px;
  }
}
</style>
