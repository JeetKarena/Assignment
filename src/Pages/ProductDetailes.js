import {React,useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductDetailes() {
  const APIURL="https://63031e0b9eb72a839d7932f0.mockapi.io/Products/";
  const [data,setData] =useState({});
  const param =useParams();
  const navigator=useNavigate();
  useEffect(
    ()=>
    {
      fetch(APIURL+param.id)
      .then(res=>{return res.json()})
      .then(res=>setData(res));
    },[param.id])
  return (
    <>
      <div className='container-fluid container'>
            <div className='row d-flex justify-content-center'>
                <div className='col col-mb-3 col-xxl-3 col-xxl-m-4 mb-4 d-flex justify-content-center w-75' >
                    <div className="card rounded " style={{ width: 25 + "rem" }}>
                    <img src={data.ProductImage} className="card-img-top" alt="..." />
                        <div className="card-body p-2 ">
                            <h5 className="card-title">ID : {data.id}</h5><hr />
                            <h5 className="card-title">ProductName : {data.ProductName}</h5><hr />
                            <h5 className="card-title">ProductCategory : {data.ProductCategory}</h5>
                            <hr />
                            <p className="card-text">{data.ProductDescription}</p>
                            <hr />
                            <button className="btn btn-primary m-2" onClick={() => { navigator('/productForm/' + data.id) }}>Edit Data</button>
                        </div>
                    </div>
                </div>
                
                {/* <!-- ========== col started Section ========== --> */}
                
                {/* <!-- =========col started Section ========== --> */}
            </div>
        </div>
    </>
  )
}
