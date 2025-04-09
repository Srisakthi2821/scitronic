
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('feautureProductsContainer');
  const products = document.querySelectorAll(".product-card"); 
  let index = 0;

  function scrollProducts() {
    if (index < products.length) {
      const cardWidth = products[index].offsetWidth + 35; // Include gap
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
function openQuoteModal2() {
  document.getElementById("quoteModal2").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeQuoteModal2() {
  document.getElementById("quoteModal2").classList.add("hidden");
  document.body.style.overflow = "auto";
}

/* Quote Form End*/

/* Navbar */


function scrollToContact() {
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  const formInputs = document.querySelectorAll(
    "#contact input, #contact textarea"
  );
  formInputs.forEach((input) => {
    input.style.transition = "box-shadow 0.3s ease-in-out";
    input.style.boxShadow = "0 0 0 2px rgba(19, 19, 19, 0.5)";
    setTimeout(() => {
      input.style.boxShadow = "none";
    }, 1000);
  });
}

lucide.createIcons();

/*Email js */
/*form 1*/
document.getElementById("quoteForm_desktop").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate inputs
  const fields = [
    "quote1_service",
    "quote1_requirements",
    "quote1_budget",
    "quote1_timeline",
    "quote1_name",
    "quote1_email",
    "quote1_phone"
  ];

  for (const id of fields) {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      alert("Please fill out all required fields.");
      field.focus();
      return;
    }
  }

  const contactMethod = document.querySelector('input[name="quote1_contact_method"]:checked');
  if (!contactMethod) {
    alert("Please select a preferred contact method.");
    return;
  }

  // Prepare email params
  const templateParams = {
    service_product: document.getElementById("quote1_service").value,
    project_requirement: document.getElementById("quote1_requirements").value,
    budget_range: document.getElementById("quote1_budget").value,
    pref_date: document.getElementById("quote1_timeline").value,
    fullname: document.getElementById("quote1_name").value,
    email: document.getElementById("quote1_email").value,
    mobile_number: document.getElementById("quote1_phone").value,
    pref_contact: contactMethod.value,
  };

  emailjs.send("service_jycirel", "template_9jcnakl", templateParams)
    .then(function () {
      alert("Quote request sent successfully, Kindly check your email for Updates!");
      document.getElementById("quoteForm").reset();
      closeQuoteModal1();
    }, function (error) {
      console.error("FAILED...", error);
      alert("There was an error sending your request. Please try again later.");
    });
});
/*form 1 email js end*/

/*form 1 email js */
document.getElementById("quoteForm_mobile").addEventListener("submit", function (e){
  e.preventDefault();

  const fields = [
    "quote2_service",
    "quote2_requirements",
    "quote2_budget",
    "quote2_timeline",
    "quote2_name",
    "quote2_email",
    "quote2_phone"
  ];

  for (const id of fields) {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      alert("Please fill out all required fields.");
      field.focus();
      return false;
    }
  }

  const contactMethod = document.querySelector('input[name="quote2_contact_method"]:checked');
  if (!contactMethod) {
    alert("Please select a preferred contact method.");
    return false;
  }

  const templateParams = {
    service_product: document.getElementById("quote2_service").value,
    project_requirement: document.getElementById("quote2_requirements").value,
    budget_range: document.getElementById("quote2_budget").value,
    pref_date: document.getElementById("quote2_timeline").value,
    fullname: document.getElementById("quote2_name").value,
    email: document.getElementById("quote2_email").value,
    mobile_number: document.getElementById("quote2_phone").value,
    pref_contact: contactMethod.value,
  };

  emailjs.send("service_jycirel", "template_9jcnakl", templateParams)
    .then(function () {
      alert("Quote request sent successfully, Kindly check your email for Updates!");
      document.getElementById("quoteForm2").reset();
      closeQuoteModal2();
    }, function (error) {
      console.error("FAILED...", error);
      alert("There was an error sending your request. Please try again later.");
    });

  return false;
});