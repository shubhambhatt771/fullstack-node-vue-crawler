const workerpool = require("workerpool");

const {
  elasticClient,
  addDataToDb,
} = require("./elasticClient");
const {
  Company,
  Category,
  sequelize,
  SubCategory,
  Roc,
  CompanyClass,
  CompanyStatus,
} = require("../models/index.js");
const {
  default: ClearScrollApi,
} = require("@elastic/elasticsearch/lib/api/api/clear_scroll");

async function syncCrawledDataToDb(data) {
  console.log(data, "data to add to DBs");

  const {
    category,
    roc,
    status,
    class: companyClass,
    subCategory,
    state,
    ...companyData
  } = data;
  try {
    

  const [categoryRow] = await Category.findOrCreate({
    where: { name: category },
    defaults: {
      name: category,
    },
  });

  const [subCategoryRow] = await SubCategory.findOrCreate({
    where: { name: subCategory },
    defaults: {
      name: subCategory,
    },
  });

  const [CompanyStatusRow] = await CompanyStatus.findOrCreate({
    where: { name: status },
    defaults: {
      name: status,
    },
  });

  const [companyClassRow] = await CompanyClass.findOrCreate({
    where: { name: companyClass },
    defaults: {
      name: companyClass,
    },
  });
  const [rocRow] = await Roc.findOrCreate({
    where: { name: roc },
    defaults: {
      name: roc,
    },
  });

  const [companyRow] = await Company.findOrCreate({
    where: { cin: companyData.cin },
    defaults: {
      ...companyData,
      categoryId: categoryRow.id,
      subCategoryId: subCategoryRow.id,
      statusId: CompanyStatusRow.id,
      rocId: rocRow.id,
      classId: companyClassRow.id,
    },
  });
  addDataToDb(data, companyRow.id);
} catch (error) {
    console.log('error in sync', error.message);
}
}

workerpool.worker({
  syncCrawledDataToDb: syncCrawledDataToDb,
});
