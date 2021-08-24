import DropContainer from  './Drop-Container';
import { ToastContainer } from 'react-toastify';
import StatusContextProvider from '../context/ConversionStatus';

const Main = () => {
	return (
    <>
			<main className="container text-center">
					<div className="wrapper wow fadeInUp delay-05s">
						<StatusContextProvider>
							<DropContainer />
        			<ToastContainer />
						</StatusContextProvider>
					</div>
			</main>
    </>
	)
}
	
export default Main;