const categories = ["food", "bills", "transportation", "clothing", "others"];
const random_names = {
  food: ["Breakfast", "Lunch", "Dinner", "Snacks"],
  bills: ["Water", "Electricity", "Phone", "Rent"],
  transportation: ["Grab", "Angkas", "Bus", "Jeep", "Tricycle"],
  clothing: ["Ukay-ukay", "H&M", "Uniqlo", "Zara"],
  others: ["Gift", "Cleaning materials", "Stationary"],
};

let data = [];

let cdate = new Date(2023, 0, 1);
for (let i = 0; i < 730; i++) {
  if (true || Math.floor(Math.random() * 3) == 0) {
    let num_expenses = Math.ceil(Math.random() * 3);

    for (let j = 0; j < num_expenses; j++) {
      let categ = categories[Math.floor(Math.random() * categories.length)];

      let date = new Date(
        cdate.getFullYear(),
        cdate.getMonth(),
        cdate.getDate(),
        Math.floor(Math.random() * 24),
        Math.floor(Math.random() * 60),
        Math.floor(Math.random() * 60)
      );

      data.push({
        id: data.length + 1,
        name: random_names[categ][
          Math.floor(Math.random() * random_names[categ].length)
        ],
        amount: Math.ceil(Math.random() * 100000) / 100,
        date: date.toISOString(),
        category: categ,
      });
    }
  }

  cdate.setDate(cdate.getDate() + 1);
}

console.log(JSON.stringify(data));
