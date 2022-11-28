<script lang="ts" setup>
import { Form } from "ant-design-vue";
import { reactive, toRaw } from "vue";
import { useUserStore } from "store/user";
// 调用emit('to')方法进入后台
const emit = defineEmits(['to']);

const store = useUserStore()
const useForm = Form.useForm;
const form = reactive<Login.LoginForm>({
  account: "",
  password: "",
});
const rules = reactive({
  account: [
    {
      required: true,
      message: "请输入登录管理员账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入登录密码",
      trigger: "blur",
    },
  ],
});
const { validate, validateInfos } = useForm(form, rules);

function onSubmit() {
  validate()
    .then(async() => {
      await store.onLogin(toRaw(form));
      if (store.token) {
        emit('to')
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <div class="login-card">
    <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="账号" v-bind="validateInfos.account">
        <a-input
          autocomplete
          v-model:value="form.account"
          class="custom-input"
          @blur="validate('account', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password
          autocomplete
          class="custom-input"
          v-model:value="form.password"
          @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 10 }">
        <a-button type="primary" @click.prevent="onSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.login-card {
  width: 400px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff40;
  backdrop-filter: blur(5px);
  padding: 16px;
  transition: all .3s ease-in .2s;
  &::before {
    content: "登录";
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  input.custom-input {
    background: transparent !important;
    
  }
  .custom-input {
    background-color: transparent;
    input.ant-input {
      background-color: transparent !important;
    }
  }
  &:hover {
    backdrop-filter: blur(20px);
    transition: all .5s ease-out;
    box-shadow: 0px 1px 8px 0px #E4E5EC50;
  }
}
</style>

<style lang="less">
span.custom-input {
    background-color: transparent !important;
    input.ant-input {
      background-color: transparent !important;
    }
  }
</style>
