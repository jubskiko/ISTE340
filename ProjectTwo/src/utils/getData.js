// getDatat goes out and hits the REST api
// enpoint - which data I want - ex: about/
const getData = async (endpoint) => {
    // const proxy = "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
    const proxy = "http://solace.ist.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
    const res = await fetch(`${proxy}${endpoint}`)
    return await res.json();
}

export default getData