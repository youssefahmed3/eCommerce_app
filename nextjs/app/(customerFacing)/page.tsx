"use client"

import { hashPassword } from "@/lib/isValidPassword";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default  function Home() {
  /* const count = useSelector((state:RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>() */
  async function hash() {
    const pass = await hashPassword("admin")
    console.log(pass);
    
  }
  
  return (
    <div className="flex-grow">
      <button onClick={hash}>Generate pass</button>
    </div>
  );
}
