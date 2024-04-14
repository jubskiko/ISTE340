// import the important stuff
import React, {useState, useEffect} from 'react'
import getData from '../utils/getData'
                                                                          
// import the components

// import the css
import './People.css'

const People = () => {
    const [loaded, setLoaded] = useState(false)
    const [peoObj, setPeoObj] = useState()

    useEffect( () => {
        getData('people/')
            .then( (json) => {
                console.log(json)
                setPeoObj(json)
                setLoaded(true)
            })
    }, [] )

    if(!loaded) {
        return (
            <h1>...Loading People...</h1>
        )
    }

    return (
        <>
            <h1>{peoObj.title}</h1>
            <h3>{peoObj.subTitle}</h3>
            <h3>Faculty</h3>
            <div className="peopleList">
                {peoObj.faculty.map( (p) => [
                     (<div key={p.email} className="peopleListItem">
                        <h3>{p.name}</h3>
                        <img src={p.imagePath} alt="person" />
                    </div>)
            ])}
            </div>
            <h3>Staff</h3>
            <div className="peopleList">
                {peoObj.staff.map( (p) => [
                     (<div key={p.email} className="peopleListItem">
                        <h3>{p.name}</h3>
                        <img src={p.imagePath} alt="person" />
                    </div>)
            ])}
            </div>
        </>
    )
}

export default People