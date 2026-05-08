import { Tasks } from './taskResources.js';
import { Key } from 'webdriverio';

class CaseTasks extends Tasks {

    get caseInfoTab() {
        return $('[data-testid="view-edit-case-tab-case-info"]');
    }

    get caseTaskTab() {
        return $('[data-testid="view-edit-case-tab-tasks"]');
    }

    get caseAddTaskButton() {
        return $('[data-testid="case-tasks-add-task-button"]');
    }

    get kebabMenuButton() {
        return $('[aria-label="More items"]');
    }

    get editTaskButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Edit Task"]');
    }

    get completeTaskButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Complete Task"]');
    }

    get closeTaskButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Close Task"]');
    }

    get caseAddTimeButton() {
        return $('[data-testid="custom-data-table-context-menu-item-Add Time"]');
    }

    get assignToSecondOption() {
        return $('[data-testid="user-filter-menu-0f9de2be-804b-425c-9602-38b4bac5c9a4-option"]');
    }

    get overdueIndicator() {
        return $('span=Overdue');
    }

    get clientLabel() {
        return $('span=AUTOTEST_Client');
    }

    get toastNotification() {
        return $('.fui-Toast');
    }

    async clickKebabMenu() {
        await this.kebabMenuButton.waitForExist({ timeout: 30000 });
        await this.kebabMenuButton.moveTo();
        await this.forceClick(this.kebabMenuButton);
        await this.findMenu.waitForDisplayed({ timeout: 30000 });
    }

    async clickEditIcon() {
        await this.whenClickable(this.kebabMenuButton);
        await this.whenClickable(this.editTaskButton);
    }

    async completeTask() {
        await this.clickKebabMenu();
        await this.whenClickable(this.completeTaskButton);
    }

    async closeTask() {
        await this.clickKebabMenu();
        await this.whenClickable(this.closeTaskButton);
    }

    async clickCaseAddTimeButton() {
        await this.clickKebabMenu();
        await this.whenClickable(this.caseAddTimeButton);
    }

    async selectAssignTo() {
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
        await this.whenClickable(this.assignUserDropdown);
        await this.listbox.waitForDisplayed({ timeout: 30000 });
        await this.option.waitForExist({ timeout: 30000 });
        await this.forceClick(this.option);
    }

    async selectSecondAssignTo() {
        await this.whenClickable(this.assignUserDropdown);
        await this.whenClickable(this.assignToSecondOption);
    }

    async goToCase(caseid) {
        await browser.url(`https://app.thecasework.com/case/${caseid}`);
        await this.whenClickable(this.caseInfoTab);
        await this.clientLabel.waitForDisplayed({ timeout: 30000 });
        await this.whenClickable(this.caseTaskTab);
    }

    async selectCaseNewMilestone() {
        browser.execute(() => window.focus());
        await this.whenClickable(this.selectMilestoneDropdown);
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
        await this.cancelEdit();
    }

    async editAllFieldsCase() {
        await this.clickEditIcon();
        await this.selectSecondAssignTo();
        await this.selectCaseNewMilestone();
        const newTaskDescription = `Updated task description ${Date.now()}`;
        await this.enterTaskText(newTaskDescription);
        await this.saveTask();
    }
}

export default new CaseTasks();
