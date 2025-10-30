// import React from 'react';
// import { DatePicker,Space } from 'antd';
// import {Link} from 'react-router-dom'

// const PaymentForm = () => {
//     const { RangePicker } = DatePicker;
//   return (

//     <div className="form-container" >
// <form className='payment-form'>
// <div className="price-pernight">
// Price: <b>&#8377;2008</b>
// <span>/Per night</span>
// </div>

// <div className='payment-field'>
// {/* Date Range */}
// <div className='date'>
// <Space direction='vertical' size={12}>
// <RangePicker format="YYYY-MM-DD" picker="date"/>
// </Space>
// </div>
// </div>

// <div className='guest'>
//     <label className='payment-labels'> Number of guests : </label>
//     <br/>
//     <input 
//     type="number"
//     className='no-of-guests'
//     placeholder='Guest'
//     defaultValue='2'
//     />
// </div>

// <div className='name-phoneno'>
//     <label className='payment-labels'>Your full  Name : </label>
//     <br/>
//     <input 
//     type="text"
//     className='full-name'
//     placeholder='Name'
//     />
//     <br/>
//     <label className='payment-labels'>Phone Number : </label>
//     <input type='number' className='phone-number' placeholder='Phone Number'/>
//     </div>

// <div className='book-place'>
//     <button>
//         <Link to ={"/login"} style={{textDecoration: "none", color: "white"}}>
//         Login to Book
//         </Link>
//     </button>
// </div>
// </form>
// </div>
//   )
// }
// export default PaymentForm

import React from 'react';
import { DatePicker, Space } from 'antd';
import { Link } from 'react-router-dom';

const PaymentForm = () => {
    const { RangePicker } = DatePicker;

    // Inline style objects
    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
    };

    const paymentFormStyle = {
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '450px',
        width: '100%',
        boxSizing: 'border-box',
    };

    const pricePerNightStyle = {
        textAlign: 'center',
        marginBottom: '24px',
        fontSize: '20px',
        color: '#333',
    };
    
    const guestSectionStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    };

    const namePhoneSectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px',
    };

    const inputLabelStyle = {
        display: 'block',
        marginBottom: '4px',
    };
    
    const inputStyle = {
        width: '100%',
        boxSizing: 'border-box',
    };

    const bookButtonStyle = {
        width: '100%',
        padding: '12px 0',
        backgroundColor: '#1890ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        textAlign: 'center',
    };

    return (
        <div style={formContainerStyle}>
            <form style={paymentFormStyle}>
                <div style={pricePerNightStyle}>
                    Price: <b>₹2008</b>
                    <span>/Per night</span>
                </div>

                <div className='payment-field' style={{ marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>Select Dates:</div>
                    <div className='date'>
                        <Space direction='vertical' size={12} style={{ width: '100%' }}>
                            <RangePicker format="YYYY-MM-DD" picker="date" style={{ width: '100%' }}/>
                        </Space>
                    </div>
                </div>

                <div style={guestSectionStyle}>
                    <label style={inputLabelStyle}>Number of guests:</label>
                    <input 
                        type="number"
                        style={{ ...inputStyle, width: '50px' }} // Small width for guest count
                        placeholder='Guest'
                        defaultValue='2'
                    />
                </div>

                <div style={namePhoneSectionStyle}>
                    <div>
                        <label style={inputLabelStyle}>Your full Name:</label>
                        <input 
                            type="text"
                            style={inputStyle}
                            placeholder='Name'
                        />
                    </div>
                    <div>
                        <label style={inputLabelStyle}>Phone Number:</label>
                        <input 
                            type='number'
                            style={inputStyle}
                            placeholder='Phone Number'
                        />
                    </div>
                </div>

                <div className='book-place'>
                    <button style={bookButtonStyle}>
                        <Link to={"/login"} style={linkStyle}>
                            Login to Book
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    );
};
export default PaymentForm;



