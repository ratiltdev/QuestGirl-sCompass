import { QuestChartPage } from './app.po';

describe('quest-chart App', () => {
  let page: QuestChartPage;

  beforeEach(() => {
    page = new QuestChartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
