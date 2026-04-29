
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
        return $$('[data-testid^="task-control-complete-"]');
    }
    get closeTaskButton() {
        return $$('[data-testid^="task-control-complete-"]');
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
        await element.waitForClickable({ timeout: 20000 });
        await element.click();
    }

    async selectCase() {
        await this.whenClickable(this.caseDropdown);
        await $('[role="menu"]').waitForDisplayed({ timeout: 20000 });
        await $$('[role="menuitemradio"]')[1].waitForExist({ timeout: 20000 });
        await $$('[role="menuitemradio"]')[1].click();
        await this.caseAvatar.waitForDisplayed({ timeout: 20000 });
    }

    async selectMilestone() {
        await this.caseAvatar.waitForDisplayed({ timeout: 20000 });
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await $('[role="menuitemradio"]').waitForExist({ timeout: 30000 });
        await $('[role="menuitemradio"]').click();
    }
    async selectMilestoneDashBoard() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await $('[role="menuitemradio"]').waitForExist({ timeout: 30000, reverse: true });
    }

    async selectNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectMilestoneDropdown.click();
        await $('[role="menuitemradio"]').waitForExist({ timeout: 20000 });
        await $('[role="menuitemradio"]').click();
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
    }

    async enterTaskText(text) {
        await this.taskTextBox.waitForClickable({ timeout: 20000 });
        await this.taskTextBox.click();
        await this.taskTextBox.setValue(text);
        await browser.keys(Key.Enter);
    }

    async enterDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 20000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-dueby-checkbox"]').click();
        });
        await this.selectDate.waitForExist({ timeout: 20000 });
        await this.selectDate.waitForClickable({ timeout: 20000 });
        await this.selectDate.click();
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterPastDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-dueby-checkbox"]').click();
        });
        await this.selectDate.waitForExist({ timeout: 10000 });
        await this.selectDate.waitForClickable({ timeout: 10000 });
        await this.selectDate.click();
        
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterAltDueDate() {
        await this.selectDate.waitForExist({ timeout: 10000 });
        await this.selectDate.waitForClickable({ timeout: 10000 });
        await this.selectDate.click();
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
    }

    async clickBillable() {
        await this.billableCheckbox.waitForExist({ timeout: 20000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-billable-button"]').click();
        });
    }

    async saveTask() {
        await this.saveTaskButton.waitForClickable({ timeout: 10000 });
        await this.saveTaskButton.click();
        await this.saveTaskButton.waitForDisplayed({ timeout: 10000, reverse: true });
    }

    async clickSave() {
        await this.saveTaskButton.waitForClickable({ timeout: 10000 });
        await this.saveTaskButton.click();
    }

    async clickAddTimeButton() {
        const taskRows = await $$('[data-testid^="task-control-edit-"]');
        if (taskRows.length > 0) {
            await taskRows[taskRows.length - 1].moveTo();
        
        }
        await this.selectAddtime.waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btn = document.querySelector('[data-testid="timercontrol-add-time-button"]');
            if (btn) btn.click();
        });
        
    }

    async enterHours(value) {
        await this.clickAddtimeTextField.waitForExist({ timeout: 10000 });
        await this.clickAddtimeTextField.waitForClickable({ timeout: 10000 });
        await this.clickAddtimeTextField.setValue(String(value));
        
    }

    async completeTask() {
        await $('[data-testid^="task-control-complete-"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-complete-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
        
    }

    async closeTask() {
        await $('[data-testid^="task-control-close-"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-close-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
        
    }

    async clickOnEditTaskIcon() {
        await this.editTaskIcon.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.editTaskIcon);
    }

    async clickEditIcon() {
        await $('[data-testid^="task-control-edit-"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const editbtn = document.querySelectorAll('[data-testid^="task-control-edit-"]');
            if (editbtn.length > 0) editbtn[editbtn.length - 1].click();
        });
    }

    async cancelEdit() {
        await this.whenClickable(this.cancelTaskButton);
    }

    async enterDueDateConditional() {
        const datepickerExists = await this.selectDate.isExisting();
        if (datepickerExists) {
            await this.enterAltDueDate();
        } else {
            const checkboxExists = await this.dueByCheckbox.isExisting();
            if (checkboxExists) {
                await this.enterDueDate();
            }
        }
    }

    async editAllFieldsUnsaved() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();
        
        await this.selectNewMilestone();
        
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        
        await this.enterDueDateConditional();
        
        await this.cancelEdit();
        
    }

    async editAllFields() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();
        
        await this.selectNewMilestone();
        
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        
        await this.enterDueDateConditional();
        
        await this.saveTask();
        
    }

    async editAllFieldsUnsavedDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();

        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);

        await this.enterDueDateConditional();

        await this.selectMilestone();

        await this.cancelEdit();
        await this.cancelTaskButton.waitForDisplayed({ timeout: 10000, reverse: true });
    }

    async editAllFieldsDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 10000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 10000 });
        await this.assignUserDropdown.click();

        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);

        await this.enterDueDateConditional();

        await this.selectMilestone();
        await this.enterDueDateConditional();
        

        
    
        

        await this.saveTask();
    }

    async addingNotes() {
        await this.clickEditIcon();
        await this.whenClickable(this.noteButton);
        await this.whenClickable(this.noteField);
        const noteText = `This is a test note ${Date.now()}`;
        await this.noteField.setValue(noteText);
        await this.whenClickable(this.addNoteButton);
        await this.whenClickable(this.cancelTaskButton);
    }
}
export { Tasks };
export default new Tasks();
