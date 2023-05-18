import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useInstanceStore = defineStore('instance', () => {
    let token = computed(() => localStorage.getItem('token'))
    
    function saveToken(value) {
        if (value) {
            localStorage.setItem('token', value)
        }
    }

    return { 
        token,
        saveToken,
    }
})