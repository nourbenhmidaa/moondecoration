// products.js
//
const products = [
  {
    id: 1,
    name: "Two Birds",
    price: "52DT",
    images: {
      default: "pic/2ois.jpg",
      colors: {
        white: "pic/2oiseauxblanc.jpg",
        black: "pic/2oiseaux noir.jpg",
        green: "pic/2oseaux vert.jpg"
      }
    },
    colors: ["white", "black", "green"]
  },
    {
    id: 2,
    name: "Jardin",
    price: "58DT",
    images: {
      default: "pic/jjjjardin.jpg",
      colors: {
        white: "pic/jardin11.jpg",
        black: "pic/jardinb.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 3,
    name: "Rayhanna",
    price: "58DT",
    images: {
      default: "pic/flowers.jpg",
      colors: {
        white: "pic/rayhanna.jpg",
        black: "pic/rayhanna noir.jpg"
      }
    },
    colors: ["white", "black"]
  },

  {
    id: 4,
    name: "Fleurie",
    price: "68DT",
    images: {
      default: "pic/fleurie5.jpg",
      colors: {
        white: "pic/fleurie2.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 5,
    name: "Plume",
    price: "52DT",
    images: {
      default: "pic/plumeb.jpg",
      colors: {
        gold: "pic/plumedoré.jpg",
        silver: "pic/plumeb.jpg"
      }
    },
    colors: ["gold", "silver"]
  },
  {
    id: 6,
    name: "Personnalisé",
    price: "68DT",
    images: {
      default: "pic/costumized.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 7,
    name: "nakhla",
    price: "58DT",
    images: {
      default: "pic/na5lacar.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 8,
    name: "nakhlarect",
    price: "52DT",
    images: {
      default: "pic/na5larect.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 9,
    name: "cotton flower",
    price: "58DT",
    images: {
      default: "pic/rose.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
  {
    id: 10,
    name: "2cadres",
    price: "49DT",
    images: {
      default: "pic/2cadres.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  }, 
   {
    id: 11,
    name: "Horse Bleu/Silver",
    price: "58DT",
    images: {
      default: "pic/cheval bleu.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
    {
    id:12 ,
    name: "Rayhanna",
    price: "58DT",
    images: {
      default: "pic/rayhannab.jpg",
      colors: {
        white: "pic/costumized.jpg",
        black: "pic/fleurie2.jpg"
      }
    },
    colors: ["white", "black"]
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = product.images.default;
    img.alt = product.name;
    img.className = "product-img";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price;

    const colors = document.createElement("div");
    colors.className = "color-dots";

    product.colors.forEach((color) => {
      const dot = document.createElement("span");
      dot.className = "color-dot";
      dot.style.backgroundColor = color;
      dot.title = color;
      dot.addEventListener("click", () => {
        img.classList.add("fade-out");
        setTimeout(() => {
          img.src = product.images.colors[color];
          img.classList.remove("fade-out");
          img.classList.add("fade-in");
          setTimeout(() => img.classList.remove("fade-in"), 200);
        }, 200);
      });
      colors.appendChild(dot);
    });

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.className = "add-to-cart-btn";
    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(colors);
    card.appendChild(addToCartBtn);

    container.appendChild(card);
  });
}

function addToCart(product) {
  // Check if item is already in cart
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  // Optional toast instead of alert
  showToast(`${product.name} added to cart!`);
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    countEl.textContent = totalQuantity;
    countEl.style.display = totalQuantity > 0 ? "inline-block" : "none";
  }
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 2000);
}

// Initialize count on page load
updateCartCount();


