import reducer from './modal';
import {
  openModal,
  closeModal
} from './modal';


describe('Test modal reducer', () => {
  it('openModal() should set isOpen status and ComponentToView value', () => {
    const initial = {
      isOpen: false,
      ComponentToView: null,
    };

    const PayloadComponent = (<div></div>);

    console.log(reducer(initial, openModal(PayloadComponent)).ComponentToView.type);
    expect(reducer(initial, openModal(PayloadComponent)).ComponentToView.type)
      .toEqual('div');
    expect(reducer(initial, openModal(PayloadComponent)).isOpen)
      .toEqual(true);
  })

  it('closeModal() should set isOpen status and reset ComponentToView value to null', () => {
    const initial = {
      isOpen: true,
      ComponentToView: (<div></div>)
    }

    const expected = {
      isOpen: false,
      ComponentToView: null,
    };

    expect(reducer(initial, closeModal()))
      .toEqual(expected);
  })
});
