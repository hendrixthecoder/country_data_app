import { useEffect, useState } from 'react'
import './App.css'
import countryService from './services/countries'
import Results from './components/Results'

const App = () => {

  const [search, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [result, setResult] = useState(true)

  const getCountryInfo = () => {
    if (search) {
      setResult(false)
      var getCountries = setTimeout(() => {
        countryService.getAll()
          .then(response => {
            setResult(true)
            const countries = response.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
            return setCountryList(countries)
          })
      }, 1500)

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

  return (
    <>
		<h3>This app returns list of countries only when the search returns less than 10 countries, so be more specific with your searches to get results.</h3>
      <form action="">
        <label htmlFor="">Find countries:</label>
        <input type="text" value={search} onChange={getCountry} />
      </form>

      {result ? <Results curResult={search} countryList={countryList} /> : ""}
    </>
  )
}

export default App
