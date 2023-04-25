const path = require('path')

class DashboardPage {
    get userDisplayName() {
        return $('span[data-test-selector="SignedInWithHeader_headers_profileDropdown"]');
    }

    get dashboardLink() {
        return $('a[data-test-selector="SignedInWithHeader_headers_dashboardLink"]');
    }

    get dashboardHeader() {
        return $('h2[data-test-selector="Dashboard_dashboardHeader"]');
    }

    get startWorkflowButton() {
        return $('button[data-test-selector="Dashboard_newWorkflowButton"]');
    }

    get workflowList() {
        return $('ul[data-test-selector="Dashboard_newWorkflowDropdown"]');
    }

    get partialClass() {
        return $('*[class*="WorkflowLaunchModalFormPreview-module_title_"]');
    }

    get partialButton() {
        return $('*[href*="/workflows/launch/"]');
    }

    get workflowHeader() {
        return $('h2[data-test-selector="Workflow_workflowHeaderTitle"]');
    }
    
    get contractDivFileUpload() {
        return $('div[class="multi-file-form-element-input"]');
    }

    get contractInputFileUpload() {
        return $('#fileinput-draft');
    }

    get typeOfContractDropdown() {
        return $('div[class="Select-control"]');
    }

    get dropdownList() {
        return $$('div[class="Select-option"]');
    }

    get conterPartyName() {
        return $('#counterpartyName')
    }

    get conterPartySignerName() {
        return $('#signerfca7ddb8ee514932825b0aacec28b94a')
    }

    get conterPartySignerEmail() {
        return $('#signer4bbe38061bfb43229b46b2dac4add3e7')
    }

    get additionalDocRadioBtnNo() {
        return $('.radio-label=No');
    }

    get paymentsUnderContractRadioBtnNeither() {
        return $('.radio-label=Neither');
    }

    get contractSubmitBtn() {
        return $('button[data-test-selector="FormContainer_submitButton"]');
    }


    async validateUserDisplayName(display_name) {
        await expect(this.userDisplayName).toHaveText(display_name)
    }

    async clickDashboardLink() {
        await this.dashboardLink.click();
    }

    async validateDashboardHeader(expected_header) {
        await expect(this.dashboardHeader).toHaveText(expected_header)
    }

    async validateStartWorkflowBtn(button_name) {
        await expect(this.startWorkflowButton).toHaveText(button_name)
    }

    async clickStartWorkflowBtn() {
        await this.startWorkflowButton.click();
    }

    // Validates type of workflow by clicking and asserting title
    async validateWorkflowList() {
        const list = await this.workflowList.$$('li');
        const arr = ['Contract for Legal Review', 'MNDA', 'Sales Agreement'];
        let counter = 0
        for (const li of list) {
            await li.click()
            await expect(this.partialClass).toHaveText(arr[counter])
            console.log("---> FOR LOOP RESULTS --->>", await li.getText());
            counter += 1
        }
        await list[0].click()
    }

    async clickModalStartWorkflowBtn() {
        await this.partialButton.click()
    }

    async validateWorkflowDetails(header) {
        await expect(this.workflowHeader).toHaveText(header)
    }

    async uploadContractToReview() {
        await browser.pause(1000)

        // Uploads pdf file from the local path
        const filePath = '/Users/salim/Downloads/CaiCoOrderForm.pdf'
        const remoteFilePath = await browser.uploadFile(filePath)

        // Changes the element style in order to interact with it
        browser.execute( async (el) => 
            el.style.display = 'block',
            await this.contractInputFileUpload
        )
        await this.contractDivFileUpload.waitForDisplayed();
        await this.contractInputFileUpload.setValue(remoteFilePath);
        
        // Validates "What type of contract is this?" dropdown and selects Event Contract
        await this.typeOfContractDropdown.click();
        const list = await this.dropdownList;
        const array = ['Events Contract', 'MNDA', 'Other', 'Partner Agreement', 'Software Subscription Agreement', 'Statement of Work'];
        
        let counter = 0
        for (const item of list) {
            await expect(item).toHaveText(array[counter]);
            console.log(item.getText())
            counter += 1
        }
        await this.typeOfContractDropdown.click();
        await list[0].click();

        // Fill all required fields and click Submit button
        await this.conterPartyName.setValue('New Company');
        await this.conterPartySignerName.setValue('John Doe');
        await this.conterPartySignerEmail.setValue('johndoe@gmail.com');
        await this.additionalDocRadioBtnNo.click()
        await this.paymentsUnderContractRadioBtnNeither.click()
        
        await this.contractSubmitBtn.click()

        await browser.pause(1000);
    }

}
  
module.exports = new DashboardPage();