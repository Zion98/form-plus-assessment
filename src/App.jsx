import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateDataAsync } from "./redux/templates/tempActions";
import {
  selectAllTemplates,
  selectTemplatesFetching,
} from "./redux/templates/tempSelectors";
import {
  selectFilterIsFetching,
  selectSearchResults,
  selectInputValue,
} from "./redux/filters/filterSelectors";
import Header from "./components/Header";
import Card from "./components/Card";
import Loader from "./components/Loader";
import caution from "./assets/caution.svg";
import Pagination from "./components/Pagination";

function App() {
  const dispatch = useDispatch();
  const currentAllTemplates = useSelector(selectAllTemplates);
  const isFetching = useSelector(selectTemplatesFetching);
  const categoryValue = useSelector(selectInputValue);
  const filterIsFetching = useSelector(selectFilterIsFetching);

  const filterSearchResults = useSelector(selectSearchResults);

  const allData =
    filterSearchResults.length > 0 ? filterSearchResults : currentAllTemplates;

  useEffect(() => dispatch(getTemplateDataAsync()), [dispatch]);

  //PAGINATION
  const dataLimit = 20;
  const pages = Math.round(allData.length / dataLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    let pageNumber = Number(event.target.value);
    if (pageNumber <= 0) {
      pageNumber = "";
    } else if (pageNumber >= pages) {
      pageNumber = pages;
    }

    setInputValue(pageNumber);
    setCurrentPage(pageNumber || inputValue);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return allData.slice(startIndex, endIndex);
  };

  //END OF PAGINATION

  return (
    <div className="">
      <Header />
      <div className="notifications bg-[#FFF4EA] py-2 mx-12 flex-row flex justify-center items-center ">
        <img src={caution} alt="cautionImage" className="block" />
        <p className="text-center text-sm pl-2">
          Tada! Get started with a free template. Can’t find what you are
          looking for? Search from the 1000+ available templates
        </p>
      </div>
      {isFetching || filterIsFetching ? (
        <Loader />
      ) : (
        <>
          <div className="mx-12 mt-12 pb-4 flex-row flex justify-between items-center">
            <p className=" text-[#3F3E3E] text-base">
              {categoryValue === "Default" ? "All" : categoryValue || "All"}{" "}
              Templates
            </p>
            <p className="text-[#989898] text-sm">{allData.length} Templates</p>
          </div>

          <div className="card_container flex-row gap-y-10 gap-x-4 flex justify-center flex-wrap">
            {allData.length ? (
              getPaginatedData().map((item) => (
                <Card key={uuid()} item={item} />
              ))
            ) : (
              <p>No Items, Check back later</p>
            )}

            <Pagination
              pages={pages}
              currentPage={currentPage}
              inputValue={inputValue}
              setInputValue={setInputValue}
              changePage={changePage}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

// const fetchData = async () => {
//   const data = await axios.get(
//     "https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates"
//   );
//   console.log(data, "data");
// };
