const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;


    let existingProduct = state.cart.find((curItem) => curItem.id === id + color)
    console.log(product);

    if (existingProduct) {
      let updatedProduct = state.cart.map((curItem) => {
        if (curItem.id === id + color) {
          let newAmount = curItem.amount + amount
          if (newAmount >= curItem.max) {
            newAmount = curItem.max
          }
          return {
            ...curItem, amount: newAmount

          }
        }
        else {
          return curItem
        }
      })
      return {
        ...state,
        cart: updatedProduct
      };

    } else {
      let cartProduct;
      cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product?.image[0]?.url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curItem) => {
      if (curItem.id === action.payload) {
        let decrementAmount = curItem.amount - 1
        if (decrementAmount <= 1) {
          decrementAmount = 1
        }
        return {
          ...curItem,
          amount: decrementAmount
        }
      }
      else {
        return curItem
      }
    })
    return { ...state, cart: updatedProduct }
  }
  if (action.type === "SET_INCREASE") {
    let updatedProduct = state.cart.map((curItem) => {
      if (curItem.id === action.payload) {
        let IncrementAmount = curItem.amount + 1
        if (IncrementAmount >= curItem.max) {
          IncrementAmount = curItem.max
        }
        return {
          ...curItem,
          amount: IncrementAmount
        }
      }
      else {
        return curItem
      }
    })
    return { ...state, cart: updatedProduct }
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === 'CART_TOTAL_ITEM') {
    let updatedItemValue = state.cart.reduce((initialVal, curItem) => {
      let { amount } = curItem
      initialVal = initialVal + amount
      return initialVal
    }, 0)
    return {
      ...state,
      total_item: updatedItemValue
    }
  }

  if (action.type === 'CART_TOTAL_PRICE') {
    let total_price = state.cart.reduce((accum,curItem)=>{
      let {price, amount} =  curItem;
      accum = accum + (price * amount)
      return accum
    },0)
    return {
      ...state,
      total_price
    }
  }

  return state;
};

export default cartReducer;