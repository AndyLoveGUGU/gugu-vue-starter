<template>
  <div class="py-5 container">
    Hello
  </div>
</template>
<script>
import commonMixin from "../mixin/common";

export default {
  mixins: [commonMixin],
  data: function () {
    return {
      name: '',
      gender: '',
      phone: '',
      courses: [],
      verify_status_account: '' // 帳戶認證狀態  1=認證中  2=認證完成  3=認證失敗  其他=未認證
    };
  },
};
</script>
