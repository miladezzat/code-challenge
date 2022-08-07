const readline = require('readline');
const { set, entries } = require('lodash');
const fs = require('fs');
const { parse } = require('csv-parse');

const buildProductsDictionary = (order, totalProductQuantity = 0) => totalProductQuantity + order.quantity;

const buildProductsBrandsDictionary = (order, totalNumberOfBrandOrders = 0) => totalNumberOfBrandOrders + 1;

const buildDictionaries = (Orders = []) => {
  const productsDictionary = {};
  const productsBrandsDictionary = {};

  Orders.forEach((order) => {
    productsDictionary[order.productName] = buildProductsDictionary(order, productsDictionary[order.productName]);
    const totalNumberOfBrandOrders = buildProductsBrandsDictionary(order, productsBrandsDictionary[order.productName]?.[order.brand]);

    set(productsBrandsDictionary, `${order.productName}.${order.brand}`, totalNumberOfBrandOrders);
  });

  return {
    productsDictionary,
    productsBrandsDictionary,
  };
};

const readAndParseCsvInput = (fileName) => new Promise((resolve, reject) => {
  const orders = [];

  fs.createReadStream(`./${fileName}`)
    .pipe(parse({
      delimiter: ',',
      from_line: 1,
    }))
    .on('data', (row) => {
      orders.push({
        productName: row[2],
        quantity: Number(row[3]),
        brand: row[4],
      });
    })
    .on('end', () => resolve(orders))
    .on('error', (error) => reject(error));
});

const calculateProductAveragePerOrder = (totalNumberOfProductQuantity, totalNumberOfOrders) => {
  const format = (num) => num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 4 });

  return format(totalNumberOfProductQuantity / totalNumberOfOrders);
};

console.log('Enter The File Name:');

readline.createInterface(process.stdin, process.stdout)
  .on('line', async (fileName) => {
    const orders = await readAndParseCsvInput(fileName);
    const {
      productsDictionary,
      productsBrandsDictionary,
    } = buildDictionaries(orders);

    const averageCSVResult = [];
    const mostBrandCSVResult = [];

    entries(productsDictionary)
      .forEach(([key, value]) => {
        averageCSVResult.push([key, calculateProductAveragePerOrder(value, orders.length)]);
        mostBrandCSVResult.push([
          key,
          Object.keys(productsBrandsDictionary[key])
            .reduce((a, b) => (productsBrandsDictionary[key][a] > productsBrandsDictionary[key][b] ? a : b)),
        ]);
      });

    await Promise.all([
      fs.promises.writeFile(`0_${fileName}`, averageCSVResult.join('\n')),
      fs.promises.writeFile(`1_${fileName}`, mostBrandCSVResult.join('\n')),
    ]);

    process.exit(0);
  });
