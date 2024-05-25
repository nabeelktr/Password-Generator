import {useState} from "react";

export const counter = () =>{
    const [count, setCount] = useState(0);
    const addCounter = (count: number)=>{
        setCount(count++);
    };
    return [count, addCounter];
}