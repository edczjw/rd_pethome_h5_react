import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

/**
 * 
//  选择亲属关系
 */

function translateRem(pxValue) {
    const ratio = 37.5; // 根据项目配置比例的方式自行设定
    // pxValue = parseInt(pxValue); 
    return pxValue / ratio + 'rem';
} 
class QsActionPop extends Component {
    constructor(props){
        super(props)
        this.state=({

        })
    }
    render() {
        return (
            <div
                onClick={this.props.onClick}
                style={{ backgroundColor: '#fff', paddingLeft: 0,borderBottom:translateRem(1), borderBottomColor:'#E8E8E8',borderBottomStyle:'solid'}}
            >
                <div className="test" style={{ display: 'flex', height: translateRem(45), justifyContent:'center',alignItems:'center', position:'relative',borderBottom:0 }}>
                    <div style={{fontSize: translateRem(16), flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',height:'100%',lineHeight: translateRem(48) }}>{this.props.children}</div>
                    <div style={{ textAlign: 'right', marginRight: translateRem(9.4),fontFamily: 'PingFangSC-Regular',height:'100%',lineHeight: translateRem(48)}}> 
                        {
                            this.props.value===''?
                            <span style={{fontSize: translateRem(16),color: '#AAAAAA'}}>{this.props.extra}</span>:<span style={{fontSize: translateRem(16),color: '#333333'}}>{this.props.value}</span>
                        }
                    </div><Icon style={{color: '#AAAAAA',marginRight: translateRem(11),height:'100%',lineHeight: translateRem(48)}} type="right" size='md' />
                </div>
            </div>
        );
    }
}

export default QsActionPop;
