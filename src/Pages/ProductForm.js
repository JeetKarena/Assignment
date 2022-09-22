import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function ProductForm() {
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

	const APIURL = "https://63031e0b9eb72a839d7932f0.mockapi.io/Products/"
	const [data, setData] = useState({ ProductName: "", ProductCategory: "", ProductImage: "", ProductDescription: "" });
	const navigator = useNavigate();
	const param = useParams();
	useEffect(
		() => {
			fetch(APIURL + param.id).then(res => { return res.json() }).then(res => setData(res))

		}, [param.id])
	return (
		<>
			<div className='container container-fluid'>
				<div className="row m-3">
					<div className="col mb-3">
						<label htmlFor="exampleFormControlInput1" className="form-label">ProductName : </label>
						<input type="text" className="form-control" placeholder="ProductName" value={data.ProductName} onChange={(e) => { setData({ ...data, ProductName: e.target.value }) }} />
					</div>
					<div className="col mb-3">
						<label htmlFor="exampleFormControlInput1" className="form-label">ProductCategory : </label>
						<input type="text" className="form-control" placeholder="ProductCategory" value={data.ProductCategory} onChange={(e) => { setData({ ...data, ProductCategory: e.target.value }) }} />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleFormControlInput1" className="form-label">ProductImage URL : </label>
						<input type="text" className="form-control" id="exampleFormControlInput1" placeholder="ProductCategory URL .png etc.." value={data.ProductImage} onChange={(e) => { setData({ ...data, ProductImage: e.target.value }) }} />
					</div>
					<div className="mb-3">
						<label htmlFor="exampleFormControlTextarea1" className="form-label">ProductDescription : </label>
						<textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={data.ProductDescription} onChange={(e) => { setData({ ...data, ProductDescription: e.target.value }) }}></textarea>
					</div>
				</div>

				<div className="row mb-3">
					<div className="col d-flex justify-content-center"> <button type="button" className="btn btn-primary w-25"
						onClick={() => {
							fetch(APIURL + param.id, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
								.then(res => {
									Toast.fire({
										icon: 'success',
										title: 'Updates SucessFully'
									})
									navigator('/product')
								}
								).catch(
									() => {
										Toast.fire({
											icon: 'error',
											title: 'Not Updated SucessFully Try Again'
										})
									}
								)
						}}>Submit</button>
					</div>
				</div>
			</div>
		</>
	)
}
