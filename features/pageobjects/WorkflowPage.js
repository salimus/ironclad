class WorkflowPage {
    get workflowHeaderTitle() {
        return $('h2[data-test-selector="Workflow_workflowHeaderTitle"]');
    }
        
    get workflowContextPanel() {
        return $('div[class="workflow-context-panel-container"]');
    }
        
    get workflowStatusList() {
        return $('div[data-test-selector="Workflow_workflowStatusList"]');
    }

    get workflowActivityFeed() {
        return $('div[id=workflow-history-tabs-pane-all]');
    }


    async validateWorkflowHeaderTitle(title) {
        await expect(this.workflowHeaderTitle).toHaveText(title);
    }

    async validateWorkflowContextPanel() {
        await expect(this.workflowContextPanel).toBePresent();
    }

    async validateWorkflowStatusList() {
        await expect(this.workflowStatusList).toBePresent();
    }

    async validateWorkflowActivityFeed() {
        await expect(this.workflowActivityFeed).toBePresent();
    }

}
  
module.exports = new WorkflowPage();