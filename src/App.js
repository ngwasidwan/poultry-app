import { useState } from "react";
import { data, RES_PER_PAGE } from "./data";

const numPages = Math.ceil(data.length / RES_PER_PAGE);

const App = function () {
  const [showImage, setShowImage] = useState(data[0].image);
  const [showText, setShowText] = useState(data[0]);
  const [showForm, setShowForm] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [selectedCat, setSelectedCat] = useState("Broiler");
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(0);

  // const handlePage = function () {
  //

  //   const list = data.slice().splice(page * RES_PER_PAGE, RES_PER_PAGE);
  //   // setPage(page + 1);
  //   console.log(page);
  // };
  // handlePage();

  const handleClick = function (broiler) {
    setShowImage(broiler.image);
    setShowText(broiler);
  };

  const handleBtnClick = function () {
    setShowForm(!showForm);
  };

  const handleSelectCategory = function (e) {
    setSelectedCat(e.target.value);
    const [price] = data.filter((fowl) => fowl.title.includes(e.target.value));
    setTotal(price.price);
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();
    setInputVal("");
    setShowForm(false);
  };

  const handleNextPage = function () {
    setPage(page + 1);
  };
  const handlePreviousPage = function () {
    setPage(page - 1);
  };
  return (
    <div className="container">
      <Title />
      <div className={`image-box ${showForm ? "filter" : ""}`}>
        <ul>
          {data
            .slice()
            .splice(page * RES_PER_PAGE, RES_PER_PAGE)
            .map((broiler) => {
              return (
                <Broilers
                  key={broiler.id}
                  broiler={broiler}
                  handleClick={handleClick}
                />
              );
            })}
        </ul>

        <ImageBox showText={showText} showImage={showImage} total={total} />
      </div>
      <PageButton
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        page={page}
      />
      <Button onClick={handleBtnClick}>
        {showForm ? "Close" : "place order"}
      </Button>

      {showForm && (
        <Form
          inputVal={inputVal}
          setInputVal={setInputVal}
          onSelectCategory={handleSelectCategory}
          selectedCat={selectedCat}
          total={total}
          onSubmitForm={handleFormSubmit}
        />
      )}
      <Footer />
    </div>
  );
};
export default App;

const ImageBox = function ({ showImage, showText, total }) {
  return (
    <div className="image-div">
      <img src={showImage} alt="poultry images" />
      <h2 className="age">{showText.title}</h2>
      <AdditionalInfo showText={showText} total={total} />
    </div>
  );
};

const PageButton = function ({ onPreviousPage, onNextPage, page }) {
  return (
    <div className="page-container">
      <button
        className={`btn prev ${page === 0 ? "hidden" : ""}`}
        onClick={onPreviousPage}
      >
        Prev
      </button>
      <button
        className={`btn next ${page === numPages - 1 ? "hidden" : ""}`}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
};
const Title = function () {
  return <h1> Vivian's Poultry</h1>;
};

const Broilers = function ({ broiler, handleClick }) {
  const { image, title } = broiler;
  return (
    <li className="broiler-list " onClick={() => handleClick(broiler)}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </li>
  );
};

const Button = function ({ children, onClick }) {
  return (
    <>
      <button className="button" onClick={onClick}>
        {children}
      </button>
      ;
    </>
  );
};

const Form = function ({
  inputVal,
  setInputVal,
  selectedCat,
  onSelectCategory,
  total,
  onSubmitForm,
}) {
  return (
    <form className="form" onSubmit={onSubmitForm}>
      <p>Enter Number of Broilers Needed</p>
      <input
        type="text"
        value={inputVal ? inputVal : ""}
        onChange={(e) => {
          setInputVal(+e.target.value);
        }}
      />

      <p>
        Total Cost of {inputVal}{" "}
        {selectedCat === "Roaster" && inputVal > 1
          ? selectedCat + "s"
          : selectedCat}
      </p>
      <input
        type="text "
        disabled
        value={`$${(+total * +inputVal).toFixed(1)}`}
      />

      <div>
        <p>Select Category</p>
        <select value={selectedCat} onChange={onSelectCategory}>
          <option value="">none</option>
          <option value="One Day Old">1 day old</option>
          <option value="Three Weeks Old">3 weeks old</option>
          <option value="Eight Weeks Old"> 8 weeks old</option>
          <option value="Roaster"> roasters</option>
        </select>
      </div>
      <input
        placeholder="enter password"
        required
        type="password"
        style={{ marginBottom: "10px" }}
      />
      <Button type="submit">buy</Button>
    </form>
  );
};

const AdditionalInfo = function ({ showText, total }) {
  return (
    <div>
      <h4 className="text">{showText.text}</h4>
      <span>Price ${showText.price}</span>
      {!total ? (
        ""
      ) : (
        <p>
          Your order is complete! Delivery will be done within 24 hrs. Thanks
          for trusting our service
        </p>
      )}
      <p>&nbsp;</p>
    </div>
  );
};

const Footer = function () {
  return (
    <p className="footer">
      &copy; created by Ngwa sidwan for learning purposes 😊
    </p>
  );
};
