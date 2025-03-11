import React, { useState } from "react";
import "./input.css";
import "./output.css";

function Input() {
  const [principle, setPrinciple] = useState("");
  const [years, setYears] = useState("");
  const [roi, setRoi] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [errors, setErrors] = useState({});
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [overTheTerm, setOverTheTerm] = useState("");
  const [displayResult, setDisplayResult] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    if (!principle) newErrors.principle = "This field is required";
    if (!roi) newErrors.roi = "This field is required";
    if (!years) newErrors.years = "This field is required";
    if (!mortgageType) newErrors.mortgageType = "This field is required";
    return newErrors;
  };

  const RepaymentCalculation = () => {
    const P = parseFloat(principle); // Convert to number
    const annualRate = parseFloat(roi) / 100; // Convert percentage to decimal
    const r = annualRate / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of months

    if (P > 0 && r > 0 && n > 0) {
      const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const T = M * n;
      setMonthlyPayment(M.toFixed(2).toLocaleString()); // Round to 2 decimal places
      setOverTheTerm(T.toFixed(2).toLocaleString());
    } else {
      setMonthlyPayment("Invalid Input");
      setOverTheTerm("Invalid Input");
    }
  };

  const IntrestOnlyCalculation = () => {
    const P = parseFloat(principle); // Convert to number
    const annualRate = parseFloat(roi) / 100; // Convert percentage to decimal
    const r = annualRate / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of months

    if (P > 0 && r > 0 && n > 0) {
      const M = P * r;
      const T = M * n;
      setMonthlyPayment(M.toFixed(2).toLocaleString()); // Round to 2 decimal places
      setOverTheTerm(T.toFixed(2).toLocaleString());
    } else {
      setMonthlyPayment("Invalid Input");
      setOverTheTerm("Invalid Input");
    }
  };

  const clearAll = () => {
    setPrinciple("");
    setYears("");
    setRoi("");
    setMonthlyPayment("");
    setMortgageType("");
    setErrors("");
    setMonthlyPayment("");
    setOverTheTerm("");
    setDisplayResult(false);
  };

  const onSubmit = (event) => {
    const newErrors = validateForm();
    setErrors(newErrors);
    event.preventDefault();

    if (Object.keys(newErrors).length === 0) {
      console.log(principle, years, roi, mortgageType);
      if (mortgageType === "repayment") {
        RepaymentCalculation();
      } else {
        IntrestOnlyCalculation();
      }
      setDisplayResult(true);
    }
  };

  return (
    <>
      <div className="Input-Box">
        <div className="header">
          <h1 id="Heading">Mortgage Calculator</h1>
          <button id="Clear" onClick={() => clearAll()}>
            Clear All
          </button>
        </div>
        <div className="form">
          <form onSubmit={onSubmit} id="form">
            <label className="entris_styling">
              <p className="form-sub-headings">Mortgage Amount</p>
              <div className={`${errors.principle ? "input-div-errors" : ""} ${principle === "" ? "input_div" : "selected-input-div"}`}>
                <div className={`${errors.principle ? "input-errors" : ""} ${principle === "" ? "info_left" : "selected-info_left"}`}>£</div>
                <input
                  className="input_area"
                  type="number"
                  value={principle}
                  onChange={(e) => setPrinciple(e.target.value)}
                />
              </div>
              {errors.principle && <p className="error">{errors.principle}</p>}
            </label>
            <div className="Second">
              <label className="entris_styling">
                <p className="form-sub-headings">Mortgage Term</p>
                <div className={`${errors.principle ? "input-div-errors" : ""} ${years === "" ? "input_div" : "selected-input-div"}`}>
                  <input
                    className="input_area"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                  <div className={`${errors.principle ? "input-errors" : ""} ${years === "" ? "info_right" : "selected-info_right"}`}>years</div>
                </div>
                {errors.years && <p className="error">{errors.years}</p>}
              </label>
              <label className="entris_styling">
                <p className="form-sub-headings">Intrest Rate</p>

                <div className={`${errors.principle ? "input-div-errors" : ""} ${roi === "" ? "input_div" : "selected-input-div"}`}>
                  <input
                    className="input_area"
                    type="number"
                    value={roi}
                    onChange={(e) => setRoi(e.target.value)}
                  />
                  <div className={`${errors.principle ? "input-errors" : ""} ${roi === "" ? "info_right" : "selected-info_right"}`}>%</div>
                </div>
                {errors.roi && <p className="error" >{errors.roi}</p>}
              </label>
            </div>
            <div className="third">
              <label className="entris_styling">
                <p className="form-sub-headings">Mortgage Type</p>
                <label>
                  <div className={`radio_input_div ${mortgageType === "repayment" ? "selected" : ""}`}>
                    <input
                      className="radio_buttons"
                      type="radio"
                      value="repayment"
                      checked={mortgageType === "repayment"}
                      onChange={(e) => setMortgageType(e.target.value)}
                    />
                    Repayment
                  </div>
                </label>
                <label>
                  <div className={`radio_input_div ${mortgageType === "interest-only" ? "selected" : ""}`}>
                    <input
                      className="radio_buttons"
                      type="radio"
                      value="interest-only"
                      checked={mortgageType === "interest-only"}
                      onChange={(e) => setMortgageType(e.target.value)}
                    />
                    Interest Only
                  </div>
                </label>
                {errors.mortgageType && <p className="error">{errors.mortgageType}</p>}
              </label>
            </div>
            <button className="submit" type="submit">
              <img src={`/icon-calculator.svg`} alt="No result" id="calci" />
              Calculate Repayments
            </button>
          </form>
        </div>
      </div>
      {displayResult ? (
        <div className="Output_2">
          <h2 id="yourResults">Your results</h2>
          <p id="note">
            Your results are shown below based on the information you
            provided.To adjust the results, edit the form and click "calculate
            repayments" again.
          </p>
          <div className="results">
            <div className="monthly">
              <p className="result_label">Your monthly repayments</p>
              <p id="monthly_result">£{monthlyPayment}</p>
            </div>
            <div className="overTheTerm">
              <p className="result_label">Total you'll repay over the term</p>
              <p id="term_result">£{overTheTerm}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="Output">
          <div id="emty_result">
            <img src={`/illustration-empty.svg`} alt="No result" id="image" />
          </div>
          <h1 id="result_head">Results shown here</h1>
          <p id="result_note">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </div>
      )}
    </>
  );
}

export default Input;
