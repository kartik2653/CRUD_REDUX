import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import ModalOutbox from '../../modals/ModalOutbox';
const Loader = () => {
    return ( 
        <>
        <ModalOutbox/>
        <div style={{display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:'0px',
        left:'0px',
        width:'100%',
        height:'100%'
        }}>
        <div style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        }}>
        <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}/>
        
        </div>
        
        </div>
        </>
    );
}
 
export default Loader;