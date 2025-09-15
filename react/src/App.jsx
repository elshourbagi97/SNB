import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './LoginPage/Login'
import LandingPage1 from './FirstDay/landingPage1'
import MapPage1 from './FirstDay/map1'
import Q1D1 from './FirstDay/Q1D1'
import Q2D1 from './FirstDay/Q2D1'
import Q3D1 from './FirstDay/Q3D1'
import ShieldPage from './FirstDay/shield'
import MapPage2 from './SecondDay/map2'
import MapPage3 from './ThirdDay/map3'
import Q1D2 from './SecondDay/Q1D2'
import Q2D2 from './SecondDay/Q2D2'
import Q3D2 from './SecondDay/Q3D2'
import Q4D2 from './SecondDay/Q4D2'
import Shield2 from './SecondDay/shield2'
import Q1D3 from './ThirdDay/Q1D3'
import Shield3 from './ThirdDay/shield3'

function App() {
const navigate = useNavigate();

  useEffect(() => {
    // Always force user to /Home1 after reload
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>

      {/* اليوم الاول */}
      <Route path='/Home1' element={<LandingPage1/>}/>
      <Route path='/map1' element={<MapPage1/>}/>
      <Route path='/question1/Day1' element={<Q1D1/>}/>
      <Route path='/question2/Day1' element={<Q2D1/>}/>
      <Route path='/question3/Day1' element={<Q3D1/>}/>
      <Route path='/shield/Day1' element={<ShieldPage/>}/>

     {/* اليوم الثاني */}
      <Route path='/map2' element={<MapPage2/>}/>
      <Route path='/question1/Day2' element={<Q1D2/>}/>
      <Route path='/question2/Day2' element={<Q2D2/>}/>
      <Route path='/question3/Day2' element={<Q3D2/>}/>
      <Route path='/question4/Day2' element={<Q4D2/>}/>
      <Route path='/shield/day2' element={<Shield2/>}/>

       {/* اليوم الثالث */}
      <Route path='/map3' element={<MapPage3/>}/>
      <Route path='/question1/Day3' element={<Q1D3/>}/>
      <Route path='/shield/day3' element={<Shield3/>}/>
    </Routes>
  )
}

export default App
