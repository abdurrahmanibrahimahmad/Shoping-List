import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  let [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const lenght = items.length;
  const [select, setSelect] = useState("input");
  // let items;
  if (select === "user") items = items;
  if (select === "description")
    items = items.slice().sort((a, b) => a.input.localeCompare(b.input));
  const inputEl = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        console.log(inputEl.current);
        inputEl.current.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, []);
  function handleAdd(item) {
    setItems((items) => [...items, item]);
  }

  useEffect(
    function () {
      localStorage.setItem("items", JSON.stringify(items));
    },
    [handleAdd]
  );

  function onEdit(text) {
    setInput(text);
  }
  function onDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    setInput("");
  }
  function clear() {
    setItems([]);
    setInput("");
  }
  return (
    <div className="App">
      <header className="App-header">🛒 Cyber Shoping List 📃</header>
      <Input
        items={items}
        input={input}
        setInput={setInput}
        handleAdd={handleAdd}
        inputEl={inputEl}
      />
      <TotalLength lenght={lenght} />

      <InputList
        input={input}
        items={items}
        onEdit={onEdit}
        onDelete={onDelete}
        length={lenght}
      />
      <Footer
        length={lenght}
        items={items}
        select={select}
        setSelect={setSelect}
        clear={clear}
      />
    </div>
  );
}
function TotalLength({ lenght }) {
  return (
    <h1 className="h1-list">
      {lenght === 0
        ? "Start adding your shoping list"
        : `Shopping List: ${lenght}`}
    </h1>
  );
}
function Input({ input, setInput, handleAdd, inputEl }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    const id = crypto.randomUUID();
    const newItem = { id, input, sort: false };
    handleAdd(newItem);
    console.log(input);
    setInput("");
  }
  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Shoping List....."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputEl}
      />
      <button>Add</button>
    </form>
  );
}
function InputList({ items, onEdit, onDelete, length }) {
  // const lists = input;
  // setInput(list);
  return (
    <ul>
      {items.map((list) => (
        <InputPerson
          list={list}
          key={list.id}
          onEdit={onEdit}
          length={length}
          onDelete={onDelete}
        />
      ))}
      {!length && (
        <p className="cart">
          🛒
          <br />
          <p className="developer">Powered by: Abdurrahman Ibrahim Ahmad</p>
        </p>
      )}
    </ul>
  );
}
function InputPerson({ list, onEdit, onDelete, length }) {
  return (
    <>
      {length === 0 ? (
        <p className="cart">🛒</p>
      ) : (
        <li>
          {list.input}
          <div className="icons">
            <span onClick={() => onEdit(list.input)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </span>
            <span onClick={() => onDelete(list.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          </div>
        </li>
      )}
    </>
  );
}
function Footer({ length, select, setSelect, clear }) {
  return (
    <div className="footer">
      {length > 0 ? (
        <>
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="input">Arrange By Order</option>
            <option value="description">Arrange By Description</option>
          </select>
          <button onClick={clear}>Clear List</button>
        </>
      ) : null}
    </div>
  );
}
export default App;
