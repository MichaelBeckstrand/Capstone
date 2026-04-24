
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
        return $('[data-testid="milestone-combobox"]');
    }



    
    
    get selectAddtime() {
        return $('[data-testid="timercontrol-add-time-button"]');
    }
    get clickAddtimeTextField() {
        return $('[data-testid="add-timeentry-fortask-hours-input"]');
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


    async whenClickable(element) {
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    async selectCase() {
        await this.whenClickable(this.caseDropdown);
        await this.selectCaseDropdown.waitForClickable({ timeout: 10000 });
        await this.selectCaseDropdown.click();
        await browser.keys(Key.Enter);
        await browser.keys(Key.ArrowDown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
    }

    async selectMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectMilestoneDropdown.click();
        await browser.keys(Key.Enter);
        await browser.keys(Key.Enter);
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
    }

    async selectNewMilestone() {
         browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectMilestoneDropdown.click();
        await browser.keys(Key.Enter);
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
    }

    async enterTaskText(text) {
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
        await this.taskTextBox.click();
        await browser.pause(2000)
        await this.taskTextBox.setValue(text);
        await browser.keys(Key.Enter);
    }

    async enterDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-dueby-checkbox"]').click();
        });
        await browser.pause(3000);
        await this.selectDate.waitForExist({ timeout: 10000 });
        await this.selectDate.waitForClickable({ timeout: 10000 });
        await this.selectDate.click();
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
        await this.billableCheckbox.waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            document.querySelector('[data-testid="task-dialog-billable-button"]').click();
        });
    }

    async saveTask() {
        await this.saveTaskButton.waitForClickable({ timeout: 10000 });
        await this.saveTaskButton.click();
        await this.saveTaskButton.waitForDisplayed({ timeout: 10000, reverse: true });
    }


    async completeTask() {
        await $('[data-testid^="task-control-complete-"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-complete-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
        await browser.pause(2000);
    }

    async closeTask() {
        await $('[data-testid^="task-control-close-"]').waitForExist({ timeout: 10000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[data-testid^="task-control-close-"]');
            if (btns.length > 0) btns[btns.length - 1].click();
        });
        await browser.pause(2000);
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
        await browser.pause(2000);
        await this.selectNewMilestone();
        await browser.pause(2000);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await browser.pause(2000);
        await this.enterDueDateConditional();
        await browser.pause(2000);
        await this.cancelEdit();
        await browser.pause(2000);
    }

    async editAllFields() {
        await this.clickEditIcon();
        await browser.pause(2000);
        await this.selectNewMilestone();
        await browser.pause(2000);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await browser.pause(2000);
        await this.enterDueDateConditional();
        await browser.pause(2000);
        await this.saveTask();
        await browser.pause(2000);
    }
     async addingNotes() {
        await this.clickEditIcon();
        await browser.pause(2000);
        await this.whenClickable(this.noteButton);
        await browser.pause(2000);
        await this.whenClickable(this.noteField);
        const noteText = `This is a test note ${Date.now()}`;
        await this.noteField.setValue(noteText);
        await browser.pause(2000);
        await this.whenClickable(this.addNoteButton);
        await browser.pause(5000);
        await this.whenClickable(this.cancelTaskButton);
}
}
export { Tasks };
export default new Tasks();
