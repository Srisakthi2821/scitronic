window.addEventListener("scroll", () => {
    if (window.scrollY > 2000) {  // Change 200 to the desired scroll position in pixels
        console.log("User scrolled down 200px");
  const counters = document.querySelectorAll(".stats-counter");
  const options = {
    threshold: 1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 50);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          counter.textContent = Math.round(current);

          if (current < target) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}
});

/*quote start*/
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
  /*quote end*/