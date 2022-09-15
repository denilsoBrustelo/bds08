import React, { useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import SalesByStoreComponent from './components/sales-by-store';
import { FilterData } from './types';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onSubmitFilter={onFilterChange} />
        <SalesByStoreComponent filterData={filterData} />
      </div>
    </>
  );
}

export default App;
