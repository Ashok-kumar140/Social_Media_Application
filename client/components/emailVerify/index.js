import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
// import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";
import {Link} from 'next/link';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className="container">
					<img src="/images/successful.png" alt="success_img" />
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className="btn btn-success">Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;