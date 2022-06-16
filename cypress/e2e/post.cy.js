
describe('POST / characters', () => {

  before(() => {
    cy.back2ThePast();
    cy.setToken();
  });

  it('Should register a character', () => {

    const character = {
      name: 'Chales Xavier',
      alias: 'Teacher X',
      team: ['x-men', 'iluminatis'],
      active: true
    }

    cy.postCharacter(character)
      .then(res => {
        expect(res.status).to.eql(201)
        expect(res.body.character_id.length).to.eql(24)
      });

  });

  context('When a character already exist', () => {

    const character = {
      name: 'Steve Rogers',
      alias: 'Capitain American',
      team: ['Avengers'],
      active: true
    }

    before(() => {
      cy.postCharacter(character)
        .then(res => {
          expect(res.status).to.eql(201)
        });
    });

    it('Should not register a duplicate character', () => {
      cy.postCharacter(character)
        .then(res => {
          expect(res.status).to.eql(400)
          expect(res.body.error).to.eql('Duplicate character')
        });
    });

  });

});