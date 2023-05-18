<template>
    <div class="login">
        <h1>请登录</h1>
        <div class="login-box">
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
                <el-button type="primary" link @click="toRegister" class="register-btn">
                    无账号？去注册
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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

const toRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #35495e;
    position: relative;
}

.login h1 {
    width: 100%;
    height: 20%;
    color: #dafff14a;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    padding: 20px ;

    background-color: rgba(255, 255, 255, 0.16);
    border-radius: 5px;
}

.form {
    display: flex;
    flex-direction: column;

    margin: 5px 20px;
}

.login-btn {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.other-act {
    margin: auto 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
}

.register-btn:hover {
    color: white;
}
</style>