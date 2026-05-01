import { Key } from 'webdriverio';
import testUrl from './testUrl.js';

class Tasks extends testUrl {

    get addTaskButton() {
        return $('[data-testid="link-button-Add Task"]');
    }
    get caseDropdown() {
        return $('[data-testid="case-filter-menu"]');
    }
    get selectCaseDropdown() {
        return $('[data-testid="case-control-e3eba00b-1d70-4a5e-92a4-61111f5521f8"]');
    }
    get selectMilestoneDropdown() {
        return $('[data-testid="milestone-dropdown-menu"]');
    }
    get selectAddtime() {
        return $('[data-testid="timercontrol-add-time-button"]');
    }
    get clickAddtimeTextField() {
        return $('[data-testid="add-timeentry-fortask-hours-input"]');
    }
    get submitTimeButton() {
        return $('[data-testid="add-timeentry-fortask-submit-button"]');
    }
    get assignUserDropdown() {
        return $('[data-testid="user-filter-menu"]');
    }
    get taskDescriptionInput() {
        return $('[data-testid="task-description-input"]');
    }
    get saveTaskButton() {
        return $('[data-testid="task-dialog-save-button"]');
    }
    get cancelTaskButton() {
        return $('[data-testid="task-dialog-cancel-button"]');
    }
    get billableCheckbox() {
        return $('[data-testid="task-dialog-billable-button"]');
    }
    get dueByCheckbox() {
        return $('[data-testid="task-dialog-dueby-checkbox"]');
    }
    get selectDate() {
        return $('[data-testid="task-dialog-datepicker"]');
    }
    get taskTextBox() {
        return $('[data-testid="task-dialog-textarea"]');
    }
    get editTaskIcon() {
        return $('[data-testid="task-control-edit-57def966-ecb3-4ab9-ae53-1d91962278e2"]');
    }
    get completeTaskButton() {
        return $('[data-testid^="task-control-complete-"]');
    }
    get closeTaskButton() {
        return $('[data-testid^="task-control-close-"]');
    }
    get noteButton() {
        return $('[data-testid="task-dialog-notes-toggle-button"]');
    }
    get noteField() {
        return $('[data-testid="case-note-input"]');
    }
    get addNoteButton() {
        return $('[data-testid="case-note-add-button"]');
    }
    get taskHeader() {
        return $('//div[contains(text(), "Add Task")]')
    }
    get overdueIndicator() {
        return $('//div[contains(@class, "fui-Badge") and contains(., "Overdue")]');
    }
    get missingRequired() {
        return $('.fui-MessageBarBody');
    }
    get caseAvatar() {
        return $('[data-testid="task-dialog-case-persona"]');
    }

    async whenClickable(element) {
        await element.waitForClickable({ timeout: 30000 });
        await element.click();
    }

    async selectCase() {
        await this.whenClickable(this.caseDropdown);
        await $('[role="menu"]').waitForDisplayed({ timeout: 30000 });
        await $$('[role="menuitemradio"]')[0].waitForExist({ timeout: 30000 });
        await $$('[role="menuitemradio"]')[0].click();
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
    }

    async selectMilestone() {
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await $$('[role="menuitemradio"]')[0].waitForExist({ timeout: 120000 });
        await $$('[role="menuitemradio"]')[0].click();
    }

    async selectMilestoneDashBoard() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await $('[role="menuitemradio"]').waitForExist({ timeout: 30000, reverse: true });
        await $('[role="menuitemradio"]').click();
    }

    async selectNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await $('[role="menuitemradio"]').waitForExist({ timeout: 30000 });
        await $('[role="menuitemradio"]').click();
        await this.taskTextBox.waitForClickable({ timeout: 30000 });
    }

    async enterTaskText(text) {
        await this.taskTextBox.waitForClickable({ timeout: 30000 });
        await this.taskTextBox.click();
        await this.taskTextBox.setValue(text);
        await browser.keys(Key.Enter);
    }

    async enterDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-dueby-checkbox"]').click();
        });
        await this.selectDate.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-datepicker"]').click();
        });
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterPastDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-dueby-checkbox"]').click();
        });
        await this.selectDate.waitForExist({ timeout: 30000 });
        await this.selectDate.waitForClickable({ timeout: 30000 });
        await this.selectDate.click();
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterAltDueDate() {
        await this.selectDate.waitForExist({ timeout: 30000 });
        await this.selectDate.waitForClickable({ timeout: 30000 });
        await this.selectDate.click();
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
    }

    async clickBillable() {
        await this.billableCheckbox.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-billable-button"]').click();
        });
    }

    async saveTask() {
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-save-button"]').click();
        });
        await this.saveTaskButton.waitForClickable({ timeout: 30000, reverse: true });
    }

    async clickSave() {
        await this.saveTaskButton.waitForClickable({ timeout: 30000 });
        await this.saveTaskButton.click();
    }

    async clickAddTimeButton() {
        const taskRows = await $$('[data-testid^="task-control-edit-"]');
        if (taskRows.length > 0) {
            await taskRows[taskRows.length - 1].moveTo();
        }
        await this.selectAddtime.waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            const btn = document.querySelector('[data-testid="timercontrol-add-time-button"]');
            if (btn) btn.click();
        });
    }

    async enterHours(value) {
        await this.clickAddtimeTextField.waitForExist({ timeout: 30000 });
        await this.clickAddtimeTextField.waitForClickable({ timeout: 30000 });
        await this.clickAddtimeTextField.setValue(String(value));
    }

    async completeTask() {
        await $('[data-testid^="task-control-complete-"]').waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-complete-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
    }

    async closeTask() {
        await $('[data-testid^="task-control-close-"]').waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-close-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
    }

    async clickOnEditTaskIcon() {
        await this.editTaskIcon.waitForExist({ timeout: 30000 });
        await browser.execute(el => el.click(), await this.editTaskIcon);
    }

    async clickEditIcon() {
        await $('[data-testid^="task-control-edit-"]').waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            const editbtn = document.querySelectorAll('[data-testid^="task-control-edit-"]');
            if (editbtn.length > 0) editbtn[editbtn.length - 1].click();
        });
    }

    async cancelEdit() {
        await this.whenClickable(this.cancelTaskButton);
    }

    async enterDueDateConditional() {
        await this.dueByCheckbox.waitForExist({ timeout: 30000 });
        const datepickerExists = await this.selectDate.isExisting();
        if (datepickerExists) {
            await this.enterAltDueDate();
        } else {
            await this.enterDueDate();
        }
    }

    async editAllFieldsUnsaved() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        await this.selectNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.cancelEdit();
    }

    async editAllFields() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        await this.selectNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.saveTask();
    }

    async editAllFieldsUnsavedDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.selectMilestone();
        await this.cancelEdit();
    }

    async editAllFieldsDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.selectMilestone();
        await this.saveTask();
    }

    async addingNotes() {
        await this.clickEditIcon();
        await this.whenClickable(this.noteButton);
        await this.whenClickable(this.noteField);
        const noteText = `This is a test note ${Date.now()}`;
        await this.noteField.setValue(noteText);
        await this.whenClickable(this.addNoteButton);
    }

    async selectFirstCase() {
        await browser.url('https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectSecondCase() {
        await browser.url('https://app.thecasework.com/case/5b1e2961-260a-4b1c-8f66-d7d0257ab0ee');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectThirdCase() {
        await browser.url('https://app.thecasework.com/case/96f47b09-3a45-4a13-9f27-83ab113a9550');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectFourthCase() {
        await browser.url('https://app.thecasework.com/case/d4d945c8-c966-4599-b647-8b9677997d43');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectFifthCase() {
        await browser.url('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectSixthCase() {
        await browser.url('https://app.thecasework.com/case/b121cc5d-7310-4147-8bfd-7048a3c16ec3');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectSeventhCase() {
        await browser.url('https://app.thecasework.com/case/f05c478f-4211-47ad-8ea4-9ebce4f61bdc');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectEighthCase() {
        await browser.url('https://app.thecasework.com/case/a4430f97-e541-43ac-b9ec-2a5b59103029');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectNinthCase() {
        await browser.url('https://app.thecasework.com/case/3e759be4-26a3-4add-8238-a64194bc1ba3');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectTenthCase() {
        await browser.url('https://app.thecasework.com/case/6395222e-d225-492f-a6a3-7f0e021d1f3b');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectEleventhCase() {
        await browser.url('https://app.thecasework.com/case/4c7b571b-a2f5-4d86-84cb-b8f9dbb671bf');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectTwelfthCase() {
        await browser.url('https://app.thecasework.com/case/28398c10-f24c-4229-8246-d64eb2b1be58');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectThirteenthCase() {
        await browser.url('https://app.thecasework.com/case/5309d590-1c80-4d68-a0c3-6c323f09d922');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }

    async selectFourteenthCase() {
        await browser.url('https://app.thecasework.com/case/a67bca0e-88fa-4df3-878f-ca5f99a38f46');
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
    }
}

export { Tasks };
export default new Tasks();
