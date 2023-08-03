// import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import Nav from '../components/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";
import { UserProvider } from '../context';



export default function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head><link rel="stylesheet" href="/css/styles.css" /></Head>
            <Nav />
            <ToastContainer position='top-center' />
            <Component {...pageProps} />;

        </UserProvider>
    )
}