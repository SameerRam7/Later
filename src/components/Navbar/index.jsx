import React, { useEffect } from "react";
import "./style.css";
import Logo from "../../assets/Logo.png";
import Notification from "../../assets/notification.png";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import userImg from "../../assets/user.svg";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFunc() {
    try {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigate("/");
          toast.success("Logged Out Succesfully");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="bg-black sticky top-0 left-0 z-[100]  flex justify-between items-center">
      <img src={Logo} className="mx-2 w-24 h-24  " />
      
      {user?<> <p className=" text-white text-2xl -ml-[85px] font-Mons font-black"> {/* When the user is logged in then the position of LOGO is */}
        {" "}
        WalletWise.
      </p> 
      <div className="flex bg-[#242323] items-center rounded-full px-3 pr-10 mr-96">
        <button className="bg-[#242323] text-white cursor-pointer hover:text-[#808080] hover:transition duration-[0.6s]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-search"
          >
            <circle cx="10" cy="10" r="9"></circle>
            <line x1="20" y1="20" x2="17.65" y2="17.65"></line>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search something..."
          className="bg-[#242323] text-white flex-1 rounded-full p-[10px] outline-none  font-medium hover:placeholder:text-[#808080] placeholder:hover:duration-200 "
        />
      </div>
      </>: 
      <p className=" text-white text-2xl -ml-[33.1rem] font-Mons font-black"> {/* When the user is logged out then the position of LOGO is */}
      {" "}
      WalletWise.
    </p>}

      

    {/* {user &&
        (
        the content to display when user is logged in
        )
    } */}

      <img src="" alt="" className="" />
      <ul className="text-white flex gap-4 ">
        {/* <li> <img src={Notification} alt="" className='w-[45px]'/> </li> */}
        {/* <li>Profile</li> */}
        {user && (
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL ? user.photoURL : userImg}
              className="w-9 h-9 rounded-[50%]"
            />
            <li
              onClick={logoutFunc}
              className=" cursor-pointer opacity-[1] hover:opacity-[0.7] hover:transition duration-500 mr-6"
            >
              Logout
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
