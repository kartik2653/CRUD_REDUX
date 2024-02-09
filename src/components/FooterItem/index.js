import React from 'react';

const FooterItem = ({text,color}) => {
    return ( 
        <div className='footerItemContainer'
         style={{width:'25%',
         height:'200px',
         display:'flex',
         flexDirection:'row',
         justifyContent:'center',
         alignItems:'center',
         borderRadius: '50px',
         background: color,
         boxShadow:  '20px 20px 60px #989898 , -20px -20px 60px #ffffff',
         padding:'15px 20px',
         minWidth:'350px',
         marginTop:'30px'
         }}>
            <p style={{textAlign:'center',
            fontSize:'20px',
            fontWeight:'bold',
            color:'#fff',
            lineHeight:'32px'
            }}>
             {text}
            </p>
        </div>
    );
}
 
export default FooterItem;