const navBar = "[class^=app-header_nav]";
const ingredientsSection = "[class^=burger-ingredients_container]";
const ingredients = "[class^=burger-ingredients_ingredients]";
const ingredient = "[class^=burger-ingredient_ingredient]";
const constructorSection = "[class^=burger-constructor_section]";
const loginForm = "[class^=login_form]";
const modal = "[class^=modal_modal]";
const close = "[class^=modal_close]";
const orderNumber = "[class^=order-details_number]";
describe("Testing burger constructor", () => {
  it("Test functional of burger-constructor page", () => {
    cy.visit("/");
    cy.reload(true);
    cy.get(navBar).should("exist");
    cy.get(ingredientsSection).should("exist");
    cy.get(constructorSection).should("exist");
    cy.get(ingredients).should("exist");
    cy.get(ingredient).should("exist");
    cy.get(ingredient).eq(1).trigger("dragstart");
    cy.get(constructorSection).trigger("drop");
    cy.get(ingredient).eq(3).trigger("dragstart");
    cy.get(constructorSection).trigger("drop");
    cy.get(ingredient).eq(6).trigger("dragstart");
    cy.get(constructorSection).trigger("drop");
    cy.get("button").contains("Оформить заказ").as("createOrderButton");
    cy.get("@createOrderButton").should("exist");
    cy.get("@createOrderButton").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });

    cy.get(loginForm).should("exist");
    cy.get("input").first().should("exist");
    cy.get("input").first().type("troitskaya97@yandex.ru");
    cy.get("input").last().should("exist");
    cy.get("input").last().type("290597");
    cy.get("button").contains("Войти").as("loginButton");
    cy.get("@loginButton").should("exist");
    cy.get("@loginButton").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/");
    });
    cy.get("@createOrderButton").should("exist");
    cy.get("@createOrderButton").click();

    cy.get(modal).should("exist");
    cy.get(close).should("exist");
    cy.wait(17000);
    cy.get(orderNumber).should("exist");
    cy.get(close).click();
  });
});

describe("Testing modal ingredients", () => {
  it("Test open and close ingredient modal", () => {
    cy.visit("/");
    cy.reload(true);
    cy.get(ingredients).should("exist");
    cy.get(ingredient).eq(1).should("exist");
    cy.get(ingredient).eq(1).click();
    cy.get(modal).should("exist");
    cy.get("h1").contains("Детали ингредиента").should("exist");
    cy.get(close).should("exist");
    cy.get(close).click();
    cy.get(modal).should("not.exist");
  });
});
