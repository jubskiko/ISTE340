let data = ""
let selectionHistory = []

window.addEventListener("load", () => {
    const xhr = new XMLHttpRequest()
    const url = "./assets/data/sandwich.json"
    // Takes the data from the json file provided
    xhr.addEventListener("load", ()  => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.response)
            build('init')
        }
    })
    xhr.open("GET", url)
    xhr.send()
    updateOrders()
})

// Creates the next option based on the key value that is sent in so it can go from that point on in the data
const build = (key) => {
    if (!data[key] || data[key].length <= 1) {
        document.getElementById('formContainer').style.display = "block"
        return
    }
    let currentData = data[key]
    let div = document.createElement('div')
    div.style.opacity = 0 
    div.style.transform = 'translateX(-100%)' 
    let head = document.createElement('h3')
    head.textContent = currentData[0]
    div.appendChild(head)
    let sel = document.createElement('select')
    let def = document.createElement('option')
    def.textContent = "Please choose..."
    def.disabled = true
    def.selected = true
    sel.appendChild(def)
    for (let i = 1; i < currentData.length; i++) {
        let opt = document.createElement('option')
        opt.value = currentData[i]
        opt.innerText = currentData[i]
        sel.appendChild(opt)
    }
    sel.addEventListener('change', (e) => {
        while (div.nextSibling) {
            div.parentNode.removeChild(div.nextSibling)
        }
        let next = e.target.value.toLowerCase().replace(/\s+/g, '-')
        build(next)
    })
    div.appendChild(sel)
    document.getElementById('order').appendChild(div)
    slideElementIn(div)
}

// Animation to move over our selection elements
function slideElementIn(element) {
    let start = null
    const duration = 500 

    function animate(time) {
        if (!start) start = time
        let progress = (time - start) / duration

        if (progress < 1) {
            let translateValue = -100 + progress * 100 
            element.style.transform = `translateX(${translateValue}%)`
            element.style.opacity = progress
            requestAnimationFrame(animate)
        } else {
            element.style.transform = 'translateX(0%)' 
            element.style.opacity = 1
        }
    }

    requestAnimationFrame(animate)
}

const updateOrders = () => {
    let orders
    if (window.localStorage) {
        orders = JSON.parse(localStorage.getItem('orders') || '[]')
    } else {
        orders = JSON.parse(GetCookie('orders') || '[]')
    }
    let savedOrders = document.getElementById('savedOrders')
    while(savedOrders.firstChild) {
        savedOrders.removeChild(savedOrders.firstChild)
    }
    const orderDivs = document.createElement('div')
    orders.forEach(e => {
        let card = document.createElement('div')
        card.classList += 'card'
        let nameTag = document.createElement('h4')
        nameTag.textContent = e.name
        card.appendChild(nameTag)
        let emailTag = document.createElement('p')
        emailTag.textContent = e.email
        card.appendChild(emailTag)
        if (e.note != '') {
            let noteTag = document.createElement('p')
            noteTag.textContent = e.note
            card.appendChild(noteTag)
        }
        let orderTag = document.createElement('p')
        orderTag.textContent = e.order
        card.appendChild(orderTag)
        orderDivs.appendChild(card)
    })
    savedOrders.appendChild(orderDivs)
}

// Closes the form when somewhere else on the screen is clicked
window.onclick = (e) => {
    let modal = document.getElementById('formContainer')
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

// Handles the submission of the form
//  - Validation of the data
//  - Hides modal
//  - Sets the values in the users local storage or cookies
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const note = document.getElementById('note').value
    const nameReg = /^[A-Za-z\s]+$/
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name.match(nameReg)) {
        alert("Please enter a valid name without numbers.")
        console.log("In name not right")
        return
    }

    if (!email.match(emailReg)) {
        alert("Please enter a valid email address.")
        console.log("In email not right")
        return
    }
    let sels = document.getElementsByTagName('select')
    for(let i = 0; i < sels.length; i++) {
        let val = sels[i].value
        selectionHistory.push(val)
    }
    const order = {
        name: name,
        email: email,
        note: note,
        order: selectionHistory
    }
    if (window.localStorage) {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]')
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
    } else {
        let orders = JSON.parse(GetCookie('orders') || '[]')
        orders.push(order)
        SetCookie("orders", orders)
    }
    document.getElementById('formContainer').style.display = "none"
    selectionHistory = []
    updateOrders()
})

