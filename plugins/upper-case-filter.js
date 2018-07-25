import Vue from 'vue'

const upper = (value) => {
    if ( ! value) return ''
    value = value.toString()
    return value.toUpperCase()
}

Vue.filter('upperCase', upper)