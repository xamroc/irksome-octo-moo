var faker = require('faker');
var fs = require('fs');

var data = [];
var numberOfEntries = 100;
var i = 1;

var categories = ['cash', 'commodity', 'developed', 'domestic', 'emerging', 'fixed'];

while (numberOfEntries--) {
  var stockCode = faker.hacker.abbreviation();
  var companyName = faker.company.companyName();
  var shares = faker.random.number(10000);
  var price = faker.finance.amount(0, 99);
  var value = (shares*price).toFixed(2);
  var category = categories[Math.floor(Math.random()*categories.length)];

  var entry = { "id": i,
                "ticker": stockCode,
                "companyName": companyName,
                "shares": shares,
                "price": price,
                "value": value,
                "category": category};

  data.push(JSON.stringify(entry));
  i++;
}

fs.writeFile('../json/securities.json', JSON.stringify(data), function(err) {
  if (err) throw err;
  console.log('Done.');
})