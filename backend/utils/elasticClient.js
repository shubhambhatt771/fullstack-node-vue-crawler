const { Client } = require("@elastic/elasticsearch");
const { config } = require("dotenv");

config();

const { ELASTIC_API_KEY, ELASTIC_END_POINT } = process.env;

const elasticClient = new Client({
  node: ELASTIC_END_POINT,
  auth: {
    apiKey: ELASTIC_API_KEY,
  },
});


async function addDataToDb(data, id) {
  const res = await elasticClient.index({
    index: "companies",
    id: id,
    document: {
      ...data,
    },
  });
  console.log(res, "response");
}

async function checkTableExists() {
  const tableExists = await elasticClient.indices.exists({
    index: "companies",
  });
  // console.log(tableExists, "exist table");
  if (!tableExists) {
    await elasticClient.indices.create(
      {
        index: "companies",
      },
      (err, res, status) => {
        updateMappings();
      }
    );
  }
}

async function updateMappings() {
  elasticClient.indices.putMapping({
    index: "companies",
    body: {
      properties: {
        name: { type: "text" },
        roc: { type: "text" },
        status: { type: "text" },
        cin: { type: "text" },
        registrationDate: { type: "text" },
        category: { type: "text" },
        subCategory: { type: "text" },
        class: { type: "text" },
        authorisedCapital: { type: "text" },
        paidUpCapital: { type: "text" },
        state: { type: "text" },

        // activity: { type: "text" },
        pin: { type: "text" },
        country: { type: "text" },
        address: { type: "text" },
        email: { type: "text" },
      },
    },
  });
}

async function getTableDocs() {
  res = await elasticClient.search({
    index: "companies",
    query: {
      multi_match: {
        query: "limited",
        fields: ["cin", "email", "_id", "name"],
      },
    },
  });


  console.log(res.hits.hits, "search in elastic");
}

async function getDocById() {
  res = await elasticClient.get({
    index: "companies",
    id: 1,
  });
}


module.exports = {
  elasticClient,
  addDataToDb,
  updateMappings,
  getTableDocs,
  checkTableExists,
  getDocById,
};
