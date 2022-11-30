import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from './containers/ProductListing';
import ProductDetail from './containers/ProductDetail';
import AddProduct from './containers/AddProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route>404 Not Found!</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
