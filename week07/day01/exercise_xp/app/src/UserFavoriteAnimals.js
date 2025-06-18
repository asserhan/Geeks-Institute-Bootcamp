import React, { Component } from 'react';

class UserFavoriteAnimals extends Component{
    render() {
        const list = this.props.favAnimals;
        return(
        <ul>
            {list.map((animal,index)=>(
                <li key ={index} >{animal} </li>
            ))}
        </ul>

        );
    }
}

export default UserFavoriteAnimals;