/**
 * const c = className(styles) //styles is css modules object: { fooFromStyles: 'foo123uHash'}
 * c('fooFromStyles', 'global--class', { foo: truthlyVal$, bar: falseyVal })
 *
 * output -> 'foo123uHash global--class foo'
 */
export default className = (styles = {}) => (...args) =>
    K(...args, (...clss) => {
        const classes = clss.map((cls) => typeof cls === 'string'
            ? styles[cls] || cls
            : U.seq(cls,
                U.keys,
                U.map((key) => cls[key]
                    ? styles[key] || key
                    : undefined
                ),
                U.filter(Boolean)))

        return U.join(' ', U.flatten(classes))
    })
