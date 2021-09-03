import App from '../App';
import { shallow } from 'enzyme';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';


test('Renders App correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<Header />)).toBe(true);
  expect(wrapper.contains(<Main />)).toBe(true);
  expect(wrapper.contains(<Footer />)).toBe(true);

});