import React, { useState } from 'react'
import './SearchInput.css';
const SearchInput = ({setSearchTerm}) => {
    // const [input, setInput]= useState('');
  //   const submitHandler = (e) => {
  //   e.preventDefault();

  //   onSearch(input);
  // };
  return (
    // <form onSubmit={submitHandler}>
    //   <input
    //     type="text"
    //     placeholder="Search a country..."
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //   />
    // </form>
    <div>
      <input
        type="text"
        placeholder="Search a country..."
        // value={input}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchInput
