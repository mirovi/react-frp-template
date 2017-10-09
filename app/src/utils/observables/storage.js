import { sessionStorage, cookieStorage } from 'services/storage'

/**
 * Persists atom into storage
 * Do not use within components so it doesn't leak memory
 */
export const storageAtom = (key, initialValue, useCookies = false) => {
    const storage = useCookies ? cookieStorage : sessionStorage
    const atom = U.variable()

    U.toProperty(key).take(1).onValue((key) => {
        if (!R.isNil(storage.get(key))) {
            atom.set(storage.get(key))
        } else {
            atom.set(initialValue)
        }
    })

    Kefir.combine([U.toProperty(key), atom]).onValue(([key, value]) => {
        storage.set(key, value)
    })

    return atom
}
