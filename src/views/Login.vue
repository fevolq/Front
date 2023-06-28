<template>
    <div class="login">
        <div class="title">
            <h1>天命</h1>
        </div>
        <div class="box">
            <div class="login-box">
                <h2>请登录</h2>
                <el-form
                :model="formData"
                label-width="0px"
                :rules="loginRule"
                ref="loginRef"
                class="form"
                >
                    <el-form-item prop="email" required>
                        <el-input v-model="formData.email" placeholder="邮箱">
                            <template #prepend>
                                <el-icon><Avatar /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" required>
                        <el-input v-model="formData.password" placeholder="密码" type="password" show-password>
                            <template #prepend>
                                <el-icon><Lock /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
    
                    <el-button type="primary" @click="onLogin" class="login-btn">
                        登录
                    </el-button>
                </el-form>
                <div class="other-act">
                  <el-button type="" link @click="onTemp" class="temp-btn">
                    尝试一下
                  </el-button>
                  <el-button type="primary" link @click="toRegister" class="register-btn">
                    无账号？去注册
                  </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import * as userApi from '../api/user.js'
import { useInstanceStore } from '../stores/instance.js'

const router = useRouter()
const store = useInstanceStore()

const formData = reactive({
  email: '',
  password: '',
})

const loginRef = ref(null)
const loginRule = {
  email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
}

const onLogin = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      userApi.login(formData).then((res) => {
        store.saveToken(res.token)
        router.push('/')
      })
    } else {
      return false
    }
  })
}

const onTemp = () => {
  userApi.temp().then((res) => {
    store.saveToken(res.token)
    router.push('/')
  })
}

const toRegister = () => {
  router.push('/register')
}

onMounted(() => {
  window.onkeydown = e => {
    switch (e.keyCode) {
      case 13 :
        document.querySelector('.login-btn').click()
        break
    }
  }
})

</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #35495e;
  height: 100vh;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  flex: 5;
}

.title h1 {
    color: #ebd0f978;
    width: 300px;

    text-align: center;
    letter-spacing: 70px;
    text-indent: 70px;
}

.box .login-box {
    background-color: rgba(255, 255, 255, 0.16);
    border-radius: 5px;

    display: flex;
    flex-direction: column;
}

.login-box h2 {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    letter-spacing: 50px;
    text-indent: 50px;

    margin-bottom: 10px;
    padding: 5px 0;
    border-bottom: 1px inset black;
}

.form {
    width: 300px;
    display: flex;
    flex-direction: column;

    margin: 10px 20px;
}

.login-btn {
    height: 36px;
}

.other-act {
    margin: 10px 20px 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.temp-btn,
.register-btn {
  color: rgba(202, 197, 197, 0.963);;
}

.temp-btn:hover,
.register-btn:hover {
    color: #409eff;
}
</style>