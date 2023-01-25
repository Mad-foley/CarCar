import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutomobileForm from './inventory/AutomobileForm';
import AutomobileList from './inventory/AutomobileList';
import SalesPersonForm from './sales/SalesPersonForm';
import SalesPersonHistory from './sales/SalesPersonHistory';
import SalesList from './sales/SalesList';
import SalesForm from './sales/SalesForm';
import CustomerForm from './CustomerForm';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="automobiles" element={<AutomobileList />} />
            <Route path="new-automobile" element={<AutomobileForm />} />
          </Route>
          <Route path="sales">
            <Route path="newemployee" element={<SalesPersonForm/>}/>
            <Route path="employeehistory" element={<SalesPersonHistory/>}/>
            <Route path="" element={<SalesList/>}/>
            <Route path="new" element={<SalesForm/>}/>
          </Route>
          <Route path="customers">
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
