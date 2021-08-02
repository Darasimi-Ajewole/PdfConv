import DropContainer from  './Drop-Container';
import { ToastContainer } from 'react-toastify';

const Main = () => {
	return (
    <>
			<main className="container text-center">
					<div className="wrapper wow fadeInUp delay-05s">
							<DropContainer />
        			<ToastContainer />
					</div>
			</main>
    </>
	)
}
	
export default Main;