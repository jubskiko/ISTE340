// import the important stuff
import React, {useState} from 'react'
import getData from './utils/getData'
                                                                          
// import the components

// import the css
import './App.css'

const App = () => {
  // state
  const [loaded, setLoaded] = useState(false)
  const [aboutObj, setAboutObj] = useState()

  // go get data
  React.useEffect(() => {
    // page was just rendered
    getData('about/')
      .then((json) => {
        setAboutObj(json)
      })
    setLoaded(true)
  }, [])

  // this return is for the page before we load the data
  if(!loaded) return (
    <>
      <h1>Welcome to the iSchool</h1>
      <div>loading...</div>
    </>
  )

  // after we load the data
  return (
    <>
      <div className='sticky'>
        <h1>Welcome to the iSchool</h1>
        <div>...Menu of some kind...</div>
      </div>
      <div className="App">
        <div className='About'>
          <h2>{aboutObj.title}</h2>
          <h3>{aboutObj.description}</h3>
          <div className='aboutQuoute'>
            <h4 className='quote'>{aboutObj.quote}</h4>
            <h4>--{aboutObj.quoteAuthor}</h4>
          </div>
        </div>
        <hr />
      </div>
    </>
  )
}

export default App
