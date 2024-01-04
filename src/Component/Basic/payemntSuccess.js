import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./App.css"
import { BASE_URL } from '../uri';

const PaymentSuccessPage = ({socket}) => {
    const location = useLocation()
    const[id,setid]=useState(location.state.item)
    const navigate = useNavigate()
 
    const{cartData}=useSelector(state=>state.items7)

    const handleDownload = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/generatepdf`, {
            cartData
          }, {
            responseType: 'arraybuffer', 
            withCredentials: true, 
            credentials: 'include',
          });
      
          if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
    
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'invoice.pdf';
   
            document.body.appendChild(link);
      
            link.click();
      
            document.body.removeChild(link);
          } else {
            console.error(response.statusText);
          }
        } catch (error) {
          console.error(error);

        }
      };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Payment Successful!</h2>
        <p style={styles.description}>
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <p style={styles.additionalInfo}>
          Order ID: {id} <br />
          Transaction Date: {new Date().toLocaleString()}
        </p>
        <div style={{bottom:"1.2rem",position:"absolute",minWidth:"13vw",justifyContent:"flex-start"}} className='formbutn'>
        <button onClick={()=>navigate("/")}>Back to Home</button>
        </div>
        <div style={{marginTop:"2rem",justifyContent:"flex-end"}} className='formbutn'>
        <button onClick={handleDownload}>Download Invoice</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  content: {
    position:"relative",
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#4CAF50',
    fontSize: '24px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  additionalInfo: {
    fontSize: '14px',
    marginBottom: '20px',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default PaymentSuccessPage;
