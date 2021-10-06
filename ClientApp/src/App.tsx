import React from 'react'
import { Route, Switch } from 'react-router'

import { AddEntry } from './pages/AddEntry'
import { Home } from './pages/Home'
import { SingleEntry } from './pages/SingleEntry'
import { UpdateEntry } from './pages/UpdateEntry'
import { ViewAll } from './pages/ViewAll'
import github from '../src/images/Octicat.svg'

export function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/newentry">
          <AddEntry />
        </Route>
        <Route exact path="/allentries">
          <ViewAll />
        </Route>
        <Route exact path="/entry/:id">
          <SingleEntry />
        </Route>
        <Route exact path="/update/:id">
          <UpdateEntry />
        </Route>
      </Switch>
      <footer>
        <a href="https://github.com/drewwdev">
          <img className="github" src={github} />
        </a>
      </footer>
    </div>
  )
}
