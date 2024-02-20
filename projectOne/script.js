let data = {
    init: ["Let's make a sandwich", "Hot", "Cold"],
    hot: ["Dietary Restrictions", "None", "Vegan", "Gluten-Free"],
    vegan: ["Choose your base", "Veggie Burger", "Grilled Vegetables"],
    'veggie-burger': ["Vegan cheese?", "Yes", "No"],
    'grilled-vegetables': ["Add avocado?", "Yes", "No"],
    'gluten-free': ["Choose your protein", "Grilled Chicken", "Beef Patty"],
    none: ["What would you like?", "Chicken Sandwich", "Burger"],
    'chicken-sandwich': ["How would you like the chicken?", "Fried", "Grilled"],
    'fried': ["Choose your sauce", "BBQ", "Honey Mustard"],
    'grilled': ["Add bacon?", "Yes", "No"],
    burger: ["What kind of cheese would you like?", "American", "Cheddar", "None"],
    'american': ["Add onions?", "Yes", "No"],
    'cheddar': ["Add pickles?", "Yes", "No"],
    cold: ["Do you want a sub?", "Yes", "No"],
    'yes-sub': ["Choose your main ingredient", "Turkey", "Ham", "Veggie"],
    'turkey': ["Add cheese?", "Swiss", "Provolone", "No Cheese"],
    'ham': ["Condiments?", "Mayo", "Mustard", "Both", "None"],
    'veggie': ["Include avocado?", "Yes", "No"],
    'no-sub': ["Would you like a salad instead?", "Yes", "No"],
    'yes-salad': ["Choose your salad base", "Caesar", "Garden", "Greek"],
    'no-salad': ["Thank you for visiting!"]
};

//This will be the runner method where we loop through and will run until completion of the program
const generate = () => {
    build(data.init)
    
}

// Here we take the question and two options and build the selector
const build = (data) => {
    let div = document.createElement('div')
    div.classList += "selection"
    let head = document.createElement('h2')
    head.innerHTML = data[0]
    div.appendChild(head)
    let sel = document.createElement('select')
    for(let i = 1; i<3; i++) {
        let opt = document.createElement('option')
        opt.value = data[i];
        opt.innerHTML = data[i];
        sel.appendChild(opt)
    }
    div.appendChild(sel)
    document.body.appendChild(div)
}

generate()

