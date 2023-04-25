const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../pageobjects/HomePage');
const SigninPage = require('../pageobjects/SigninPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const WorkflowPage = require('../pageobjects/WorkflowPage');

Given(/^I am on the Ironclad home page and click on Sign In button$/, async () => {
    await HomePage.open();
    await HomePage.pageTitle('Ironclad: The Global Leader in Contract Management Software');
    await HomePage.clickSignIn();
})

When(/^I should be redirected to the Ironclad signin page$/, async () => {
    await SigninPage.pageTitle('Sign In ⋅ Ironclad');
    await SigninPage.signInHeader('Sign in to Ironclad')
});

When(/^I enter valid credentials and click the signin button$/, async () => {
    await SigninPage.signInEmail('creuroseibojo-7668@yopmail.com');
    await SigninPage.signInPassword('Test12345!1');
});

Then(/^I should be redirected to the Ironclad dashboard$/, async () => {
    await DashboardPage.validateUserDisplayName('First Last');
    await DashboardPage.clickDashboardLink();
    await DashboardPage.validateDashboardHeader('Dashboard')
});

When('I click the {string} button', async (start_workflow) => {
    await DashboardPage.validateStartWorkflowBtn(start_workflow)
    await DashboardPage.clickStartWorkflowBtn()

    await DashboardPage.validateWorkflowList()
    await DashboardPage.clickModalStartWorkflowBtn()
})

When('I enter workflow details for {string} and click the submit button', async (header) => {
    await DashboardPage.validateWorkflowDetails(header)
    await DashboardPage.uploadContractToReview()
})

Then(/^the new workflow should be created successfully$/, async () => {
    let title = 'Events Contract with New Company';
    await WorkflowPage.validateWorkflowHeaderTitle(title);
    await WorkflowPage.validateWorkflowContextPanel();
    await WorkflowPage.validateWorkflowStatusList();
    await WorkflowPage.validateWorkflowActivityFeed();
});