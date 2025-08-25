import React from "react";
import { TodoList } from "../todo/TodoList";
import { useAuth } from "../../context/AuthContext";

export const Dashboard=()=>{
    const { user } = useAuth();

    return(
        <div>
            <TodoList token={user.token} />
        </div>
    )
}