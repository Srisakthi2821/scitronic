document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('feautureProductsContainer');
    const products = document.querySelectorAll(".product-card"); 
    let index = 0;
  
    function scrollProducts() {
      if (index < products.length) {
        const cardWidth = products[index].offsetWidth + 10; // Include gap
        container.scrollTo({
          left: container.scrollLeft + cardWidth,
          behavior: "smooth"
        });
        index++;
      } else {
        container.scrollTo({ left: 0, behavior: "smooth" }); // Reset to start smoothly
        index = 0;
      }
    }
  
    setInterval(scrollProducts, 2500); // Scroll every 2 seconds for better 
  
    document.getElementById("menuBtn").addEventListener("click", function () {
      document.getElementById('mobileMenu').classList.toggle('hidden');
    });
  });
  
  /* Quote Form */
  function openQuoteModal1() {
    document.getElementById("quoteModal1").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  
  function closeQuoteModal1() {
    document.getElementById("quoteModal1").classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  
  document.getElementById("quoteForm1").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Quote request submitted for Modal 1!");
    closeQuoteModal1();
    e.target.reset();
  });
  
  function openQuoteModal2() {
    document.getElementById("quoteModal2").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  
  function closeQuoteModal2() {
    document.getElementById("quoteModal2").classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  
  document.getElementById("quoteForm2").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Estimate request submitted for Modal 2!");
    closeQuoteModal2();
    e.target.reset();
  });