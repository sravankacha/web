import { SravanProfilePage } from './app.po';

describe('sravan-profile App', function() {
  let page: SravanProfilePage;

  beforeEach(() => {
    page = new SravanProfilePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
