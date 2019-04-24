import { Selector } from 'testcafe'

fixture`Getting Started`
  .page`https://mytripplanner.azurewebsites.net/`

test('Interface Tests for hrefs', async t => {
  await t

  // The home button redirects to the home page
    .click('#home')
    .expect(Selector('#welcome').innerText).eql('Welcome!')

    // redirect to the login home page
    .click('#login')
    .expect(Selector('#loggedIn').innerText).eql('Logged In!!')

    // The home button redirects to the home page
    .click('#homelog')
    .expect(Selector('#loggedIn').innerText).eql('Logged In!!')

    // redirect back to the home page
    .click('#logout')
    .expect(Selector('#welcome').innerText).eql('Welcome!')
})
