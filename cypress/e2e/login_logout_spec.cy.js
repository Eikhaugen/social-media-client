// Change url to be the url your live server is running
const url = 'http://127.0.0.1:8080';

// Fill in you username and password (note: I would not leave login information in a real world setting lol)
const validEmail = 'CodeMcCloud@stud.noroff.no';
const validPassword = 'lol123456789';

const invalidEmail = 'notCorrect@stud.noroff.no';
const invalidPassword = 'qwerty123456';

describe('Login and Logout functionality', () => {
  it(' checks that the user can log in with the login form with valid credentials', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear();
    cy.get('#loginEmail').type(validEmail, { force: true, delay: 20 });
    cy.get('#loginPassword').clear();
    cy.get('#loginPassword').type(invalidPassword, { force: true, delay: 20 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();
  });

  it('checks that the user can log out with the logout button', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear();
    cy.get('#loginEmail').type(validEmail, { force: true, delay: 20 });
    cy.get('#loginPassword').clear();
    cy.get('#loginPassword').type(validPassword, { force: true, delay: 20 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();
    cy.get('.btn-outline-warning').click();
  });

  it('checks that the user cannot submit the login form with invalid credentials and is shown an alert message', function () {
    cy.visit(url);
    cy.wait(500);
    cy.get('#registerForm > .modal-footer > .btn-outline-success').click();
    cy.get('#loginEmail').clear();
    cy.get('#loginEmail').type(invalidEmail, { force: true, delay: 20 });
    cy.get('#loginPassword').clear();
    cy.get('#loginPassword').type(invalidPassword, { force: true, delay: 20 });
    cy.get('#loginForm > .modal-footer > .btn-success').click();

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal(
        'Either your username was not found or your password is incorrect'
      );
    });
  });
});
