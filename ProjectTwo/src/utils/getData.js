// getDatat goes out and hits the REST api
// enpoint - which data I want - ex: about/
const getData = async (endpoint) => {
    const peopleProxy = "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
    // const solaceProxy = "http://solace.ist.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/"
    const res = await fetch(`${peopleProxy}${endpoint}`)
    return await res.json();
}

export default getData