import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import {
  UploadFileComponent,
  HomeComponent
} from 'components'

export const Routes = (props) => {
  const location = useLocation()
  return (
    <Switch location={location} key={location.pathname}>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/upload" component={UploadFileComponent} />
    </Switch>
  )
}

export default Routes
