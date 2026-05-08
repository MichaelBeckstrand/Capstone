import { Key } from 'webdriverio';

class Engagements {

    get EngagementTab() {
        return $('span=Engagement');
    }

    get editIcon() {
        return $('button[data-testid="editable-label-edit-button-title"]');
    }

    get inputNewTitle() {
        return $('input[data-testid="editable-label-title"]');
    }

    get engagementSaveButton() {
        return $('[id*="primaryActionButton"]');
    }

    get executeButton() {
        return $('[data-testid="engagement-page-execute-doc-btn"]');
    }

    get unexecuteButton() {
        return $('[data-testid="engagement-executed-unexecute-menu-item"]');
    }

    get confirmExecuteButton() {
        return $('[data-testid="confirmation-dialog-confirm-button"]');
    }

    get kababUnexecuteMenu() {
        return $('[data-testid="engagement-executed-more-options-button"]');
    }

    get applyTemplate() {
        return $('[data-testid="engagement-page-template-item-04b09f0a-cce7-48b2-a219-53c57ec0f68e"]');
    }

    get applyTemplateButton() {
        return $$('[data-testid="engagement-page-apply-template-btn"]')[0];
    }

    get previewButton() {
        return $('[data-testid="engagement-page-toggle-doc-btn"]');
    }

    get showfieldsButton() {
        return $('[data-testid="engagement-page-toggle-doc-btn"]');
    }

    get engagementTextBox() {
        return $('[data-testid="engagement-page-field-textarea-blah"]');
    }

    get removeFieldButton() {
        return $('[data-testid="engagement-page-remove-field-btn-blah"]');
    }

    get mtechAddSignatory() {
        return $$('[data-testid="link-button-Add Signatory"]')[0];
    }

    get addClientSignatory() {
        return $$('[data-testid="link-button-Add Signatory"]')[1];
    }

    get signatureBox() {
        return $('input[data-testid="engagement-page-add-signatures-checkbox"]');
    }

    get addUserSignature() {
        return $('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])');
    }

    get selectUsersButton() {
        return $('[data-testid="select-users-dialog-submit"]');
    }

    get addClientSignature() {
        return $$('input[id^="checkbox-"]:not([data-testid="engagement-page-add-signatures-checkbox"])')[0];
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

    get signatureDeleteButton() {
        return $$('[data-testid="person-control-delete-button"]');
    }

    get toastNotification() {
        return $('.fui-Toast');
    }

    get pdf() {
        return $('iframe');
    }

    async whenClickable(element) {
        await element.waitForExist({ timeout: 30000 });
        await element.waitForClickable({ timeout: 30000 });
        await element.click();
    }

    async forceClick(element) {
        await browser.execute(el => el.click(), await element);
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
        await this.addUserSignature.waitForExist({ timeout: 30000 });
        await this.forceClick(this.addUserSignature);
        await this.selectUsersButton.click();
    }

    async addingClientSignature() {
        await this.addUserSignature.waitForExist({ timeout: 30000 });
        await this.addClientSignature.click();
        await this.selectContactsButton.click();
    }

    async deletingMtechSignature() {
        await (await this.deleteMtechSignature).waitForClickable({ timeout: 30000 });
        await this.deleteMtechSignature.click();
    }

    async deletingClientSignature() {
        await (await this.deleteClientSignature).waitForClickable({ timeout: 30000 });
        const buttons = await this.signatureDeleteButton;
        await buttons[1].click();
    }

    async clickSignatureBox() {
        await this.signatureBox.waitForExist({ timeout: 30000 });
        await this.forceClick(this.signatureBox);
    }

    async clickMtechAddSignatory() {
        await this.mtechAddSignatory.waitForClickable({ timeout: 30000 });
        await this.forceClick(this.mtechAddSignatory);
    }

    async clickClientAddSignatory() {
        await this.addClientSignatory.waitForExist({ timeout: 30000 });
        await (await this.addClientSignatory).waitForClickable({ timeout: 30000 });
        await this.forceClick(this.addClientSignatory);
    }

    async enterNewTitle(text) {
        await this.editIcon.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.classList.remove('hidden'), await this.editIcon);
        await this.editIcon.click();
        await this.inputNewTitle.waitForDisplayed();
        await this.inputNewTitle.click();
        await browser.keys(['Command', 'a']);
        await browser.keys(text);
        await browser.keys(Key.Enter);
    }

    async ensureUnexecuted() {
        try {
            await this.kababUnexecuteMenu.waitForExist({ timeout: 10000 });
            const kabab = await this.kababUnexecuteMenu;
            await kabab.waitForClickable({ timeout: 10000 });
            await this.forceClick(kabab);
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

    async clickSaveButton() {
        await this.engagementSaveButton.click();
    }

    async clickEngagementTab() {
        await this.EngagementTab.waitForClickable();
        await this.EngagementTab.click();
    }
}

export default new Engagements();
