import React, {  useEffect, useState } from 'react'
import {
    BrowserRouter,
    Route,
    Switch 
  } from "react-router-dom";
import Game from '../pages/Game';
import Home from '../pages/Home';
import {  Routespath } from './routes'

const Routewithloader=({element:Element,...rest})=>{
    const [loaded,setLoaded]=useState(false)
    useEffect(()=>{
        const timeout=setTimeout(()=>setLoaded(true),200)
        return ()=>clearTimeout(timeout)
    },)
    return(
        <Route
    {...rest}
    render={(props) => (
        <>
          {/* Preloader */}
          <main className="content">
                <Element {...props}/>
          </main>
        </>
    )}
        />
    )

    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ()=>(
<Switch>
    <Routewithloader path={Routespath.home.path} element={Game}/>
    <Routewithloader path={Routespath.game.path} element={Home}/>
    </Switch>
);


