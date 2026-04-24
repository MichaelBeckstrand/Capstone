import { Key } from 'webdriverio';
import testUrl from './testUrl.js';


class Engagements extends testUrl {

    get EngagementTab() {
        return $('span=Engagement'); }
    get editIcon() {
        return $('button[data-testid="editable-label-edit-button-title"]'); }
    get dashboardCaseButton() {
        return $('button[class="fui-NavItem rsiqttu ___2zedr90 fjf0vx2 f1f7voed f122n59 fly5x3f fv6wr3j f540s0x f1cmbuwj fby29hu f1ni9pe4 f12awlo f1lkqaok f15wkkf3"]'); }
    get engagementDoc()
    {   return $('div[class*="___17fy7t6"]'); }
    get inputNewTitle() {
        return $('input[data-testid="editable-label-title"]'); }
    get engagementSaveButton() {
        return $('[id*="primaryActionButton"]');
    }
    get executeButton() {
        return $('[data-testid="engagement-page-execute-doc-btn"]');
    }
    get applyTemplate() {
        return $('[data-testid="engagement-page-template-item-04b09f0a-cce7-48b2-a219-53c57ec0f68e"]');
    }
    get previewButton() {
        return $('[data-testid="engagement-page-toggle-doc-btn"]');
    }
    get unexecuteButton() {
        return $('[data-testid="engagement-executed-unexecute-menu-item"]');
    }
    get confirmExecuteButton() {
        return $('[data-testid="confirmation-dialog-confirm-button"]');
    }
    get showfieldsButton() {
        return $('[data-testid="engagement-page-toggle-doc-btn"]');
    }
    get kababUnexecuteMenu() {
        return $('[data-testid="engagement-executed-more-options-button"]');
    }
    get applyTemplateButton() {
        return $$('[data-testid="engagement-page-apply-template-btn"]')[0];
    }
    get engagementTextBox() {
        return $('[data-testid="engagement-page-field-textarea-blah"]');
    }
    get mtechAddSignatory() {
        return $$('[data-testid="link-button-Add Signatory"]')[0];
    }
    get signatureBox() {
        return $('input[data-testid="engagement-page-add-signatures-checkbox"]');
    }
    get addUserSignature() {
        return $('input.fui-Checkbox__input:not([data-testid="engagement-page-add-signatures-checkbox"])');
    }
    get selectUsersButton() {
        return $('[data-testid="select-users-dialog-submit"]');
    }
    get addClientSignatory() {
        return $$('[data-testid="link-button-Add Signatory"]')[1];
    }
    get addClientSignature() {
        return $$('input.fui-Checkbox__input:not([data-testid="engagement-page-add-signatures-checkbox"])')[0];
    }
    get selectContactsButton() {
        return $('[data-testid="select-contacts-submit-button"]');
    }
    get deleteMtechSignature() {
        return $$('[data-testid="person-control-delete-button"]')[1];
    }
    get deleteClientSignature() {
        return $$('[data-testid="person-control-delete-button"]')[2];
    }
    get removeFieldButton() {
        return $('[data-testid="engagement-page-remove-field-btn-blah"]');
    }

    async whenClickable(element) {
        await element.waitForExist({ timeout: 10000 });
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    async savingEngagementText(text) {
        await this.engagementTextBox.click();
        await browser.keys([Key.Control, 'a']);
        await browser.keys(text);
        await browser.keys(Key.Enter);
        await browser.pause(2000);
        await this.clickSaveButton();
        await browser.pause(2000);
        await browser.refresh();
        await browser.pause(2000);
    }

    async engagementTextRefresh(text) {
        await this.engagementTextBox.click();
        await browser.keys([Key.Control, 'a']);
        await browser.keys(text);
        await browser.keys(Key.Enter);
        await browser.pause(2000);
        await browser.refresh();
        await browser.pause(2000);
    }

    async addingUserSignature() {
        await this.addUserSignature.click();
        await this.selectUsersButton.click();
    }

    async deletingClientSignature() {
        const buttons = await $$('[data-testid="person-control-delete-button"]');
        await buttons[1].click();
        await browser.pause(3000);
    }

    async deletingMtechSignature() {
        await this.deleteMtechSignature.click();
        await browser.pause(3000);
    }

    async addingClientSignature() {
        await this.addClientSignature.click();
        await this.selectContactsButton.click();
    }

    async navigateToEngagements() {
        await this.engagementsTab.waitForClickable();
        await this.engagementsTab.click();
    }

    async clickSignatureBox() {
        await this.signatureBox.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.signatureBox);
    }

    async clickMtechAddSignatory() {
        await this.mtechAddSignatory.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.mtechAddSignatory);
    }

    async clickSelectUsersButton() {
        await this.selectUsersButton.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.selectUsersButton);
    }

    async clickClientAddSignatory() {
        await this.addClientSignatory.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.addClientSignatory);
    }

    async enterNewTitle(text) {
        await browser.pause(2000);
        await this.engagementDoc.moveTo();
        await this.editIcon.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.classList.remove('hidden'), await this.editIcon);
        await this.editIcon.click();
        await this.inputNewTitle.waitForDisplayed();
        await this.inputNewTitle.click();
        await browser.keys([Key.Control, 'a']);
        await browser.keys(text);
        await browser.keys(Key.Enter);
    }

    async saveEngagement() {
        await this.engagementSaveButton.waitForExist({ timeout: 10000 });
        await this.engagementSaveButton.waitForClickable({ timeout: 10000 });
        await this.engagementSaveButton.click();
        await browser.pause(2000);
    }

    async getDisplayedTitle() {
        return await this.titleDisplay.getText();
    }

    async selectCase() {
        await browser.url('https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97');
    }

    async clickEngagementTab() {
        await this.EngagementTab.waitForClickable();
        await this.EngagementTab.click();
        await this.engagementDoc.waitForDisplayed({ timeout: 10000 });
    }

    async clickEditIcon() {
        await this.editIcon.waitForClickable();
        await this.editIcon.click();
    }

    async typeNewTitle(text) {
        await this.inputNewTitle.setValue(text);
    }

    async clickSaveButton() {
        await this.engagementSaveButton.click();
    }
}

export default new Engagements();