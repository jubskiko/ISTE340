const xhr = new XMLHttpRequest()
const url = "./assets/data/sandwich.json"
let data = ""

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
        opt.value = currentData[i];
        opt.innerText = currentData[i];
        sel.appendChild(opt)
    }

    // implementation to remove the options later if an earlier is chosen
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
    e.preventDefault();
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
    document.getElementById('formContainer').style.display = "none";
    if (window.localStorage) {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        console.log("In local storage")
        if (note !== "") {
            localStorage.setItem("note", note)
        }
    } else {
        SetCookie("name", name)
        SetCookie("email", email)
        console.log("In cookies")
        if (note !== "") {
            SetCookie("note", note)
        }
    }
});
