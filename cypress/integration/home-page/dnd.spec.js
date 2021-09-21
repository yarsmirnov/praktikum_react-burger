describe('Test ingredients DnD on constructor', () => {
  before(function() {
      // Open contructor page
    cy.visit('http://localhost:3000');
  });

  it('Should add ingredient to constructor', () => {
    const dragSelector = `a[class^="burger-ingredient-card_card"]`;
    const dropFieldSelector = `section[class*="column pt-25 pr-4"]`;
    const bunContent = 'Краторная булка';
    const ingredientContent = 'Филе Люминесцентного тетраодонтимформа'

      // Drag bun on contructor
    cy.get(dragSelector).contains(bunContent).trigger('dragstart');
    cy.get(dropFieldSelector).trigger('drop');

      // Drag ingredient on contructor
    cy.get(dragSelector).contains(ingredientContent).trigger('dragstart');
    cy.get(dropFieldSelector).trigger('drop');

        // Check contructor has a bun
      cy.get(dropFieldSelector).contains(bunContent);
        // Check bun has counter with value 2
      cy.get(dragSelector).contains(bunContent).get(`p[class^="counter_counter"]`).contains('2');

        // Check contructor has an ingredient
      cy.get(dropFieldSelector).contains(ingredientContent);
        // Check ingredient has counter with value 1
      cy.get(dragSelector).contains(ingredientContent).get(`p[class^="counter_counter"]`).contains('1');

      })
});



