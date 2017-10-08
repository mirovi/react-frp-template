import React from 'karet'
import R from 'ramda'
import Kefir from 'kefir'
import K, * as U from 'karet.util'
import { Promise } from 'bluebird'

Promise.config({
    warnings: process.env.NODE_ENV === 'development',
    longStackTraces: process.env.NODE_ENV === 'development',
    cancellation: false,
    monitoring: process.env.NODE_ENV === 'development'
})

const log = (value, logType = 'log') => {
    console[logType](value) // eslint-disable-line no-console
    return value
}

const consoleLog = U.lift((val) => console.log(val) || val) // eslint-disable-line no-console

global.Promise = Promise
global.React = React
global.R = R
global.Kefir = Kefir
global.K = K
global.U = U
global.log = log
global.U.consoleLog = consoleLog
