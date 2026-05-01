import { Key } from 'webdriverio';
import testUrl from './testUrl.js';

class Engagements extends testUrl {

    get EngagementTab() { 
        return $('span=Engagement'); }

    get editIcon() { 
        return $('button[data-testid="editable-label-edit-button-title"]'); }
    get engagementDoc() { 
        return $('div[class*="___17fy7t6"]'); }
    get inputNewTitle() { 
        return $('input[data-testid="editable-label-title"]'); }
    get engagementSaveButton() { 
        return $('[id*="primaryActionButton"]'); }
    get executeButton() { 
        return $('[data-testid="engagement-page-execute-doc-btn"]'); }
    get applyTemplate() { 
        return $('[data-testid="engagement-page-template-item-04b09f0a-cce7-48b2-a219-53c57ec0f68e"]'); }
    get previewButton() { 
        return $('[data-testid="engagement-page-toggle-doc-btn"]'); }
    get unexecuteButton() { 
        return $('[data-testid="engagement-executed-unexecute-menu-item"]'); }
    get confirmExecuteButton() { 
        return $('[data-testid="confirmation-dialog-confirm-button"]'); }
    get showfieldsButton() { 
        return $('[data-testid="engagement-page-toggle-doc-btn"]'); }
    get kababUnexecuteMenu() { 
        return $('[data-testid="engagement-executed-more-options-button"]'); }
    get applyTemplateButton() { 
        return $$('[data-testid="engagement-page-apply-template-btn"]')[0]; }
    get engagementTextBox() { 
        return $('[data-testid="engagement-page-field-textarea-blah"]'); }
    get mtechAddSignatory() { 
        return $$('[data-testid="link-button-Add Signatory"]')[0]; }
    get signatureBox() { 
        return $('input[data-testid="engagement-page-add-signatures-checkbox"]'); }
    get addUserSignature() { 
        return $('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])'); }
    get selectUsersButton() { 
        return $('[data-testid="select-users-dialog-submit"]'); }
    get addClientSignatory() { 
        return $$('[data-testid="link-button-Add Signatory"]')[1]; }
    get addClientSignature() { 
        return $$('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])')[0]; }
    get selectContactsButton() { 
        return $('[data-testid="select-contacts-submit-button"]'); }
    get deleteMtechSignature() { 
        return $$('[data-testid="person-control-delete-button"]')[1]; }
    get deleteClientSignature() { 
        return $$('[data-testid="person-control-delete-button"]')[2]; }
    get removeFieldButton() { 
        return $('[data-testid="engagement-page-remove-field-btn-blah"]'); }
    get toastNotification() { 
        return $('.fui-Toast'); }
    get undoChangesButton() { 
        return $('button.fui-SplitButton__menuButton'); }
    get pdf() { return $('iframe'); }

    async whenClickable(element) {
        await element.waitForExist({ timeout: 30000 });
        await element.waitForClickable({ timeout: 30000 });
        await element.click();
    }

    async savingEngagementText(text) {
        await this.engagementTextBox.waitForClickable({ timeout: 30000 });
        await this.engagementTextBox.click();
        await browser.keys(['Command', 'a']);
        await this.engagementTextBox.addValue(text);
        await this.clickSaveButton();
        await this.toastNotification.waitForDisplayed({ timeout: 30000 });
        await browser.refresh();
        await this.applyTemplateButton.waitForDisplayed({ timeout: 30000 });
    }

    async engagementTextRefresh(text) {
        await this.engagementTextBox.waitForClickable({ timeout: 30000 });
        await this.engagementTextBox.click();
        await browser.keys(['Command', 'a']);
        await this.engagementTextBox.addValue(text);
        await browser.refresh();
        await this.applyTemplateButton.waitForDisplayed({ timeout: 30000 });
    }

    async addingUserSignature() {
        await $('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])').waitForExist({ timeout: 30000 });
        await browser.execute(el => el.click(), await this.addUserSignature);
        await this.selectUsersButton.click();
    }

    async deletingClientSignature() {
        const buttons = await $$('[data-testid="person-control-delete-button"]');
        await buttons[1].click();
    }

    async deletingMtechSignature() {
        await this.deleteMtechSignature.click();
    }

    async addingClientSignature() {
        await $('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])').waitForExist({ timeout: 30000 });
        await this.addClientSignature.click();
        await this.selectContactsButton.click();
    }

    async clickSignatureBox() {
        await this.signatureBox.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.click(), await this.signatureBox);
    }

    async clickMtechAddSignatory() {
        await $('[data-testid="link-button-Add Signatory"]').waitForExist({ timeout: 30000 });
        const signatoryButtons = await $$('[data-testid="link-button-Add Signatory"]');
        await browser.execute(el => el.click(), signatoryButtons[0]);
    }

    async clickSelectUsersButton() {
        await this.selectUsersButton.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.click(), await this.selectUsersButton);
    }

    async clickClientAddSignatory() {
        await this.addClientSignatory.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.click(), await this.addClientSignatory);
    }

    async enterNewTitle(text) {
        await this.engagementDoc.moveTo();
        await this.editIcon.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.classList.remove('hidden'), await this.editIcon);
        await this.editIcon.click();
        await this.inputNewTitle.waitForDisplayed();
        await this.inputNewTitle.click();
        await browser.keys([Key.Command, 'a']);
        await browser.keys(text);
        await browser.keys(Key.Enter);
    }

    async ensureUnexecuted() {
        try {
            await this.kababUnexecuteMenu.waitForExist({ timeout: 10000 });
            const kabab = await this.kababUnexecuteMenu;
            await kabab.waitForClickable({ timeout: 10000 });
            await browser.execute(el => el.click(), kabab);
            await this.whenClickable(this.unexecuteButton);
            await this.kababUnexecuteMenu.waitForExist({ reverse: true, timeout: 10000 });
            await this.pdf.waitForDisplayed({ timeout: 10000, reverse: true });
            await browser.refresh();
        } catch {}
    }

    async saveEngagement() {
        await this.engagementSaveButton.waitForExist({ timeout: 30000 });
        await this.engagementSaveButton.waitForClickable({ timeout: 30000 });
        await this.engagementSaveButton.click();
    }

    async clickEngagementTab() {
        await this.EngagementTab.waitForClickable();
        await this.EngagementTab.click();
        await this.engagementDoc.waitForDisplayed({ timeout: 30000 });
    }

    async clickSaveButton() {
        await this.engagementSaveButton.click();
    }
}

export default new Engagements();
