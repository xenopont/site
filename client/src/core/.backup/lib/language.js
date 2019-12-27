const localStorageKey = 'currentLanguage'
let currentLanguage = localStorage.getItem(localStorageKey) || 'en_us'

module.exports = {
    get current() {
        return currentLanguage
    },
    set current(value) {
        currentLanguage = value
        localStorage.setItem(localStorageKey, value)
    }
}
