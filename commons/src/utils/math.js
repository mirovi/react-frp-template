import BigNumber from 'bignumber.js'

export const convertToBigNumber = U.seq(U.__,
    U.toString,
    U.lift((number) => new BigNumber(number))
)

export const plus = U.curry((number1, number2) => {
    const total = convertToBigNumber(number1).plus(convertToBigNumber(number2))

    return total.toString()
})

export const minus = R.curry((number1, number2) => {
    const total = convertToBigNumber(number1).minus(convertToBigNumber(number2))

    return total.toString()
})

export const multiply = R.curry((number1, number2) => {
    const total = convertToBigNumber(number1).times(convertToBigNumber(number2))

    return total.toString()
})

export const divide = R.curry((number1, number2) => {
    const total = convertToBigNumber(number1).dividedBy(convertToBigNumber(number2))

    return total.toString()
})
