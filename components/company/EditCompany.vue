<!-- 创建/编辑证券公司 -->
<template>
  <a-modal
    title="创建证券公司"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="取消"
    okText="确定"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="vertical">
        <a-row :gutter="32">
          <a-col :span="12">
            <a-form-item label="证券公司">
              <a-input
                v-decorator="['name',{
                    rules:[
                      {
                        required: true,
                        message: '证券公司名不能为空'
                      }
                    ]
                  }
                ]"
                placeholder="证券公司名"
              />
            </a-form-item>
            <a-form-item label="A股交易佣金费率">
              <a-input
                :min="0"
                :step="0.1"
                type="number"
                v-decorator="['stockCommissionRates',{
                    rules:[
                      {
                        required: true,
                        message: 'A股交易佣金费率不能为空'
                      }
                    ]
                  }
                ]"
                addonBefore="万"
                placeholder="请输入佣金费率"
              />
            </a-form-item>
            <a-form-item label="A股交易最低佣金">
              <a-input
                :min="0"
                :step="0.1"
                type="number"
                v-decorator="['stockCinCommission',{
                    rules:[
                      {
                        required: true,
                        message: 'A股交易佣金费率不能为空'
                      }
                    ]
                  }
                ]"
                addonAfter="元"
                placeholder="请输入最低佣金"
              />
            </a-form-item>
            <a-form-item label="ETF交易佣金费率">
              <a-input
                :min="0"
                :step="0.1"
                type="number"
                v-decorator="['etfCommissionRates',{
                    rules:[
                      {
                        required: true,
                        message: 'A股交易佣金费率不能为空'
                      }
                    ]
                  }
                ]"
                addonBefore="万"
                placeholder="请输入佣金费率"
              />
            </a-form-item>
            <a-form-item label="ETF交易最低佣金">
              <a-input
                :min="0"
                :step="0.1"
                type="number"
                v-decorator="['etfCinCommission',{
                    rules:[
                      {
                        required: true,
                        message: 'A股交易佣金费率不能为空'
                      }
                    ]
                  }
                ]"
                addonAfter="元"
                placeholder="请输入最低佣金"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否默认">
              <a-radio-group
                v-decorator="['isDefault', {
                  rules: [
                    {
                      required :true
                    }
                  ],
                  initialValue: 0
                }]"
              >
                <a-radio :value="0">否</a-radio>
                <a-radio :value="1">是</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="账户类型">
              <a-radio-group
                v-decorator="['accountType', {
                  rules: [
                    {
                      required :true
                    }
                  ],
                  initialValue: 0
                }]"
              >
                <a-radio :value="0">普通账户</a-radio>
                <a-radio :value="1">两融账户</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="年化融资利率" v-show="form.getFieldValue('accountType')===1">
              <a-input
                v-decorator="['financeRate',{
                    rules:[
                      {
                        required: form.getFieldValue('accountType')===1,
                        message: 'A股交易佣金费率不能为空'
                      }
                    ]
                  }
                ]"
                addonAfter="%"
                placeholder="请输入年化融资利率"
              />
            </a-form-item>
            <a-form-item label="沪市监管费(过户费)">
              <a-radio-group
                v-decorator="['shTransferFee', {
                  rules: [
                    {
                      required :true
                    }
                  ],
                  initialValue: 0
                }]"
              >
                <a-radio :value="0">不收取</a-radio>
                <a-radio :value="1">收取</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="深市监管费(过户费)">
              <a-radio-group
                v-decorator="['szTransferFee', {
                  rules: [
                    {
                      required :true
                    }
                  ],
                  initialValue: 0
                }]"
              >
                <a-radio :value="0">不收取</a-radio>
                <a-radio :value="1">收取</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      state: 0, // 0新增 1修改
      colOption: {
        label: {
          span: 6
        },
        wrapper: {
          span: 15
        }
      },
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false
    };
  },
  methods: {
    add(state) {
      this.state = 0;
      this.visible = true;
    },
    /* 提交表单 */
    handleOk(e) {
      let self = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.addCompany(values);
        }
      });
    },
    async addCompany(values) {
      const {
        status,
        data: { code, msg }
      } = await this.$axios.post("/api/company/addCompany", {
        ...values
      });
      if (status === 200) {
        if (code === 0) {
          this.$message.success(msg);
          this.visible = false;
        } else {
          this.$message.error(msg);
        }
      }
    },
    /* 关闭modal框 */
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped></style>
