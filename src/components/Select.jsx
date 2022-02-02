import React from "react";
import Select from "react-select";
import styled from "styled-components";
const SelectBox = ({ options, placeholder, single, title, onChangeCustom }) => {
  const customStyles = {
    container: (base) => ({
      ...base,
      flex: 1,
    }),
    option: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      color: state.selectProps.menuColor,
      "&:hover": {
        background:"#f0f0f0",
      },
    }),

    menuList: () => ({
      padding: 0,
      color: "#000",
      background:"#fff",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        background:"#fff",
      },
      border: "1px solid #C4C4C4",
      background: "#fff",
      color: "#666666",
      opacity: "0.8",
    }),
  };
  return (
    <>
      <SelectWrapper className="millage">
        <p className="select-title">{title}</p>
        <div style={{ width: "200px" }}>
          <Select
            options={options}
            styles={customStyles}
            isSearchable={false}
            className="select-field"
            //   placeholder={none}
            placeholder={single ? single : placeholder}
            value={single}
            onChange={(value) =>
              onChangeCustom({ [title.toLowerCase()]: value.value })
            }
            // onChange={(value) => setSingle(value.value)}
            //   autoFocus={true}
          />
        </div>
      </SelectWrapper>
    </>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  height: 100%;
  .select-field {
  }

  .select-title {
    font-size: 0.6rem;
    position: absolute;
    z-index: 999;
    left: 0.9rem;
    top: -0.4rem;
    background: #fff;
  }
  .css-119d63k-control {
    /* width: 150px !important; */
  }
`;
export default SelectBox;
