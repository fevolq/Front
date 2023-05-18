import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = {
        UID: null,
        Name: null,
        Email: null,
    }

    function loadUser() {

    }

    return { 
        user,
        loadUser,
    }
})