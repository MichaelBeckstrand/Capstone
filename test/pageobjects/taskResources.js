import { Key } from 'webdriverio';

class Tasks {

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
        return $('[data-testid^="task-control-edit-"]');
    }
    get editTaskIcons() {
        return $$('[data-testid^="task-control-edit-"]');
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
    get overdueIndicator() {
        return $('//div[contains(@class, "fui-Badge") and contains(., "Overdue")]');
    }
    get caseAvatar() {
        return $('[data-testid="task-dialog-case-persona"]');
    }
    get listbox() {
        return $('[role="listbox"]');
    }
    get option() {
        return $('[role="option"]');
    }
    get findGrid() {
        return $('[role="grid"]');
    }
    get findMenu() {
        return $('[role="menu"]')
    }

    async whenClickable(element) {
        await element.waitForClickable({ timeout: 30000 });
        await element.click();
    }

    async forceClick(element) {
        await browser.execute(el => el.click(), await element);
    }

    async clearAndType(element, text) {
        await element.waitForClickable({ timeout: 30000 });
        await element.click();
        await browser.keys(['Meta', 'a']);
        await browser.keys(text);
    }

    async selectCase() {
        await this.whenClickable(this.caseDropdown);
        await this.listbox.waitForDisplayed({ timeout: 30000 });
        await this.option.waitForExist({ timeout: 30000 });
        await this.forceClick(this.option);
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
    }

    async selectMilestone() {
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
        await browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.listbox.waitForDisplayed({ timeout: 120000 });
        await this.option.waitForExist({ timeout: 120000 });
        await this.forceClick(this.option);
    }

    async selectMilestoneDashBoard() {
        await browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.option.waitForExist({ timeout: 30000, reverse: true });
    }

    async selectNewMilestone() {
        await browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.listbox.waitForDisplayed({ timeout: 30000 });
        await this.option.waitForExist({ timeout: 30000 });
        await this.option.click();
        await this.taskTextBox.waitForClickable({ timeout: 30000 });
    }

    async enterTaskText(text) {
        await this.clearAndType(this.taskTextBox, text);
        await browser.keys(Key.Enter);
    }

    async enterTaskTextEdit(text) {
        await this.clearAndType(this.taskTextBox, text);
        await browser.keys(Key.Enter);
    }

    async enterDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 30000 });
        await this.forceClick(this.dueByCheckbox);
        await this.whenClickable(this.selectDate);
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterPastDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 30000 });
        await this.forceClick(this.dueByCheckbox);
        await this.selectDate.waitForExist({ timeout: 30000 });
        await this.whenClickable(this.selectDate);
        await browser.keys(Key.ArrowLeft);
        await browser.keys(Key.Enter);
    }

    async enterAltDueDate() {
        await this.selectDate.waitForExist({ timeout: 30000 });
        await this.whenClickable(this.selectDate);
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
    }

    async clickBillable() {
        await this.billableCheckbox.waitForExist({ timeout: 30000 });
        await this.forceClick(this.billableCheckbox);
    }

    async saveTask() {
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.forceClick(this.saveTaskButton);
        await this.saveTaskButton.waitForClickable({ timeout: 30000, reverse: true });
    }

    async clickSave() {
        await this.whenClickable(this.saveTaskButton);
    }

    async clickAddTimeButton() {
        const taskRows = await this.editTaskIcon;
        if (taskRows.length > 0) {
            await taskRows[taskRows.length - 1].moveTo();
        }
        await this.selectAddtime.waitForExist({ timeout: 30000 });
        await this.forceClick(this.selectAddtime);
    }

    async enterHours(value) {
        await this.clickAddtimeTextField.waitForDisplayed({ timeout: 30000 });
        await this.clickAddtimeTextField.setValue(String(value));
    }

    async completeTask() {
        await this.completeTaskButton.waitForExist({ timeout: 30000 });
        await this.completeTaskButton.moveTo();
        await this.forceClick(this.completeTaskButton);
    }

    async closeTask() {
        await this.closeTaskButton.waitForExist({ timeout: 30000 });
        await this.closeTaskButton.moveTo();
        await this.forceClick(this.closeTaskButton);
    }

    async clickEditIcon() {
        await this.editTaskIcon.waitForExist({ timeout: 30000 });
        const editbtns = await this.editTaskIcons;
        if (editbtns.length > 0) {
            await editbtns[editbtns.length - 1].moveTo();
            await this.forceClick(editbtns[editbtns.length - 1]);
        }
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
        await this.whenClickable(this.assignUserDropdown);
        await this.selectNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.cancelEdit();
    }

    async editAllFields() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.whenClickable(this.assignUserDropdown);
        await this.selectNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.saveTask();
    }

    async editAllFieldsUnsavedDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.whenClickable(this.assignUserDropdown);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskTextEdit(newTaskDescription);
        await this.selectMilestone();
        await this.cancelEdit();
    }

    async editAllFieldsDashboard() {
        await this.clickEditIcon();
        await this.saveTaskButton.waitForExist({ timeout: 30000 });
        await this.whenClickable(this.assignUserDropdown);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskTextEdit(newTaskDescription);
        await this.selectMilestone();
        await this.saveTask();
    }

    async addingNotes() {
        await this.clickEditIcon();
        await this.whenClickable(this.noteButton);
        const noteText = `This is a test note ${Date.now()}`;
        await this.clearAndType(this.noteField, noteText);
        await this.whenClickable(this.addNoteButton);
    }
}

export { Tasks };
export default new Tasks();
