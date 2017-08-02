import { ContactListAppPage } from './app.po';

describe('contact-list-app App', () => {
  let page: ContactListAppPage;

  beforeEach(() => {
    page = new ContactListAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
