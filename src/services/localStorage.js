export function updateCart(product, num) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productUp = cart.find((item) => item.id === product.id);
  if (productUp) {
    const newCart = cart
      .map((item) => {
        if (item.id === product.id) {
          item.quantity += num;
        }
        return (item);
      });
    localStorage.setItem('cart', JSON.stringify([...newCart]));
  } else {
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
  }
}

export function removeCartId(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const newCart = cart.filter((item) => item.id !== product.id);
  localStorage.setItem('cart', JSON.stringify(newCart));
}

// esboço do remover
// cart.filter((productLS) => productLS.title !== titleARemover);
// removeCart = (removeTitle) => {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const newCart = cart.filter((product) => product.title !== removeTitle);
//   localStorage.setItem('cart', JSON.stringify([...newCart]));
// };
