<template>
    <div class="register">
        <h1>请注册</h1>
        <div class="register-box">
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

.register h1 {
    width: 100%;
    height: 20%;
    color: #dafff14a;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-box {
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

.register-btn {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.other-act {
    margin: auto 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.login-btn:hover,
.reset-btn:hover {
    color: white;
}
</style>