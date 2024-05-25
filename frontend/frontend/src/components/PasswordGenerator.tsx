import { useState, useEffect } from "react";
import usePasswordGenerator from "../hooks/usePasswordGenerator";
import StrengthChecker from "../utils/StrengthChecker";
import { useSavePassMutation } from "../../redux/features/api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { styles } from "../styles/styles";

const PasswordGenerator = () => {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckBoxData] = useState([
    { title: "uppercase", state: false },
    { title: "lowercase", state: false },
    { title: "numbers", state: false },
    { title: "symbols", state: false },
  ]);
  const [savepass] = useSavePassMutation();
  const [field, setField] = useState("");

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!userInfo) navigate("/login");
  }, []);

  const { password, error, generatePassword } = usePasswordGenerator();

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckBoxData(updatedCheckboxData);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleSubmit = async (e: any) => {
    try {
      console.log("field is ", field);
      e.preventDefault();
      if (!password) {
        toast.info("generate passwords");

        return;
      } else if (field.trim() === "") {
        toast.info("Enter the platform Name");

        return;
      } else {
        const res = await savepass({ password, field }).unwrap();
        if (res.msg) {
          toast.info("saved successfully");
          setField("");
          navigate("/");
          return;
        } else {
          toast.error("some thing went wrong");
          return;
        }
      }
    } catch (err) {
      toast.error("some thing went wrong");
    }
  };

  return (
    <div className="pt-[67px] p-4 bg-gray-100 h-screen justify-center items-center flex">
      <div className="bg-gray-50 shadow-md w-1/2  p-12 rounded-lg text-black">
        <div className="flex items-center justify-between mb-5">
          {error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : (
            password && (
              <h1 className="text-gray-800 mr-8 border p-2 px-4 ">
                {password}
              </h1>
            )
          )}
          <button
            className={`${styles.button} cursor-pointer bg-blue-600 border-0 text-white py-2 px-6 mr-4`}
            onClick={copyPassword}
          >
            {copied ? "copied" : "copy"}
          </button>
          <button
            className={`${styles.button} cursor-pointer bg-blue-600 border-0 text-white py-2 px-6 mr-4`}
            onClick={() => generatePassword(checkboxData, length)}
          >
            generate
          </button>
        </div>
        <div className="flex flex-col font-semibold pb-6 mb-2 text-sm">
          <span>
            <label htmlFor="length">Number of characters : </label>
            <label htmlFor="passLen">{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e: any) => setLength(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1  text-sm mb-2 uppercase">
          {checkboxData.map((chk, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  className="cursor-pointer "
                  onChange={() => handleCheckboxChange(index)}
                  checked={chk.state}
                />
                <label htmlFor="chktitle" className="-mt-4">
                  {" "}
                  {chk.title}
                </label>
              </div>
            );
          })}
        </div>
        <StrengthChecker password={password} />

        <div className="bg-gray-200 p-4 rounded-lg border border-dashed border-gray-400 mt-2">
          <h1 className="text-sm text-gray-900 font-bold mb-2 uppercase">
            Save Password
          </h1>
          <form onSubmit={handleSubmit} className="p-2 flex items-center">
            <div className="flex flex-col mr-4">
              <label className="block text-black text-sm pb-2">
                Enter platform name
              </label>
              <input
                className="shadow appearance-none border rounded w-72 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="username"
                type="text"
                placeholder="Enter platform name"
                value={field}
                onChange={(e) => setField(e.target.value)}
              />
            </div>
            <div className=" h-full flex justify-end items-end mt-8">
            <button className={`${styles.button} text-white py-2 px-4`}>
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
