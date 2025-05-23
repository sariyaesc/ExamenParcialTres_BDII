const { gql } = require("apollo-server");

const typeDefs = gql`
  type Customer {
    customer_code: Int!
    first_name: String!
    surname: String!
    address: String
    postcode: String
    tel_num: String
  }

  type Poem {
    poem_code: Int!
    poem_title: String!
    poem_contents: String
    poet_code: Int!
  }

  type Poet {
    poet_code: Int!
    first_name: String
    surname: String
    address: String
    postcode: String
    tel_num: String
  }

  type Sale {
    sale_code: Int!
    date: String
    amount: Float
    customer_code: Int!
  }

  type Poem_Publication {
    poem_code: Int!
    publication_code: Int!
  }

  type Sale_Publication {
    sale_code: Int!
    publication_code: Int!
  }

  type PoetPoem {
    poem_code: Int 
    poem_title: String
    poem_contents: String 
    first_name: String
    surname: String
    address: String 
    postcode: String
    tel_num: String
  }

  type Query {
    customers: [Customer]
    poets: [Poet]
    poems: [Poem]
    sales: [Sale]
    poem_publications: [Poem_Publication]
    sale_publications: [Sale_Publication]
    getPoets_Poems: [PoetPoem]
  }

  type Mutation {
    addCustomer(
      customer_code: Int!
      first_name: String!
      surname: String!
      address: String
      postcode: String
      tel_num: String
    ): Customer

    addPoet(
      poet_code: Int!
      first_name: String!
      surname: String!
      address: String
      postcode: String
      tel_num: String
    ): Poet

    addPoem(
      poem_code: Int!
      poem_title: String!
      poem_contents: String
      poet_code: Int!
    ): Poem

    addSale(
      sale_code: Int!
      date: String!
      amount: Float!
      customer_code: Int!
    ): Sale

    updateCustomer(
      customer_code: Int!
      first_name: String
      surname: String
      address: String
      postcode: String
      tel_num: String
    ): Customer

    deleteCustomer(customer_code: Int!): Customer

    deletePoem_Publication(
      poem_code: Int!
      publication_code: Int!
    ): Poem_Publication

    deleteSale_Publication(
      sale_code: Int!
      publication_code: Int!
    ): Sale_Publication
  }
`;

module.exports = typeDefs;
