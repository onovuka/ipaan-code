
import React from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
;


function Darkmode() {

    const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <div className="">
            <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoSunny size={30} />
                }
                {
                    !dark && <IoMoon size={30} />
                }
            </button>
        </div>
    );
}

export default Darkmode;