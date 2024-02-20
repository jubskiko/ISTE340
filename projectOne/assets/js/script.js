const xhr = new XMLHttpRequest()
const url = "./assets/data/sandwich.json"
let data = ""

xhr.addEventListener("load", ()  => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(this.Response)
        data = JSON.parse(xhr.response)

        localStorage.setItem("Data set", JSON.stringify(data))

        build('init')
    }
})

xhr.open("GET", url)
xhr.send()

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

