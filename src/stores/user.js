import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = {
        UID: null,
        Name: null,
        Email: null,
    }

    function loadUser(data) {
        user.UID = data['uid']
        user.Email = data['email']
        user.Name = data['uname']
    }

    return { 
        user,
        loadUser,
    }
})