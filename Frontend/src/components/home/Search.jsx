// import React, {useState} from 'react';
// // readymade calendar component
// import {DatePicker, Space} from "antd";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../css/Home.css"

// const Search = () => {

// const {RangePicker} = DatePicker
// const [keyword, setKeyword] = useState({
// city:"",
// guests:"",
// dateIn:"",
// dateOut:""
// });
// const [value, setValue] = useState([])

// function searchHandler(e){
// e.preventDefault();
// setKeyword({city:"", guests:"", dateOut:"",dateIn:""})
// setValue([])
// }

// function returnDates (date, dateString) {
// setValue([date [0], date[1]]);
// updateKeyword("dateIn", dateString[0]);
// updateKeyword("dateOut", dateString[1])
// }

// const updateKeyword = (field, value) => {
// setKeyword ((prevKeyword) => ({
// ...prevKeyword,
// [field]: value
// }));
// }

// return (
//     <>
// <div className="searchbar">
// <input
// className='search'
// id='search_destination'
// placeholder='Search destination'
// type='text'
// value ={keyword.city}
// onChange={(e) => updateKeyword("city", e.target.value)}
// />
// <Space direction='vertical' size={12} className='search'>
// <RangePicker
// value ={value}
// format="DD-MM-YYYY"
// picker ="date"
// className="date_picker"
// disabledDate={(current) => {
// return current && current.isBefore(Date.now(),"day")
// }}
// onChange={returnDates}
// />
// </Space>
// <input
// className='search'
// id= "addguest"
// placeholder="Add Guests"
// type='number'
// value = {keyword.guests}
// onChange={(e) => updateKeyword("guests", e.target.value)}
// />
// <span className='material-symbols-outlined searchicon' onClick={searchHandler}>search</span>
// </div>
// </>
// )
// }

// export default Search

import React, { useState } from 'react';
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/Home.css";

const Search = () => {
  const { RangePicker } = DatePicker;
  const [keyword, setKeyword] = useState({
    city: "",
    guests: "",
    dateIn: "",
    dateOut: ""
  });
  const [value, setValue] = useState([]);

  function searchHandler(e) {
    e.preventDefault();
    setKeyword({ city: "", guests: "", dateOut: "", dateIn: "" });
    setValue([]);
  }

  function returnDates(date, dateString) {
    setValue([date[0], date[1]]);
    updateKeyword("dateIn", dateString[0]);
    updateKeyword("dateOut", dateString[1]);
  }

  const updateKeyword = (field, value) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value
    }));
  };

  return (
    <form className="searchbar" onSubmit={searchHandler}>
      <input
        className="search_input"
        id="search_destination"
        placeholder="Destination"
        type="text"
        value={keyword.city}
        onChange={(e) => updateKeyword("city", e.target.value)}
      />
      <RangePicker
        value={value}
        format="DD-MM-YYYY"
        className="search_date"
        disabledDate={(current) => current && current.isBefore(Date.now(), "day")}
        onChange={returnDates}
      />
      <input
        className="search_input"
        id="addguest"
        placeholder="Guests"
        type="number"
        value={keyword.guests}
        onChange={(e) => updateKeyword("guests", e.target.value)}
      />
      <button type="submit" className="search_button">
        <span className="material-symbols-outlined">search</span>
      </button>
    </form>
  );
};

export default Search;