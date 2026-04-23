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
    get milestoneDropdown() {
    return $('[data-testid="milestone-combobox"]');
   }
   get selectMilestoneDropdown() {
    return $('[role="option"]*=#1 - New Milestone');
}
  get selectNewMilestoneDropdown() {
    return $('[role="option"]*=#2 - Our Very First Milestone');
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

    async whenClickable(element) {
        await element.waitForClickable({ timeout: 10000 });
        await element.click();
    }

    async selectCase() {
        await this.whenClickable(this.caseDropdown);
        await this.selectCaseDropdown.waitForClickable({ timeout: 10000 });
        await this.selectCaseDropdown.click();
    }

    async selectMilestone() {
        browser.execute(() => window.focus())
        await this.whenClickable(this.milestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectMilestoneDropdown.click();
    }

    async selectNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.milestoneDropdown);
        await this.selectNewMilestoneDropdown.waitForClickable({ timeout: 10000 });
        await this.selectNewMilestoneDropdown.click();
    }

    async enterTaskText(text) {
        await this.taskTextBox.waitForClickable({ timeout: 10000 });
        await this.taskTextBox.click();
        await this.taskTextBox.setValue(text);
    }

    async enterDueDate() {
        await this.dueByCheckbox.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.dueByCheckbox);
        await this.selectDate.waitForClickable({ timeout: 10000 });
        await this.selectDate.click();
        await browser.keys(Key.Enter);
        
    }
    async enterNewDueDate() {
        await this.selectDate.waitForClickable({ timeout: 10000 });
        await this.selectDate.click();
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
        
    }

    async clickBillable() {
        await this.billableCheckbox.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.billableCheckbox);
    }

    async saveTask() {
        await this.whenClickable(this.saveTaskButton);
        await browser.pause(2000);
    }
    async clickOnEditTaskIcon() {
        await this.editTaskIcon.waitForExist({ timeout: 10000 });
        await browser.execute(el => el.click(), await this.editTaskIcon);
    }
    async editAllFields() {
        await this.clickOnEditTaskIcon();
        await browser.pause(2000);
        await this.selectNewMilestone();
        await browser.pause(2000);
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await browser.pause(2000);
        await this.clickBillable();
        await this.enterNewDueDate();
        await browser.pause(2000);
        await this.saveTask();
    
    }
}

export default new Tasks();  //task recources page 