// import { DbHelper } from "../support/dbHelper";
// import { faker } from "@faker-js/faker";

// describe("Categories tests", () => {
//   let order;
//   const categoryName = faker.lorem.word();
//   const numberPositions = faker.number.int({ min: 2, max: 4 });
//   beforeEach(() => {
//     cy.loginByAPI();
//   });
//   it("Create category with image and category positions", () => {
//     let categoryId;

//     /** Open category creation modal window */
//     cy.contains("Асортимент").click();
//     cy.contains("Додати категорію").click();

//     /** Upload image */
//     cy.get("input[type='file']").selectFile(
//       "/Users/User/Desktop/apiProject/cypress/downloads/image.jpg",
//       { force: true }
//     );

//     /** Create category */
//     cy.get("#name").type(categoryName);
//     cy.get("button[type='submit']").click();

//     /** Get category id and add positions */
//     DbHelper.getCategoryByName(categoryName)
//       .then((res) => {
//         categoryId = res._id.toString();
//         console.log(categoryId);
//       })
//       .then(() => {
//         for (let i = 1; i <= numberPositions; i++) {
//           const positionName = faker.lorem.word();
//           const costNumber = faker.number.int({ max: 100 });
//           cy.addPosition(categoryId, costNumber, positionName);
//         }
//       });
//   });

//   it("Create order and get order number", () => {
//     cy.intercept("POST", "http://5.189.186.217/api/order").as("getOrder");

//     /** Create order */
//     cy.contains("Додати замовлення").click();
//     cy.contains(categoryName).click();
//     for (let i = 1; i <= numberPositions; i++) {
//       const amount = faker.number.int({ min: 1, max: 8 });
//       cy.get(
//         `:nth-child(${i}) > :nth-child(3) > .input-field > .ng-untouched`
//       ).clear();
//       cy.get(
//         `:nth-child(${i}) > :nth-child(3) > .input-field > .ng-untouched`
//       ).type(amount);
//       cy.get(`:nth-child(${i}) > :nth-child(4) > .btn`).click();
//     }
//     cy.contains("Завершити").click();
//     cy.contains("Ваше замовлення").should("be.visible");
//     cy.contains("Підтвердити").click();

//     /** Get order */
//     cy.wait("@getOrder", { timeout: 4000 })
//       .its("response")
//       .then((response) => {
//         order = response.body.order;
//         console.log(order);
//       });
//   });

//   it("Filter and validate order with history", () => {
//     /** Go to history and use filter */
//     cy.contains("Історія").click();
//     cy.get(".page-title > .btn").click();
//     cy.get(".order > .input-field > label").type(order);
//     cy.contains("Применить фильтр").click();

//     /** Validate order number */
//     cy.get("tbody > tr > :nth-child(1)").should("contain.text", order);
//   });

//   it("Delete category and validate", () => {
//     /** Delete category */
//     cy.visit("http://5.189.186.217/categories");
//     cy.contains(categoryName).click();
//     cy.get("span > .btn").click();
//     cy.on("window:confirm", () => true);

//     /** Validate category deletion */
//    // DbHelper.getCategoryByName(categoryName).should("eq", null);
//   });
// });
