"use client"
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state:RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <main className="flex-grow">
      
    </main>
  );
}
