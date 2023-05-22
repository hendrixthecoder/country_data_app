import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const Results = ({countryList, curResult}) => {
  if(countryList.length > 10){
    return <p>Too many matches, specify another filter</p>
  }else if(countryList.length == 0 && curResult) {
    return <p>Nothing matches your search try again</p>
  }
  else{
    return (
      <>
      {countryList.map(each => <p>{each.name.common}</p>)}
      </>
    )
  }
}

const App = () => {

  const [search, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [result, setResult] = useState(true)


  const getCountryInfo = () => {
    if(search){
      setResult(!result)
      var getCountries = setTimeout(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
              setResult(true)
              const countries = response.data.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
              return setCountryList(countries)
            })
      }, 500)

    }

    return () => {
      clearTimeout(getCountries)
      setCountryList([])
    }
  }

  useEffect(getCountryInfo, [search])

  const getCountry = (e) => {
    setCountry(e.target.value)
  }
o;
  return (
    <>
    <form action="">
      <label htmlFor="">Find countries:</label>
      <input type="text" value={search} onChange={getCountry} />
      
      {result ? <Results curResult={search} countryList={countryList} /> : ""}
    </form>
    </>
  )
}

export default App
