import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillAccountBook, AiFillDelete, AiTwotoneAccountBook } from "react-icons/ai";
import {
  useDeletePassMutation,
  useSavePassGetMutation,
} from "../../redux/features/api/api";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import CustomModal from "./constant/CustomModal";
import Login from "./Login";
import SignUp from "./SignUp";
import { styles } from "../styles/styles";
import { BsClipboard2, BsTrash } from "react-icons/bs";


const Body = () => {
  const [route, setRoute] = useState("");
  const [open, setOpen] = useState(true);
  const [getDataAPI] = useSavePassGetMutation();
  const [deleteAPI] = useDeletePassMutation();
  const [data, SetData] = useState([]);
  const [flag, setFlag] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!userInfo) {
      setRoute("Login");
    } else {
      getDataAPI({})
        .unwrap()
        .then((datas) => {
          const data = datas[0]?.savedPassword.filter(
            (index: any) => index !== null
          );
          SetData(data);
          console.log(datas[0].savedPassword);
        })
        .catch((err) => {
          toast.error(err?.error?.msg);
        });
    }
  }, [flag]);
  const deletePass = (index: any) => {
    if(window.confirm("Are you sure you want to delete this data ?")){
    deleteAPI(index)
      .unwrap()
      .then(() => toast.info("deleted successfully"))
      .catch(() => toast.error("something went wrong"));
    setFlag((prevFlag) => !prevFlag);
  }
  };

  const copyClipboard = (text:string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.info("Copied to clipboard")
      })
      .catch((err) => {
        console.error('Failed to copy text to clipboard:', err);
      });
  }
  return (
    <div className="p-2 pt-8 m-2 w-full ">
      <div className="justify-center items-center flex"> 

      <Link to="pass">
        <button className={`${styles.button} text-white` }>
          Generate Password
        </button>
      </Link>
      </div>
      <div>
        {data.length != 0 ? (
          <div className="">
         
            <div className="overflow-x-auto">
              <div className="min-w-screen min-h-screen flex justify-center font-sans overflow-hidden">
                <div className="w-full lg:w-4/6 ">
                  <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 bg-white ">
                    <table className="w-full bg-slate-400 text-sm text-left text-gray-500 dark:text-gray-400 ">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                          <th className="py-3 px-6 text-left">Platform</th>
                          <th className="py-3 px-6 text-left">password</th>
                          <th className="py-3 px-6 text-center">Delete</th>
                        </tr>
                      </thead>
                      {data
                        ? data?.map((index: any, i) => (
                            <tbody className="text-gray-600 text-sm font-light">
                              <tr
                                key={i}
                                className="border-b border-gray-200 hover:bg-gray-100"
                              >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className="font-medium">
                                      {index.field}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                  <div className="flex items-center gap-4">
                                    <span className="flex">{index.password} </span>
                                    <BsClipboard2 className="cursor-pointer text-black" onClick={() => copyClipboard(index.password)}/>
                                  </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                  <div className="flex items-center justify-center">
                                    <button
                                      className="mr-3"
                                      onClick={() => deletePass(index._id)}
                                    >
                                      <BsTrash
                                        style={{
                                          color: "red",
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))
                        : null}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-full justify-center font-sans overflow-hidden">
            <div className="w-full lg:w-4/6 ">
              <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mt-10 ">
                <p>No data to show </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {route === "Login" ? (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          component={Login}
        />
      ) : (
        route === "Signup" && (
          <CustomModal
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
            component={SignUp}
          />
        )
      )}

    </div>
  );
};

export default Body;
