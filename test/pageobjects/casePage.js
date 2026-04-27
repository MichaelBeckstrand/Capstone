// pageobjects/case.page.js
import Page from './page.js';

class CasePage extends Page {
    get firstCaseRow() { return $('.case-item-row'); }

    async selectAvailableCase() {
        await this.firstCaseRow.waitForDisplayed();
        await this.firstCaseRow.click();
    }
}

export default new CasePage();
