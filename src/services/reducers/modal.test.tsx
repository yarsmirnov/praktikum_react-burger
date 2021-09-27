import reducer from './modal';
import {
  openModalAction,
  closeModalAction
} from '../actions/modal';



describe('Test modal reducer', () => {

  it('openModal() should set isOpen status and ComponentToView value', () => {
    const initial = {
      isOpen: false,
      ComponentToView: null,
    };

    const PayloadComponent = (<div />);

    expect(reducer(initial, openModalAction(PayloadComponent)))
    .toEqual({
      isOpen: true,
      ComponentToView: PayloadComponent,
    });
  })

  it('closeModal() should set isOpen status and reset ComponentToView value to null', () => {
    const initial = {
      isOpen: true,
      ComponentToView: <div />
    }

    const expected = {
      isOpen: false,
      ComponentToView: null,
    };

    expect(reducer(initial, closeModalAction()))
      .toEqual(expected);
  })
});
