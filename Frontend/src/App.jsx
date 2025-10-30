import "./App.css";

import Main from "./components/home/Main";

import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import PropertyList from "./components/home/PropertyList";
import PropertyListing from "./components/propertyListing/PropertyListing";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route index element={<PropertyList/>}/>
            <Route path="propertylist/:id" element={<PropertyListing/>}/>
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
