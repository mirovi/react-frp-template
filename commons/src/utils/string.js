export const toLowerFirst = (str) => {
    const string = String(str)

    return string[0].toLowerCase() + string.slice(1)
}

export const toUpperFirst = (str) => {
    const string = String(str)

    return string[0].toUpperCase() + string.slice(1)
}

export const toCamelCase = R.compose(
    toLowerFirst,
    R.join(''),
    R.map(toUpperFirst),
    R.split('_'),
    R.toLower()
)
