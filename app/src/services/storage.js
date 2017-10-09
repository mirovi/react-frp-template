// TODO set domain for cookies
const domain = '.test-app.test'

const createCookie = (name, value) => {
    const expireDate = new Date()
    expireDate.setMonth(expireDate.getMonth() + 12)
    const cookie = `${encodeURIComponent(name)}=${value};expires=${expireDate}; domain=${domain}; path=/; secure`
    document.cookie = cookie
}

const readCookie = (name) => {
    /* eslint-disable no-useless-escape */
    const rule = `(?:(?:^|.*;)\\s*${encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`
    /* eslint-enable no-useless-escape */
    return decodeURIComponent(document.cookie.replace(new RegExp(rule), '$1')) || null
}

const eraseCookie = (name) => {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/; secure`
}

export const sessionStorage = {
    get(key) {
        const value = window.sessionStorage.getItem(key)

        return value === 'undefined'
            ? undefined
            : value
                && JSON.parse(value)
                || null
    },

    set(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    },

    remove(key) {
        window.sessionStorage.removeItem(key)
    },

    clear() {
        window.sessionStorage.clear()
    }
}

export const cookieStorage = {
    get(key) {
        return readCookie(key)
    },

    set(key, value) {
        createCookie(key, value)
    },

    remove(key) {
        eraseCookie(key)
    }
}
