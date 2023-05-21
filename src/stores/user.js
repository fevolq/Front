import { reactive } from 'vue'
import { defineStore } from 'pinia'

import * as userApi from '../api/user.js'

export const useUserStore = defineStore('user', () => {
    const user = reactive({
      UID: null,
      Name: null,
      Email: null,
    })

    async function loadUser() {
      userApi.info().then((res) => { 
        user.UID = res.data['uid']
        user.Email = res.data['email']
        user.Name = res.data['uname']
      })
    }

    return { 
      user,
      loadUser,
    }
})