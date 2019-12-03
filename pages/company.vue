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
                <a-form-item label="证券公司名称">
                  <a-input v-decorator="['companyName']"/>
                </a-form-item>
              </a-col>
              <a-col :span="10">
                <a-form-item label="证券公司名称">
                  <a-input v-decorator="['companyName']"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item>
                  <a-button type="primary">新增</a-button>
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
        <a-table
          :columns="columns"
          :dataSource="data"
          bordered
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
                <a @click="() => {}">设为默认</a>
              </span>
              <span>
                <a @click="() => {}">编辑</a>
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      columns: [
        {
          title: "证券公司",
          dataIndex: "name"
        },
        {
          title: "A股手续费",
          dataIndex: "stockCommissionRates"
        },
        {
          title: "A股最低手续费",
          dataIndex: "stockCinCommission"
        },
        {
          title: "ETF手续费",
          dataIndex: "etfCommissionRates"
        },
        {
          title: "ETF最低手续费",
          dataIndex: "etfCinCommission"
        },
        {
          title: "年化融资利率",
          dataIndex: "financeRate"
        },
        {
          title: "沪/深市监管费",
          dataIndex: "transferFee",
          scopedSlots: { customRender: "transferFee" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination: {
        total: 50,
        current: 1,
        position: "bottom"
      },
      data: []
    };
  },
  method: {
    handleSearch() {}
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
