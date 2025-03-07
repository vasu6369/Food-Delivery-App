import { createContext, useEffect, useState } from "react";
import { fooditems } from "../assets/fooditems";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {

  const [cartitems, setCartItems] = useState({});

  const addTocart = (id) => {
    if(!user){
      logintoasty();
      return;
    }
    if (!cartitems[id]) {
      setCartItems((prev) => ({ ...prev, [id]: 1 }));
    }
    else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
    greentoasty();
  }

  const removefromCart = (id) => {
    if(!user){
      logintoasty();
      return;
    }
    setCartItems((prev) => ({ ...prev, [id]: prev[id] > 1 ? prev[id] - 1 : 0 }));
    redtoasty();
  }

  const [whishlist, setWhishlist] = useState([]);

  const toggleWhishlist = (itemId) => {
    if(!user){
      logintoasty();
      return;
    }
    setWhishlist(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );

  };

  const [myorders, setMyorders] = useState([]);

  const addtomyorders = () => {
    const cartOrder = Object.entries(cartitems)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const item = fooditems.find((food) => food.id === id);
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          url: item.url,
          description: item.description,
        };
      });

    setMyorders((prev) => [...prev, ...cartOrder]);
    setCartItems({});
  };


  const [user, setUser] = useState(false);

  const signup = (details) => {
    localStorage.setItem(`${details.email}`, JSON.stringify(details));
  };

  const login = (details) => {
    const suser = JSON.parse(localStorage.getItem(`${details.email}`));
    if (suser && suser.email === details.email && suser.password == details.password) {
      setUser(suser);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(false);
  }

  useEffect(
    () => console.log(user), [user]
  )


  const greentoasty=()=>{
    toast.success(`One Item added to cart!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,  
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      newestOnTop:true,
      style: {
        background:"black",
        border:"solid 2px #07bc0c",
        color:"#07bc0c",
          fontWeight: "bold",
          borderRadius: "9px",
      },
  });
  }

  const redtoasty=()=>{
    toast.error(`One Item removed from cart!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: {

        width:"350px",
        background:"black",
        border:"solid 2px  #e74d3c",
        color:"#e74d3c",
          fontWeight: "bold",
          borderRadius: "9px",
      },
      
  });
  }


  const logintoasty=()=>{
    toast.warning("Please log in to continue!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }

  
  const contextValue = {
    fooditems, cartitems, setCartItems, addTocart, removefromCart, whishlist, toggleWhishlist, addtomyorders, myorders, signup, login, user, handleLogout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
