import { shallow, mount } from 'enzyme';
import ConversionModal from '../components/Conversion-Modal';
import Upload from '../components/Upload';
import Conversion from '../components/Converter';
import { startUploadSession, upload2Storage } from '../utils/upload';
import ProgressBar from 'react-bootstrap/ProgressBar'



test('Renders Modal correctly', () => {
  const wrapper = shallow(<ConversionModal file={null} blobName={null} />);
  expect(wrapper.contains(<Upload />)).toBe(false);
  expect(wrapper.contains(<Conversion />)).toBe(false);
});

test.skip('Renders Upload correctly', () => {
  const onUploadComplete = jest.fn();
  const file = new File(["fidjdkkdmkdkmakdmkamkdmkamkdmko"], "foo.txt", {
    type: "text/plain",
  });

  jest.mock('../utils/upload', startUploadSession);
  jest.mock(upload2Storage)

  const wrapper = mount(<Upload file={file} onUploadComplete={onUploadComplete} />);
  const progressState = wrapper.state('progress')
  const ExpectedprogressBar = (
    <ProgressBar
      animated
      striped
      variant="success"
      now={progressState}
      label={`${progressState.toFixed()}%`}
    />)
  console.log(wrapper.debug())
  expect(wrapper.contains(<ExpectedprogressBar />)).toBe(true);
});
