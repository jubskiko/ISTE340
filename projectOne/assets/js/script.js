const xhr = new XMLHttpRequest()
const url = "./assets/data/sandwich.json"
let data = ""

xhr.addEventListener("load", ()  => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(this.Response)
        data = JSON.parse(xhr.response)
        build('init')
    }
})

xhr.open("GET", url)
xhr.send()

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

window.onclick = (e) => {
    let modal = document.getElementById('formContainer')
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const nameReg = /^[A-Za-z\s]+$/
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!name.match(nameReg)) {
        alert("Please enter a valid name without numbers.")
        return
    }

    if (!email.match(emailReg)) {
        alert("Please enter a valid email address.")
        return
    }
    document.getElementById('formContainer').style.display = "none";
    if (window.localStorage) {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        if (document.getElementById('note') != "") {
            localStorage.setItem("note", document.getElementById('note'))
        }
    } else {
        SetCookie("name", name)
        SetCookie("email", email)
        if (document.getElementById('note') != "") {
            SetCookie("note", document.getElementById('note'))
        }
    }
});
