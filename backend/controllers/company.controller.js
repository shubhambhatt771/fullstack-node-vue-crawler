const { elasticClient, addDataToDb } = require("../utils/elasticClient");
const {
  Company,
  Category,
  SubCategory,
  CompanyStatus,
  CompanyClass,
  Roc,
} = require("../models");
exports.getClients = async (req, res) => {
  let { q, page:pageNumber } = req.query;
  pageNumber = pageNumber ? pageNumber - 1 : 0;
  let from = pageNumber * 20;
  console.log(pageNumber, 'pagenumber ', from);
  let query = {
    match_all: {},
  };
  if (q && q.length > 0) {
    console.log(q, "query here");
    query = {
      multi_match: {
        query: q,
        fields: ["cin", "email", "name", "id"],
      },
    };
  }

  const response = await elasticClient.search({
    index: "companies",
    query: query,
    from: from,
    size: 20,
  });

  res.status(200).json({
    success: true,
    data: {
      clients: response.hits.hits,
      count: response.hits.total.value,
      page: pageNumber + 1,
    },
  });
};

exports.addClient = async (req, res) => {
  try {
    const {
      rocId,
      categoryId,
      subCategoryId,
      statusId,
      classId,
      ...elasticData
    } = req.body;
    const {
      roc,
      category,
      subCategory,
      status,
      class: companyClass,
      ...mySqlData
    } = elasticData;
    const sqlDataBody = {
      ...mySqlData,
      rocId,
      categoryId,
      subCategoryId,
      statusId,
      classId,
    };
    const newClient = await Company.create(sqlDataBody);
    await addDataToDb(elasticData, newClient.id);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(201).json({
    success: true,
    message: "Client created successfully",
  });
};

exports.getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findByPk(id);
    console.log(company, "company mysql");
    const client = await elasticClient.get({
      index: "companies",
      id: id,
    });
    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: error,
      message: error.message,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const client = await Company.findByPk(id);
    await client.update(body);
    await elasticClient.update({
      index: "companies",
      id: id,
      doc: body,
    });
    res.status(200).json({
      success: true,
      message: "Client Updated Successfully",
      client: body,
    });
  } catch (error) {}
};

exports.deleteClient = async (req, res) => {
  let id = req.params.id;
  try {
    await elasticClient.delete({
      index: "companies",
      id: id,
    });

    const company = await Company.findByPk(Number(id));
    company.destroy();
    console.log("document and sql row deleted");
    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.log("error in deleting client", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getClientCategories = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(200).json({
      success: true,
      categories: response,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

exports.getClientSubCategories = async (req, res) => {
  try {
    const response = await SubCategory.findAll({
      where: {},
    });
    res.status(200).json({
      success: true,
      subCategories: response,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

exports.getClientStatuses = async (req, res) => {
  try {
    const response = await CompanyStatus.findAll({
      where: {},
    });
    res.status(200).json({
      success: true,
      statuses: response,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

exports.getClientRocs = async (req, res) => {
  try {
    const response = await Roc.findAll();
    res.status(200).json({
      success: true,
      rocs: response,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

exports.getCompanyClass = async (req, res) => {
  try {
    const response = await CompanyClass.findAll();
    res.status(200).json({
      success: true,
      classes: response,
    });
  } catch (error) {
    console.log("error", error.message);
  }
};
