import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numb, setNumb] = useState(false);
  const [char, setChar] = useState(false);
  const [pwd, setPwd] = useState("");

  const pwdRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abhanahabaha ";

    if (numb) str += "0123456789";
    if (char) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }
    setPwd(pass);
  }, [length, numb, char]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(pwd);
    pwdRef.current.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, numb, char]);

  return (
    <>
      <div className="w-full mx-auto max-w-md bg-gray-900 text-orange-500 rounded-lg px-4 py-3 my-8 shadow-md">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={pwd}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={pwdRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 text-white px-3 py-1"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 text-white">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
              min={6}
              max={100}
              value={length}
              name=""
              id=""
            />
            <label htmlFor="length">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              onChange={() => {
                setNumb((prev) => !prev);
              }}
              className="cursor-pointer"
              name=""
              id=""
              defaultChecked={numb}
            />
            <label htmlFor="numb">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              onChange={() => {
                setChar((prev) => !char);
              }}
              name=""
              id=""
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default App;
