const { createStore } = Redux;

// Actions
const ADD_PRODS = 'ADD_PRODS';
const ADD_PROD = 'POST_PROD';
const DELETE_PROD = 'DELETE_PROD';

// Action Creators
const addProds = prods => ({ type: ADD_PRODS, prods });
const addProd = prod => ({ type: ADD_PROD, prod });
const deleteProd = ({ id }) => ({ type: DELETE_PROD, id });

// State
const initialState = {
  products: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODS: {
      return { ...state, products: action.prods };
    }
    case ADD_PROD: {
      return { ...state, products: [...state.products, action.prod] };
    }
    case DELETE_PROD: {
      const products = state.products.filter(({ id }) => id !== action.id);
      return { ...state, products };
    }
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);
