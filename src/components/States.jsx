// import React from "react";

import { useEffect, useState } from "react";
import styles from "./States.module.css";

export default function States() {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [statesAccess, setStatesAccess] = useState(true);
  const [citiesAccess, setCitiesAccess] = useState(true);

  const countriesAPI = "https://crio-location-selector.onrender.com/countries";
  const statesAPI = `https://crio-location-selector.onrender.com/country=${countryName}/states`;
  const citiesAPI = `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`;

  const getCountries = async () => {
    const response = await fetch(countriesAPI);
    const countriesData = await response.json();
    setCountryList(countriesData);
    // console.log("countries::", countriesData);
  };

  const getStates = async () => {
    const response = await fetch(statesAPI);
    const statesDAta = await response.json();
    setStateList(statesDAta);
    // console.log("states::", statesDAta);
  };

  const getCities = async () => {
    const response = await fetch(citiesAPI);
    const citiesData = await response.json();
    setCityList(citiesData);
    // console.log("cities::", citiesData);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getStates();

    setStateName("");
    setCityName("");
  }, [countryName]);

  useEffect(() => {
    getCities();
  }, [stateName]);
  //   console.log("countryList::", countryList);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "2px solid black",
      }}
    >
      <h1>Select Location</h1>
      <div className={styles.selectContainer}>
        <select
          name="countries"
          id=""
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
            setStatesAccess(false);
          }}
        >
          <option value=" ">Select country</option>
          {countryList.map((country) => {
            return (
              <option value={country} key={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          name="states"
          id=""
          value={stateName}
          onChange={(e) => {
            setStateName(e.target.value);
            setCitiesAccess(false);
          }}
          disabled={statesAccess}
        >
          <option value=" ">Select state</option>
          {stateList.map((state) => {
            return (
              <option value={state} key={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          name="cities"
          id=""
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          disabled={citiesAccess}
        >
          <option value=" ">Select city</option>
          {cityList.map((city) => {
            return (
              <option value={city} key={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      <br />
      {/* {{cityName} && } */}
      {cityName ? (
        <h2>
          You selected <span style={{ fontSize: "1.5em" }}>{cityName},</span>{" "}
          <span style={{ color: "grey" }}>
            {stateName}, {countryName}
          </span>{" "}
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
