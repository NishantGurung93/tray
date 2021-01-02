import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import UserForm from "../UserForm";

const dispatch = jest.fn();
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

const mockStore = {
  value: {},
  useDispatch: jest.fn(),
  dispatch,
  getState: jest.fn(),
  subscribe: jest.fn(),
}

const renderComponent = () => render(
  <Provider store={mockStore}>
    <Router history={historyMock}>
      <UserForm />
    </Router>
  </Provider>
);

describe('Header component', () => {
  it('should render the component', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  describe('valid form behaviour', () => {
    beforeEach(async () => {
      const { getByTestId } = renderComponent();

      const name = getByTestId('name-input');
      fireEvent.change(name, { target: { value: 'Tom Hardy' } });

      const role = getByTestId('role-input');
      fireEvent.change(role, { target: { value: 'Bane' } });

      const email = getByTestId('email-input');
      fireEvent.change(email, { target: { value: 'tom@hardy.com' } });

      const password = getByTestId('password-input');
      fireEvent.change(password, { target: { value: 'SuperCoolTom123' } });

      const submitButton = getByTestId('submit-button');

      await act(async () => {
        fireEvent.click(submitButton);
      });
    });

    it('should call submitDetails', async () => {
      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          email: 'tom@hardy.com',
          name: 'Tom Hardy',
          password: 'SuperCoolTom123',
          role: 'Bane',
        },
        type: 'user/submitDetails',
      });
    });

    it('should call useHistory hook with "/privacy"', async () => {
      expect(historyMock.push).toHaveBeenCalledWith('/privacy');
    });
  });
});
