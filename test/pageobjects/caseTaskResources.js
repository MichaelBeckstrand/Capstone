import { Tasks } from './taskResources.js';
import { Key } from 'webdriverio';

class CaseTasks extends Tasks {

    get caseAddTaskButton() {
        return $('[data-testid="case-tasks-add-task-button"]');
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
        await this.kebabMenuButton.waitForExist({ timeout: 30000 });
        const btns = await $$('[aria-label="More items"]');
        if (btns.length > 0) await this.forceClick(btns[0]);
        await $('[role="menu"]').waitForDisplayed({ timeout: 30000 });
    }

    async clickEditIcon() {
        await this.whenClickable(this.kebabMenuButton);
        await this.whenClickable($('[data-testid="custom-data-table-context-menu-item-Edit Task"]'));
    }

    async completeTask() {
        await this.whenClickable(this.milestoneFilterButton);
        const btns = await $$('[aria-label="More items"]');
        if (btns.length > 0) await this.forceClick(btns[0]);
        await this.whenClickable($('[data-testid="custom-data-table-context-menu-item-Complete Task"]'));
    }

    async closeTask() {
        await this.clickKebabMenu();
        await this.whenClickable($('[data-testid="custom-data-table-context-menu-item-Close Task"]'));
    }

    async clickCaseAddTimeButton() {
        await this.clickKebabMenu();
        await this.whenClickable(this.caseAddTimeButton);
    }

    async selectAssignTo() {
        await this.caseAvatar.waitForDisplayed({ timeout: 30000 });
        await this.whenClickable(this.assignUserDropdown);
        await $('[role="listbox"]').waitForDisplayed({ timeout: 30000 });
        await $('[role="option"]').waitForExist({ timeout: 30000 });
        await this.forceClick($('[role="option"]'));
    }

    async selectSecondAssignTo() {
        await this.whenClickable(this.assignUserDropdown);
        await this.whenClickable(this.assignToSecondOption);
    }

    async selectFirstCase() {
        await browser.url('https://app.thecasework.com/case/ba3e61e7-8a1e-405b-968f-d201059f4b97');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectSecondCase() {
        await browser.url('https://app.thecasework.com/case/5b1e2961-260a-4b1c-8f66-d7d0257ab0ee');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectThirdCase() {
        await browser.url('https://app.thecasework.com/case/96f47b09-3a45-4a13-9f27-83ab113a9550');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectFourthCase() {
        await browser.url('https://app.thecasework.com/case/d4d945c8-c966-4599-b647-8b9677997d43');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectFifthCase() {
        await browser.url('https://app.thecasework.com/case/0a535084-088e-4345-9114-c7dc79cc5cfe');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectSixthCase() {
        await browser.url('https://app.thecasework.com/case/b121cc5d-7310-4147-8bfd-7048a3c16ec3');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectSeventhCase() {
        await browser.url('https://app.thecasework.com/case/f05c478f-4211-47ad-8ea4-9ebce4f61bdc');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectEighthCase() {
        await browser.url('https://app.thecasework.com/case/a4430f97-e541-43ac-b9ec-2a5b59103029');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectNinthCase() {
        await browser.url('https://app.thecasework.com/case/3e759be4-26a3-4add-8238-a64194bc1ba3');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectTenthCase() {
        await browser.url('https://app.thecasework.com/case/6395222e-d225-492f-a6a3-7f0e021d1f3b');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectEleventhCase() {
        await browser.url('https://app.thecasework.com/case/4c7b571b-a2f5-4d86-84cb-b8f9dbb671bf');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectTwelfthCase() {
        await browser.url('https://app.thecasework.com/case/28398c10-f24c-4229-8246-d64eb2b1be58');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectThirteenthCase() {
        await browser.url('https://app.thecasework.com/case/5309d590-1c80-4d68-a0c3-6c323f09d922');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectFourteenthCase() {
        await browser.url('https://app.thecasework.com/case/a67bca0e-88fa-4df3-878f-ca5f99a38f46');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectFifteenthCase() {
        await browser.url('https://app.thecasework.com/case/7b21f610-32e7-40df-85a9-79a4f2e1ca4f');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectSixteenthCase() {
        await browser.url('https://app.thecasework.com/case/29c3bce5-4977-42ec-8957-a2a7c87fc104');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
    }

    async selectSeventeenthCase() {
        await browser.url('https://app.thecasework.com/case/3dd2a1b9-999d-43f3-a715-3a63c2d21f76');
        await this.whenClickable($('[data-testid="view-edit-case-tab-case-info"]'));
        await $('span=AUTOTEST_Client').waitForDisplayed({ timeout: 30000 });
        await this.whenClickable($('[data-testid="view-edit-case-tab-tasks"]'));
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
        await this.enterDueDateConditional();
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
