import React, { Component } from 'react';
import {HeaderWrap} from './styleHeader'
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            title:''
        }
    }
    render() {
        return ( 
            <HeaderWrap>
            <div className="arrow_let"  onClick={()=>{this.props.Back()}}>
                {this.props.if_show_arr_lft? <img className="nav_left_img" src="images/NavBar_Arrow_Left_dark@2x.png" srcSet="images/NavBar_Arrow_Left_dark@2x.png 2x, images/NavBar_Arrow_Left_dark@3x.png 3x" alt=""/>
                :null} 
            </div> 
            <div className="nav_tit">{this.props.title}</div>
            <div className="nav_rgt"></div>
            </HeaderWrap> 
        );
    }
}

export default Header;
