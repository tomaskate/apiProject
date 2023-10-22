// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("forceClick", { prevSubject: "element" }, (subject) => {
  cy.wrap(subject).click({ force: true });
});

Cypress.Commands.add("loginByAPI", () => {
  cy.request({
    method: "POST",
    url: "http://5.189.186.217/api/auth/login",
    body: {
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
  }).then((res) => {
    const token = res.body.token;
    console.log(token);
    cy.intercept("GET", "/api/analytics/overview").as("getOverview");
    cy.visit("http://5.189.186.217/overview", {
      onBeforeLoad(win) {
        win.localStorage.setItem("auth-token", token);
      },
    });
    cy.wait("@getOverview", { timeout: 7000 })
      .its("response")
      .then((response) => {
        cy.wrap(response.statusCode)
          //.should("eq", 200)
          .then((statusCode) => {
            if (statusCode === 200) {
              console.log("Your status is 200");
            } else if (statusCode === 304) {
              console.log("Your status code 304. It's ok! No worries");
            } else {
              console.log(
                `Something went wrong! Your statusCode is ${statusCode}`
              );
            }
          });
      });
  });
});

Cypress.Commands.add("getCategories", () => {
  cy.request({
    method: "GET",
    url: "http://5.189.186.217/api/category",
    headers: {
      Authorization: window.localStorage.getItem("auth-token"),
    },
  }).then((res) => {
    return res.body;
  });
});

Cypress.Commands.add("addPosition", (categoryId, costNumber, positionName) => {
  cy.request({
    method: "POST",
    url: "http://5.189.186.217/api/position",
    body: {
      name: positionName,
      cost: costNumber,
      category: categoryId,
    },
    headers: {
      Authorization: window.localStorage.getItem("auth-token"),
    },
  }).then((res) => {
    return res.body;
  });

  // Cypress.Commands.add("getOrder", () => {
  //   cy.intercept("POST", "http://5.189.186.217/api/order").as("getOrder");
  //   cy.wait("@getOrder", { timeout: 4000 })
  //     .then((response) => {
  //       return response.body.order;
  //     });
  // });
});
