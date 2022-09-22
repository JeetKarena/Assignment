import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Product() {
	const APIURL = "https://63031e0b9eb72a839d7932f0.mockapi.io/Products"
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	useEffect(
		() => {
			fetch(APIURL)
				.then(res => { return res.json() })
				.then(res => setData(res));
		}, [])

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	const DesignProduct = data.map((product, index) => {
		return <div className='col col-mb-3 col-xxl-3 col-xxl-m-4 mb-4 d-flex justify-content-center ' key={index} >
			<div className="card rounded " style={{ width: 18 + "rem" }}>
				<img src={product.ProductImage} className="card-img-top" alt="..." />
				<div className="card-body p-2 ">
					<h5 className="card-title">Name : {product.ProductName}</h5><hr />
					<h4 className="card-title">ProductCategory :{product.ProductCategory}</h4>
					<hr />
					<hr />
					<button className="btn btn-primary" onClick={() => { navigate('/productdetails/' + product.id); }}>View Details</button>
					<button className="btn btn-primary m-2"
						onClick=
						{() => {
							let Deleted = data.splice(index, 1);
							setData([...data]);
							fetch(APIURL + '/' + Deleted[0].id, { method: "DELETE" })
								.then(res => {
									console.log("SucessFully Deleted");
									 Toast.fire({
										icon: 'success',
										title: 'Deleted successfully'
									})
								}).catch(()=>{
									Toast.fire({
										icon: 'warning',
										title: 'Not Deleted successfully Try Again'
									})
								})
						}}
					>Delete
					</button>
				</div>
			</div>
		</div>;
	})
	return (
		<>
			<div className='container-fluid container'>
				<div className='row'>{DesignProduct}</div>
			</div>
		</>
	)
}
