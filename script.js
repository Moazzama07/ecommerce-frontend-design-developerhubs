document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-bar input");
  const searchSelect = document.querySelector(".search-bar select");
  const searchButton = document.querySelector(".search-bar button");

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim().toLowerCase();
    const category = searchSelect.value.toLowerCase();

    if (query === "") {
      alert("Please enter a search term.");
      return;
    }

    console.log(`🔍 Searching: "${query}" | Category: "${category}"`);

    
    const allProducts = document.querySelectorAll(".saved-card, .product-card");

    allProducts.forEach(product => {
      const title = product.querySelector("p")?.textContent.toLowerCase() || "";
      const matchesQuery = title.includes(query);
      const matchesCategory = category === "all category" || title.includes(category);

      product.style.display = (matchesQuery && matchesCategory) ? "block" : "none";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const supplierForm = document.querySelector("#supplier form");

  if (supplierForm) {
    supplierForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const item = supplierForm.querySelector('input[type="text"]').value.trim();
      const details = supplierForm.querySelector("textarea").value.trim();
      const quantity = supplierForm.querySelector('input[type="number"]').value.trim();
      const unit = supplierForm.querySelector("select").value;

   
      if (!item || !quantity) {
        alert("Please fill in required fields.");
        return;
      }

      // Show success message
      alert(`Inquiry sent!\n\nItem: ${item}\nQuantity: ${quantity} ${unit}\nDetails: ${details}`);

      // Reset the form
      supplierForm.reset();
    });
  }
});




document.addEventListener("DOMContentLoaded", function () {
  // ✅ DROPDOWN MENU
  const menuIcon = document.getElementById("menu-toggle-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");

  if (menuIcon && dropdownMenu) {
    menuIcon.addEventListener("click", function () {
      dropdownMenu.classList.toggle("hidden");
    });
  }

  // ✅ COUNTDOWN TIMER
  const realDays = document.getElementById("hours");
  const realHours = document.getElementById("days");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function startCountdown(endTime) {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        realDays.textContent = "00";
        realHours.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      realDays.textContent = String(days).padStart(2, '0');
      realHours.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
  }

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);
  startCountdown(endDate);

  // ✅ NEWSLETTER FORM
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("email");
  const message = document.getElementById("message");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        message.style.display = "block";
        return;
      }

      message.style.color = "black";
      message.textContent = "Thank you for subscribing!";
      message.style.display = "block";
      emailInput.value = "";
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    });
  }



  // ✅ MOBILE SIDEBAR TOGGLE
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (toggleBtn && sidebar && overlay && closeBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      toggleBtn.style.display = 'none';
    });

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
      toggleBtn.style.display = 'block';
    };

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Update total price
  function updateTotal() {
    const products = document.querySelectorAll(".mycart-product");
    let subtotal = 0;

    products.forEach((product) => {
      const priceText = product.querySelector("strong").textContent.replace("$", "");
      const price = parseFloat(priceText);
      const qty = parseInt(product.querySelector(".qty-select").value);
      subtotal += price * qty;
    });

    const discount = 10.00; 
    const tax = 2.00;

    const total = subtotal - discount + tax;

    document.querySelector(".summary-line span:nth-child(2)").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(".summary-line:nth-child(2) span:nth-child(2)").textContent = `- $${discount.toFixed(2)}`;
    document.querySelector(".summary-line:nth-child(3) span:nth-child(2)").textContent = `$${tax.toFixed(2)}`;
    document.querySelector(".summary-total strong:last-child").textContent = `$${total.toFixed(2)}`;
  }

  // Quantity change listener
  const qtySelects = document.querySelectorAll(".qty-select");
  qtySelects.forEach(select => {
    select.addEventListener("change", updateTotal);
  });



  // Remove item
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach(button => {
    button.addEventListener("click", function () {
      button.closest(".mycart-product").remove();
      updateTotal();
    });
  });

  // Remove all
  const removeAllBtn = document.querySelector(".mycart-footer button:last-child");
  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", function () {
      document.querySelectorAll(".mycart-product").forEach(item => item.remove());
      updateTotal();
    });
  }

  // Save for later
  const saveButtons = document.querySelectorAll(".normal");
  const savedGrid = document.querySelector(".saved-grid");

  saveButtons.forEach(button => {
    button.addEventListener("click", function () {
      const product = button.closest(".mycart-product");
      const img = product.querySelector("img").src;
      const title = product.querySelector("h4").textContent;
      const price = product.querySelector("strong").textContent;

      const savedCard = document.createElement("div");
      savedCard.classList.add("saved-card");
      savedCard.innerHTML = `
        <img src="${img}" alt="Product">
        <strong>${price}</strong>
        <p>${title}</p>
        <button><i class="fa-solid fa-cart-shopping"></i> Move to cart</button>
      `;
      savedGrid.appendChild(savedCard);
      product.remove();
      updateTotal();

      savedCard.querySelector("button").addEventListener("click", function () {
        alert("Move to cart logic can be added here.");
        savedCard.remove();
      });
    });
  });

  // Apply coupon
  const applyBtn = document.querySelector(".coupon-box button");
  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      const input = document.querySelector(".coupon-box input").value.trim();
      if (input === "") {
        alert("Please enter a coupon code.");
      } else {
        alert(`Coupon "${input}" applied!`);
      }
    });
  }

  // Back to shop
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "index.html"; 
    });
  }
  updateTotal();
});

document.addEventListener("DOMContentLoaded", function () {
  const pageButtons = document.querySelectorAll(".page-btn");
  const navButtons = document.querySelectorAll(".nav-btn");
  const selectLimit = document.querySelector(".show-wrapper select");

  let currentPage = 1;

  function updateActivePage(newPage) {
    pageButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index + 1 === newPage);
    });
    currentPage = newPage;
    console.log(`🟢 Page: ${currentPage}, Limit: ${selectLimit.value}`);
  }

  
  pageButtons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      updateActivePage(index + 1);
    });
  });

  
  navButtons[0].addEventListener("click", function () {
    if (currentPage > 1) {
      updateActivePage(currentPage - 1);
    }
  });

  navButtons[1].addEventListener("click", function () {
    if (currentPage < pageButtons.length) {
      updateActivePage(currentPage + 1);
    }
  });

  // Event: Show select dropdown
  selectLimit.addEventListener("change", function () {
    console.log(`🔄 Items per page changed to: ${selectLimit.value}`);
    
  });

  
  updateActivePage(currentPage);
});
//  PRICE RANGE
  const slider = document.querySelector(".slider");
  const minInput = document.getElementById("min");
  const maxInput = document.getElementById("max");

  if (slider && minInput && maxInput) {
    slider.addEventListener("input", (e) => {
      const value = e.target.value;
      minInput.value = 0;
      maxInput.value = value;
    });
  }
// ✅ WISHLIST ICON TOGGLE
  document.querySelectorAll(".wishlist-icon").forEach(icon => {
    icon.addEventListener("click", function () {
      icon.classList.toggle("fa-solid");
      icon.classList.toggle("fa-regular");
      icon.style.color = "#0D6EFD";
    });
  });
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("email");
  const message = document.getElementById("message");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        message.style.color = "red";
        message.textContent = "Please enter a valid email address.";
        message.style.display = "block";
        return;
      }

      message.style.color = "black";
      message.textContent = "Thank you for subscribing!";
      message.style.display = "block";
      emailInput.value = "";
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".ratings input[type='checkbox']");
  const products = document.querySelectorAll(".product-card");

  
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
  });

  function filterProducts() {
    // Get selected rating values 
    const selectedRatings = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.parentElement.querySelectorAll("i.fas.fa-star").length);

    products.forEach((product) => {
      const ratingText = product.querySelector(".rating")?.textContent || "";
      const starCount = (ratingText.match(/★/g) || []).length;

      if (selectedRatings.length === 0 || selectedRatings.includes(starCount)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  //  IMAGE GALLERY SWITCH  //
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail-list .thumb");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      mainImage.src = this.src;
    });
  });

  // ------------------ TABS FUNCTIONALITY ------------------ //
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const inquiryModal = document.getElementById("inquiryModal");
  const openInquiryBtn = document.querySelector(".primary-btn");
  const closeModalBtn = document.querySelector(".close-btn");
  const inquiryForm = document.querySelector(".inquiry-form");

  // Open Modal
  if (openInquiryBtn) {
    openInquiryBtn.addEventListener("click", function () {
      inquiryModal.style.display = "block";
    });
  }

  // Close Modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      inquiryModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (e) {
    if (e.target === inquiryModal) {
      inquiryModal.style.display = "none";
    }
  });

  // Form submit
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      inquiryForm.reset();
      inquiryModal.style.display = "none";
      alert("Inquiry submitted successfully!");
    });
  }

  // Seller profile button
  const sellerProfileBtn = document.querySelector(".secondary-btn");
  if (sellerProfileBtn) {
    sellerProfileBtn.addEventListener("click", function () {
      // Redirect or show more seller details
      window.location.href = "seller-profile.html"; 
    });
  }

  // Save for later toggle
  const saveBtn = document.querySelector(".save");
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      this.classList.toggle("saved");
      if (this.classList.contains("saved")) {
        this.innerHTML = '<i class="fas fa-heart"></i> Saved';
      } else {
        this.innerHTML = '<i class="far fa-heart"></i> Save for later';
      }
    });
  }
});


