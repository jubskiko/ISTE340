let data = ""
let orderStr = ""

window.addEventListener("load", () => {
    const xhr = new XMLHttpRequest()
    const url = "./assets/data/sandwich.json"
    // Takes the data from the json file provided
    xhr.addEventListener("load", ()  => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log(this.Response)
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
    let head = document.createElement('h2')
    head.textContent = currentData[0]
    div.appendChild(head)
    let sel = document.createElement('select')
    let def = document.createElement('option')
    def.textContent = "Please choose..."
    def.disabled = true
    def.selected = true
    sel.appendChild(def)
    for(let i = 1; i < currentData.length; i++) {
        let opt = document.createElement('option')
        opt.value = currentData[i]
        opt.innerText = currentData[i]
        sel.appendChild(opt)
    }
    // implementation to remove the options later if an earlier is chosen
    sel.addEventListener('change', (e) => {
        while(div.nextSibling) {
            div.parentNode.removeChild(div.nextSibling)
            if (orderStr.charAt(orderStr.length) - 1 == " ") {
                orderStr = orderStr.substring(0, orderStr.lastIndexOf(" "))
            }
            console.log(orderStr)
            orderStr = orderStr.substring(0, orderStr.lastIndexOf(" "))
        }
        let next = e.target.value.toLowerCase().replace(/\s+/g, '-')
        orderStr += next + " "
        build(next)
    })
    div.appendChild(sel)
    document.getElementById('order').appendChild(div)
}

const updateOrders = () => {
    let orders
    if (window.localStorage) {
        orders = JSON.parse(localStorage.getItem('orders') || '[]')
    } else {
        orders = JSON.parse(GetCookie('orders') || '[]')
    }
    const orderDivs = document.createElement('div')
    orders.forEach(e => {
        let orderDiv = document.createElement('div')
        orderDiv.textContent = `Name: ${e.name}, Email: ${e.email}, Note: ${e.note || ''}, Order: ${e.order}`
        orderDivs.appendChild(orderDiv)
    })
    document.getElementById('savedOrders').appendChild(orderDivs)
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
    const order = {
        name: name,
        email: email,
        note: note,
        order: orderStr
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
    orderStr = ""
    updateOrders()
})

