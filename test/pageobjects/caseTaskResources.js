import { Tasks } from './taskResources.js';
import { Key } from 'webdriverio';

class CaseTasks extends Tasks {

    get caseAddTaskButton() {
        return $('[data-testid="case-tasks-add-task-button"]');
    }
    get selectCaseNewMilestoneDropdown() {
        return $('[role="option"]*=#2 - New Milestone');
    }
    get assignToFirstOption() {
        return $('[role="menuitemradio"]');
    }
    get assignToSecondOption() {
        return $('[data-testid="user-filter-menu-0f9de2be-804b-425c-9602-38b4bac5c9a4-option"]');
    }
    get kebabMenuButton() {
        return $('[aria-label="More items"]');
    }
    get overdueIndicator() {
        return $('span=Overdue');
    }
    get caseAddTimeButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Add Time"]');
    }
    get milestoneFilterButton() {
        return $('span=Milestone');
    }

    async clickKebabMenu() {
        await $('[aria-label="More items"]').waitForExist({ timeout: 30000 });
        await browser.execute(() => {
            const btns = document.querySelectorAll('[aria-label="More items"]');
            if (btns.length > 0) btns[0].click();
        });
        await $('[role="menu"]').waitForDisplayed({ timeout: 30000 });
    }

    async clickEditIcon() {
        await this.whenClickable(this.kebabMenuButton);
        await $('[data-testid="custom-data-table-context-menu-item-Edit Task"]').waitForExist({ timeout: 30000 });
        await $('[data-testid="custom-data-table-context-menu-item-Edit Task"]').click();
    }

    async completeTask() {
        await this.milestoneFilterButton.waitForClickable({ timeout: 30000 });
        await this.milestoneFilterButton.click();
        await browser.execute(() => {
            const btns = document.querySelectorAll('[aria-label="More items"]');
            if (btns.length > 0) btns[0].click();
        });
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').waitForExist({ timeout: 30000 });
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="custom-data-table-context-menu-item-Complete Task"]').click();
    }

    async closeTask() {
        await this.clickKebabMenu();
        await $('[data-testid="custom-data-table-context-menu-item-Close Task"]').waitForExist({ timeout: 30000 });
        await $('[data-testid="custom-data-table-context-menu-item-Close Task"]').click();
    }

    async clickCaseAddTimeButton() {
        await this.clickKebabMenu();
        await this.caseAddTimeButton.waitForExist({ timeout: 30000 });
        await this.caseAddTimeButton.click();
    }

    async selectAssignTo() {
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
        await this.assignUserDropdown.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        await this.assignToFirstOption.waitForExist({ timeout: 30000 });
        await this.assignToFirstOption.waitForClickable({ timeout: 30000 });
        await this.assignToFirstOption.click();
    }

    async selectSecondAssignTo() {
        await this.assignUserDropdown.waitForExist({ timeout: 30000 });
        await this.assignUserDropdown.waitForClickable({ timeout: 30000 });
        await this.assignUserDropdown.click();
        await this.assignToSecondOption.waitForExist({ timeout: 30000 });
        await this.assignToSecondOption.waitForClickable({ timeout: 30000 });
        await this.assignToSecondOption.click();
    }

    async navigateToCasePage(url = 'https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97') {
        await browser.url(url);
        await $('[data-testid="view-edit-case-tab-case-info"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-case-info"]').click();
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-tasks"]').waitForClickable({ timeout: 30000 });
        await $('[data-testid="view-edit-case-tab-tasks"]').click();
        
    }

    async selectCaseNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
        await this.selectMilestoneDropdown.waitForClickable({ timeout: 30000 });
        await this.selectMilestoneDropdown.click();
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.ArrowDown);
        await browser.keys(Key.Enter);
        await this.taskTextBox.waitForClickable({ timeout: 30000 });
    }

    async editAllFieldsUnsavedCase() {
        await this.clickEditIcon();
        await this.selectSecondAssignTo();
        await this.selectCaseNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.cancelEdit();
    }

    async editAllFieldsCase() {
        await this.clickEditIcon();
        await this.selectSecondAssignTo();
        await this.selectCaseNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.enterDueDateConditional();
        await this.saveTask();
    }
}

export default new CaseTasks();
