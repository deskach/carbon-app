import React from 'react';
import './App.scss';
import { Button, Content } from 'carbon-components-react';
import TutorialHeader from "./components/TutorialHeader";
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from "./content/LandingPage/LandingPage";
import RepoPage from "./content/RepoPage/RepoPage";

function App() {
  return (
    <div className="App">
      <TutorialHeader/>
      <Content>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/repos" component={RepoPage} />
        </Switch>
        <Button>Button</Button>
      </Content>
    </div>
  );
}

export default App;
