import { browser } from '@wdio/globals'



export default class testUrl {

    url (path) {
        return browser.url(`app.thecasework.com/`)
    }
}
