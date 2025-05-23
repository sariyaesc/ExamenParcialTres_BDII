const db = require("../../database/db.js");

const resolvers = {
  Query: {
    getPoets_Poems: async () => {
      const result = await db.raw("CALL spGet_poet_poem()");
      return result[0][0];
    },

    customers: async () => {
      try {
        return await db("customers");
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving customers");
      }
    },
    poets: async () => {
      try {
        return await db("poets");
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving poets");
      }
    },

    poems: async () => {
      try {
        return await db("poems");
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving poems");
      }
    },
    sales: async () => {
      try {
        return await db("sales");
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving sales");
      }
    },
  },
  Mutation: {
    addPoet: async (_, args) => {
      try {
        await db("poets").insert(args);
        const newPoet = await db("poets")
          .where({ poet_code: args.poet_code })
          .first();
        return newPoet;
      } catch (error) {
        console.error("Error en addPoet:", error);
        throw new Error("Error adding poet");
      }
    },

    addPoem: async (_, args) => {
      try {
        const poetExists = await db("poets")
          .where({ poet_code: args.poet_code })
          .first();

        if (!poetExists) {
          throw new Error(`Poet con poet_code ${args.poet_code} no existe`);
        }

        await db("poems").insert({
          poem_code: args.poem_code,
          poem_title: args.poem_title,
          poem_contents: args.poem_contents,
          poet_code: args.poet_code, // Aquí es directamente el entero
        });

        const newPoem = await db("poems")
          .where({ poem_code: args.poem_code })
          .first();
        return newPoem;
      } catch (error) {
        console.error("Error en addPoem:", error);
        throw new Error("Error adding poem");
      }
    },

    addCustomer: async (_, args) => {
      try {
        await db("customers").insert(args);
        const newCustomer = await db("customers")
          .where({ customer_code: args.customer_code })
          .first();
        return newCustomer;
      } catch (error) {
        console.error("Error en addCustomer:", error);
        throw new Error("Error adding customer");
      }
    },

    addSale: async (_, args) => {
      try {
        await db("sales").insert(args);
        const newSale = await db("sales")
          .where({ sale_code: args.sale_code })
          .first();
        return newSale;
      } catch (error) {
        console.error("Error en addSale:", error);
        throw new Error("Error adding sale");
      }
    },

    updateCustomer: async (_, args) => {
      const { customer_code, ...data } = args;
      try {
        await db("customers").where({ customer_code }).update(data);
        return await db("customers").where({ customer_code }).first();
      } catch (error) {
        console.error(error);
        throw new Error("Error updating customer");
      }
    },

    deleteCustomer: async (_, { customer_code }) => {
      try {
        await db("customers").where({ customer_code }).del();
        return `Customer with ID ${customer_code} deleted.`;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting customer");
      }
    },

    deletePoem_Publication: async (_, { poem_code, publication_code }) => {
      try {
        const deleted = await db("poem_publication")
          .where({ poem_code, publication_code })
          .first();

        if (!deleted) {
          throw new Error("Poem_Publication not found.");
        }

        await db("poem_publication")
          .where({ poem_code, publication_code })
          .del();

        return deleted;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting poem_publication");
      }
    },

    deleteSale_Publication: async (_, { sale_code, publication_code }) => {
      try {
        const deleted = await db("sale_publication")
          .where({ sale_code, publication_code })
          .first();

        if (!deleted) {
          throw new Error("Sale_Publication not found.");
        }

        await db("sale_publication")
          .where({ sale_code, publication_code })
          .del();

        return deleted;
      } catch (error) {
        console.error(error);
        throw new Error("Error deleting sale_publication");
      }
    },
  },
};

module.exports = resolvers;
