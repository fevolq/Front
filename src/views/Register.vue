<template>
    <div class="register">
        <div class="title">
            <h1>天命</h1>
        </div>
        <div class="box">
            <div class="register-box">
                <h2>请注册</h2>
                <el-form
                :model="formData"
                label-width="0px"
                :rules="rules"
                ref="registerRef"
                class="form"
                >
                    <el-form-item prop="name" required>
                        <el-input v-model="formData.name" placeholder="名称">
                            <template #prepend>
                                <el-icon><Avatar /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
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
    
                    <el-button type="primary" @click="onRegister" class="registe-btn">
                        注册
                    </el-button>
                </el-form>
                <div class="other-act">
                    <el-button type="primary" link @click="toLogin" class="login-btn">
                        去登陆
                    </el-button>
                    <el-button type="primary" link @click="onForgetPwd" class="reset-btn">
                        忘记密码
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import * as userApi from '../api/user.js'
import { useInstanceStore } from '../stores/instance.js'

const router = useRouter()
const store = useInstanceStore()

const formData = reactive({
    email: '',
    password: '',
})

const registerRef = ref(null)
const rules = {
    name: [{required: true, message: '名称不能为空', trigger: 'blur'}],
    email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
}

const onRegister = () => {
    registerRef.value.validate((valid) => {
        if (valid) {
            userApi.register(formData).then(() => {
                store.clearToken()
                ElMessage.success('注册成功')
                router.push('/')
            })
        } else {
            return false
        }
    })
}

const toLogin = () => {
    router.push('/login')
}

const onForgetPwd = () => {
    ElMessage.success('TODO')
}

</script>

<style scoped>
.register {
    width: 100%;
    height: 100%;
    background-color: #35495e;
    position: relative;
}

.register .title,
.register .box {
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title h1 {
    color: #ebd0f978;
    width: 300px;

    text-align: center;
    letter-spacing: 70px;
    text-indent: 70px;
}

.box .register-box {
    background-color: rgba(255, 255, 255, 0.16);
    border-radius: 5px;

    display: flex;
    flex-direction: column;
}

.register-box h2 {
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

.other-act {
    margin: 5px 20px 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.login-btn:hover,
.reset-btn:hover {
    color: white;
}
</style>