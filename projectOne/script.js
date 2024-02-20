let data = {
    init: ["Do you want a hot or cold sandwich?", "Hot", "Cold"],
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

const build = (key) => {
    let currentData = data[key]
    let div = document.createElement('div')
    let head = document.createElement('h2')
    head.innerHTML = currentData[0]
    div.appendChild(head)
    let sel = document.createElement('select')
    let def = document.createElement('option')
    def.textContent = "Please choose..."
    def.disabled = true
    def.selected = true
    sel.appendChild(def)

    for(let i = 1; i<3; i++) {
        let opt = document.createElement('option')
        opt.value = currentData[i];
        opt.innerHTML = currentData[i];
        sel.appendChild(opt)
    }

    sel.addEventListener('change', (e) => {
        while(div.nextSibling) {
            div.parentNode.removeChild(div.nextSibling)
        }
        let next = e.target.value.toLowerCase().replace(/\s+/g, '-')
        build(next)
    });

    div.appendChild(sel)
    document.body.appendChild(div)
}

build('init')

