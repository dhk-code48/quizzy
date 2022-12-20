import React from "react";
import Avatar from "react-avatar";
import { getUsers } from "../../Firebase";

const Search = () => {
    const users = getUsers();
    return(
        <div className="users__search">
            <input className="users_box"/>
            <div className="users_list">
                {
                        users.map((user)=>{
                            return(<div>
                                <Avatar name="user.name"/>
                                <h1>{user.name}</h1>
                                
                            </div>)
                        })
                }
            </div>
        </div>
    )
}

export default Search;