
const faqData = [
  {
    question: "What are your business hours?",
    answer:
      "Our office is open Monday through Friday from 9:00 AM to 6:00 PM PST. Technical support is available 24/7.",
  },
  {
    question: "How quickly can I expect a response?",
    answer:
      "We aim to respond to all inquiries within 24 hours during business days. For urgent technical support, our response time is typically within 2 hours.",
  },
  {
    question: "Do you offer on-site support?",
    answer:
      "Yes, we provide on-site support for enterprise clients within the Silicon Valley area. Additional charges may apply for locations outside our service area.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, wire transfers, and corporate purchase orders for business accounts.",
  },
  {
    question: "How can I schedule a consultation?",
    answer:
      "You can schedule a consultation by filling out our contact form, calling our sales team directly, or booking through our online calendar system.",
  },
];

const faqContainer = document.getElementById("faqContainer");
faqData.forEach((faq, index) => {
  const faqItem = document.createElement("div");
  faqItem.className = "faq-item bg-white p-6 card_contact_shadow shadow-lg";
  faqItem.innerHTML = `
                <button class="w-full flex items-center justify-between text-left  animationScrollEffect" onclick="toggleFaq(${index})">
                    <span class="text-base sm:text-lg font-[500]">${faq.question}</span>
                    <i class="ri-arrow-down-s-line text-primary transition-transform duration-300" id="faqIcon${index}"></i>
                </button>
                <div class="mt-4 text-xs sm:text-base text-gray-600 hidden" id="faqAnswer${index}">${faq.answer}</div>
            `;
  faqContainer.appendChild(faqItem);
});

function toggleFaq(index) {
  const answer = document.getElementById(`faqAnswer${index}`);
  const icon = document.getElementById(`faqIcon${index}`);
  answer.classList.toggle("hidden");
  icon.style.transform = answer.classList.contains("hidden")
    ? "rotate(0deg)"
    : "rotate(180deg)";
}

/* Navbar */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
console.log('hi'); // should NOT be null

/* email js start*/
document.addEventListener("DOMContentLoaded", function () {
  console.log(document.getElementById("contactusForm")); // should NOT be null

  document.getElementById("contactusForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementsByName("firstName")[0].value.trim();
    const lastName = document.getElementsByName("lastName")[0].value.trim();
    const email = document.getElementsByName("email")[0].value.trim();
    const phone = document.getElementsByName("phone")[0].value.trim();
    const department = document.getElementsByName("department")[0].value;

    // Simple Validation
    if (!firstName || !lastName || !email || !phone || department === "none") {
      alert("Please fill out all required fields correctly.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const templateParams = {
      fullname: firstName + " " + lastName,
      email: email,
      mobile_number: phone,
      service_product: department,
      project_requirement:
        document.getElementsByName("message")[0].value.trim() || "No message",
      budget_range: null,
      pref_date: null,
      pref_contact: null,
    };

    emailjs
      .send("service_jycirel", "template_9jcnakl", templateParams)
      .then(() => {
        alert("Your message has been sent successfully. Kindly check your email!");
        document.getElementById("contactusForm").reset();
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        alert("Something went wrong. Please try again later.");
      });
  });
});


/* email js end*/