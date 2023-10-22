describe("API tests", () => {
  let categoriesByAPI;
  beforeEach(() => {
    cy.loginByAPI().then(() => {
      cy.getCategories().then((categories) => {
        categoriesByAPI = categories;
      });
    });
  });
  it("Check that user is on overview page", () => {
    cy.url().should("include", "/overview");
    cy.get(".row").should("exist");
  });

  it("Check that number of categories received from API is equal number on the page", () => {
    cy.visit("http://5.189.186.217/categories");
    cy.get(".collection > .collection-item")
      .its("length")
      .should("equal", categoriesByAPI.length);
  });

  // it("test", () => {
  //   DbHelper.getAllCategories().then((res) => {
  //     console.log(res);
  //   });

  //   DbHelper.getCategoryByName("test category 4").then((res) => {
  //     console.log(res._id.toString());
  //   });

  //   DbHelper.getCategoriesByNameContaining("test").then((res) => {
  //     console.log(res);
  //   });
  // });
});
