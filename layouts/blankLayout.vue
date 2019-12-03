<template>
  <div>
    <nuxt/>
  </div>
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
}
</style>