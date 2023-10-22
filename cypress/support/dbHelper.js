export class DbHelper {
  static getAllCategories() {
    return cy.findMany({}, { collection: "categories" });
  }

  static getCategoryByName(name) {
    return cy.findOne({ name }, { collection: "categories" });
  }

  static getCategoriesByNameContaining(name) {
    const regName = RegExp(name, "i");
    return cy.findMany({ name: regName }, { collection: "categories" });
    //return cy.findMany({ name: /test/i }, { collection: "categories" });
  }
}
