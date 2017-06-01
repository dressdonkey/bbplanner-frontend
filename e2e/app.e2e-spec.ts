import { BbplannerFrontendPage } from './app.po';

describe('bbplanner-frontend App', () => {
  let page: BbplannerFrontendPage;

  beforeEach(() => {
    page = new BbplannerFrontendPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
