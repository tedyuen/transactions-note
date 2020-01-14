<template>
  <a-layout id="components-layout-demo-custom-trigger" class="layout-frame">
    <a-layout-sider class="sider">
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <span slot="title">
            <a-icon type="mail"/>
            <span>券商资金</span>
          </span>
          <a-menu-item key="A1">
            <nuxt-link to="/company">券商列表</nuxt-link>
          </a-menu-item>
          <a-menu-item key="A2">
            <nuxt-link to="/capital">资金划转</nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <span slot="title">
            <a-icon type="appstore"/>
            <span>A股</span>
          </span>
          <a-menu-item key="B1">持仓查询</a-menu-item>
          <a-menu-item key="B2">买卖记录</a-menu-item>
          <a-menu-item key="B3">买卖利润</a-menu-item>
          <a-menu-item key="B4">分红管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="setting"/>
            <span>ETF</span>
          </span>
          <a-menu-item key="C1">持仓查询</a-menu-item>
          <a-menu-item key="C2">买卖记录</a-menu-item>
          <a-menu-item key="C3">买卖利润</a-menu-item>
          <a-menu-item key="C4">分红管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
            <a-icon type="setting"/>
            <span>账号</span>
          </span>
          <a-menu-item key="C1">登录账号</a-menu-item>
          <a-menu-item key="C4">资金账号(未开发)</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '16px 16px', minHeight: '680px' }">
        <nuxt/>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        本系统纯技术交流、学习使用
        <a href="https://github.com/tedyuen/transactions-note" target="_blank">开源</a>谢绝商用!!
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      current: ["mail"]
    };
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    }
  }
};
</script>
<style lang="less">
.layout-frame {
  .sider {
    min-height: 100vh;
  }
  .m-b-10 {
    margin-bottom: 10px;
  }
  .m-r-10 {
    margin-right: 10px;
  }
  .table-page-search-wrapper {
    .table-search-frame {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 15px;
      .ant-form-item-label {
        min-width: 70px !important;
      }
      .table-search-form {
        width: 80%;
      }
      .table-search-btn {
        width: 198px;
        margin-left: 20px !important;
      }
      .ant-form-item {
        margin-bottom: 10px !important;
      }
    }
    .ant-form-inline {
      .ant-form-item {
        display: flex;
        margin-bottom: 24px;
        margin-right: 0;

        .ant-form-item-control-wrapper {
          flex: 1 1;
          display: inline-block;
          vertical-align: middle;
        }

        > .ant-form-item-label {
          line-height: 32px;
          padding-right: 8px;
          width: auto;
        }
        .ant-form-item-control {
          height: 32px;
          line-height: 32px;
        }
      }
    }

    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
  }
}
</style>