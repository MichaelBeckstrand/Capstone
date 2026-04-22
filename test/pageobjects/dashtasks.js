import testUrl from './testUrl.js';

class CasePage extends testUrl {
    get firstCaseRow() { return $('.case-item-row'); }

    async selectAvailableCase() {
        await this.firstCaseRow.waitForDisplayed();
        await this.firstCaseRow.click();
    }
}

export default new CasePage();