import { browser } from '@wdio/globals'


export default class testUrl {

    open (path) {
        return browser.url(`app.thecasework.com/`)
    }
}
