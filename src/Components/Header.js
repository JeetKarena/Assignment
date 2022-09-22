import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

// <!-- ========== Swal Alert Start Section ========== -->
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseEnter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})
// <!-- ========== Swal Alert End Section ========== -->

export default function Header() {
	const APIURL = "https://63031e0b9eb72a839d7932f0.mockapi.io/Products/"
	const [data, setData] = useState({ ProductName: "", ProductImage: "", ProductPrice: "", ProductCategory: "", ProductDescription: "" });
	const Navigate = useNavigate();

	return (
		<>

			<nav className="navbar bg-light navbar-expand-lg">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						<img src="../logo192.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
						ReactApp
					</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/product">Product</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Product</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{/* <!-- ========== ADD PROD POP UP START Section ========== --> */}

			<>
				<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label" >ProductName :</label>
										<input type="text" className="form-control" id="recipient-name" required value={data.ProductName} placeholder="Enter ProductName " onChange={(e) => { setData({ ...data, ProductName: e.target.value }); console.log(e); }} />
									</div>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label" >ProductImage URL :</label>
										<input type="text" className="form-control" id="recipient-name" required value={data.ProductImage} placeholder="Enter ProductImage URL" onChange={(e) => { setData({ ...data, ProductImage: e.target.value }) }} />
									</div>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label" >ProductPrice :</label>
										<input type="text" className="form-control" id="recipient-name" value={data.ProductPrice} placeholder="Enter ProductPrice" onChange={(e) => { setData({ ...data, ProductPrice: e.target.value }) }} />
									</div>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label" >ProductCategory :</label>
										<input type="text" className="form-control" id="recipient-name" value={data.ProductCategory} placeholder="Enter ProductCategory" onChange={(e) => { setData({ ...data, ProductCategory: e.target.value }) }} />
									</div>
									<div className="mb-3">
										<label htmlFor="message-text" className="col-form-label">ProductDescription : </label>
										<textarea className="form-control" id="message-text" value={data.ProductDescription} placeholder="Enter ProductDescription" onChange={(e) => { setData({ ...data, ProductDescription: e.target.value }) }}></textarea>
									</div>
								</>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" onClick={(e) => { console.log(e); }}>Close</button>
								<button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal"
									onClick={(e) => {
										console.log(e);
										fetch(APIURL, { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
											.then(res => {
												console.log("Successfuly Added");
												Toast.fire({
													icon: 'success',
													title: 'Added successfully'
												})
												Navigate('/');
											})
											.catch(() => {
												Toast.fire({
													icon: 'error',
													title: 'Not Added successfully'
												})
											})
									}}
								>Submit</button>
							</div>
						</div>
					</div>
				</div>
			</>
			{/* <!-- ========== ADD PROD POP UP END Section ========== --> */}
		</>
	)
}
