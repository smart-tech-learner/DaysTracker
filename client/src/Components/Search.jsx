import React from "react";

const Search = (props) => {
  const closeSearch = () => {
    props.closeSearch();
  };

  return (
    <div className="container">
      <div
        style={{
          border: "1px solid darkgrey",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-4">
            <input
              type="text"
              placeholder="Search by task..."
              className="form-control"
              id="textSearch"
              style={{ flex: "1 0 10rem" }}
            />
          </div>
          <div className="col-md-6 mb-4">
            <select
              className="form-select"
              required
              id="trackOption"
              name="trackOption"
              placeholder="search by tracking option"
            >
              <option value="no_selection">-- select tracking option --</option>
              <option value="time_passed">Time Passed</option>
              <option value="time_left">Time Left</option>
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-success"
              style={{ flex: "1 0 5rem" }}
            >
              Search
            </button>
            &nbsp;
            <button
              type="submit"
              className="btn btn-danger"
              style={{ flex: "1 0 5rem" }}
              onClick={closeSearch}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
