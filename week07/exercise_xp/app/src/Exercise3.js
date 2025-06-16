import { Component } from "react";
import "./Exercise.css"
class Exercise extends Component{
    
    render(){
        const style_header = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
            };
        return(
            <>
                {/* Use this object to style the <h1>. */}
                <h1 style={{ color: 'red', backgroundColor: 'lightblue' }}>This is a header</h1>
                <h1 style={style_header}>This is a second header</h1>
                
                <p className="para" >This is a paragraph.</p>
                <a href="https://www.example.com">This is a link</a>
                <form>
                    <label htmlFor="name">Enter your name</label>
                    <input type="text" id="name" name="name" />
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}
export default Exercise;