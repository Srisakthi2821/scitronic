
document.addEventListener("DOMContentLoaded", function () {
  // Form steps navigation
  let currentStep = 1;
  const totalSteps = 4;
  const form = document.getElementById("orderForm");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const progressBar = document.querySelector(".progress-bar-fill");

  // Product selection
  const productSelect = document.getElementById("product");
  const productDetails = document.getElementById("productDetails");
  const productName = document.getElementById("productName");
  const productDescription = document.getElementById("productDescription");
  const productPrice = document.getElementById("productPrice");
  const productDuration = document.getElementById("productDuration");

  // File upload
  const fileInput = document.querySelector('input[type="file"]');
  const fileList = document.getElementById("fileList");

  // Update progress bar
  function updateProgressBar() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Show current step
  function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
      document.getElementById(`step${i}`).classList.add("hidden");
    }

    // Show current step
    document.getElementById(`step${step}`).classList.remove("hidden");

    // Update buttons
    if (step === 1) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }

    if (step === totalSteps) {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
      updateSummary();
    } else {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }

    updateProgressBar();
  }

  // Next button click
  nextBtn.addEventListener("click", function () {
    // Validate current step
    if (validateStep(currentStep)) {
      currentStep++;
      if (currentStep > totalSteps) {
        currentStep = totalSteps;
      }
      showStep(currentStep);
    }
  });

  // Previous button click
  prevBtn.addEventListener("click", function () {
    currentStep--;
    if (currentStep < 1) {
      currentStep = 1;
    }
    showStep(currentStep);
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="flex items-center"><div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Processing...</span>';

      // Simulate form submission
      setTimeout(function () {
        // Reset form and show success message
        form.innerHTML = `
                            <div class="p-8 text-center">
                                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <i class="ri-check-line ri-2x text-green-600"></i>
                                </div>
                                <h2 class="text-2xl font-bold text-gray-800 mb-2">Order Submitted Successfully!</h2>
                                <p class="text-gray-600 mb-6">Thank you for your order. Our team will review your requirements and contact you within 24 hours.</p>
                                <p class="text-gray-600 mb-4">Order Reference: <span class="font-medium text-gray-800">ORD-${Math.floor(100000 + Math.random() * 900000)}</span></p>
                                <p class="text-gray-600">A confirmation email has been sent to <span class="font-medium text-gray-800" id="confirmationEmail">jonathan.mitchell@innovatesolutions.com</span></p>
                                <div class="mt-8">
                                    <a href="/" class="px-6 py-2 bg-primary text-white rounded-button hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 whitespace-nowrap">Return to Home</a>
                                </div>
                            </div>
                        `;

        // Update confirmation email
        const emailInput = document.getElementById("email");
        const confirmationEmail = document.getElementById("confirmationEmail");
        if (emailInput && confirmationEmail) {
          confirmationEmail.textContent =
            emailInput.value || "jonathan.mitchell@innovatesolutions.com";
        }
      }, 2000);
    }
  });

  // Product selection change
  productSelect.addEventListener("change", function () {
    if (this.value) {
      productDetails.classList.remove("hidden");

      // Update product details based on selection
      const products = {
        "cloud-infrastructure": {
          name: "Cloud Infrastructure Management",
          description:
            "Comprehensive cloud infrastructure setup, optimization, and management services for businesses of all sizes. Includes 24/7 monitoring, security, and maintenance.",
          price: "$1,299.00",
          duration: "per month",
        },
        cybersecurity: {
          name: "Cybersecurity Solutions",
          description:
            "Advanced security systems to protect your business from cyber threats. Includes firewall setup, intrusion detection, vulnerability scanning, and security training.",
          price: "$1,899.00",
          duration: "per month",
        },
        "data-analytics": {
          name: "Data Analytics Platform",
          description:
            "Powerful data analytics tools to help you make informed business decisions. Includes data collection, processing, visualization, and reporting capabilities.",
          price: "$2,499.00",
          duration: "per month",
        },
        "managed-services": {
          name: "Managed IT Services",
          description:
            "Comprehensive IT management services for your business. Includes helpdesk support, network management, system updates, and hardware maintenance.",
          price: "$999.00",
          duration: "per month",
        },
        "software-dev": {
          name: "Custom Software Development",
          description:
            "Tailored software solutions designed to meet your specific business needs. Our expert developers create scalable, secure, and user-friendly applications.",
          price: "$15,000.00",
          duration: "starting price",
        },
      };

      const selectedProduct = products[this.value];
      productName.textContent = selectedProduct.name;
      productDescription.textContent = selectedProduct.description;
      productPrice.textContent = selectedProduct.price;
      productDuration.textContent = selectedProduct.duration;
    } else {
      productDetails.classList.add("hidden");
    }
  });

  // File upload handling
  fileInput.addEventListener("change", function () {
    fileList.innerHTML = "";
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        const fileItem = document.createElement("div");
        fileItem.className = "flex items-center justify-between py-1";
        fileItem.innerHTML = `
                            <div class="flex items-center">
                                <div class="w-5 h-5 flex items-center justify-center mr-2 text-gray-500">
                                    <i class="ri-file-line"></i>
                                </div>
                                <span class="text-gray-700">${file.name}</span>
                                <span class="text-gray-500 text-xs ml-2">(${formatFileSize(file.size)})</span>
                            </div>
                            <button type="button" class="text-red-500 hover:text-red-700">
                                <div class="w-5 h-5 flex items-center justify-center">
                                    <i class="ri-close-line"></i>
                                </div>
                            </button>
                        `;
        fileList.appendChild(fileItem);
      }
    }
  });

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Validate step
  function validateStep(step) {
    switch (step) {
      case 1:
        if (!productSelect.value) {
          alert("Please select a product or service.");
          return false;
        }
        return true;
      case 2:
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");

        if (!fullName.value) {
          alert("Please enter your full name.");
          fullName.focus();
          return false;
        }

        if (!email.value || !isValidEmail(email.value)) {
          alert("Please enter a valid email address.");
          email.focus();
          return false;
        }

        if (!phone.value) {
          alert("Please enter your phone number.");
          phone.focus();
          return false;
        }

        return true;
      case 4:
        const termsCheckbox = document.getElementById("termsCheckbox");
        if (!termsCheckbox.checked) {
          alert("Please agree to the Terms and Conditions.");
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  // Validate email
  function isValidEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Update summary
  function updateSummary() {
    // Product details
    document.getElementById("summaryProductName").textContent =
      productName.textContent;
    document.getElementById("summaryProductPrice").textContent =
      productPrice.textContent;
    document.getElementById("summaryProductDescription").textContent =
      productDescription.textContent.substring(0, 100) + "...";

    // Customer information
    const fullNameInput = document.getElementById("fullName");
    const companyNameInput = document.getElementById("companyName");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");

    document.getElementById("summaryName").textContent =
      fullNameInput.value || "Jonathan Mitchell";
    document.getElementById("summaryCompany").textContent =
      companyNameInput.value || "Innovate Solutions Inc.";
    document.getElementById("summaryEmail").textContent =
      emailInput.value || "jonathan.mitchell@innovatesolutions.com";
    document.getElementById("summaryPhone").textContent =
      phoneInput.value || "+1 (415) 555-7890";
    document.getElementById("summaryAddress").textContent =
      addressInput.value ||
      "101 Technology Drive, Suite 400, San Francisco, CA 94107";

    // Additional services
    const additionalServicesList = document.getElementById(
      "additionalServicesList",
    );
    additionalServicesList.innerHTML = "";

    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:not(#termsCheckbox):not(#newsletterCheckbox)',
    );
    let hasAdditionalServices = false;

    const servicesPrices = {
      training: 499,
      migration: 799,
      integration: 1299,
      security: 899,
    };

    const servicesNames = {
      training: "Staff Training",
      migration: "Data Migration",
      integration: "System Integration",
      security: "Security Assessment",
    };

    let subtotal = parseFloat(productPrice.textContent.replace(/[^0-9.]/g, ""));

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        hasAdditionalServices = true;
        const serviceValue = checkbox.value;
        const servicePrice = servicesPrices[serviceValue] || 0;
        subtotal += servicePrice;

        const serviceItem = document.createElement("div");
        serviceItem.className = "flex justify-between text-sm";
        serviceItem.innerHTML = `
                            <span class="text-gray-700">${servicesNames[serviceValue]}</span>
                            <span class="font-medium text-gray-900">$${servicePrice.toFixed(2)}</span>
                        `;
        additionalServicesList.appendChild(serviceItem);
      }
    });

    document.getElementById("additionalServicesSection").style.display =
      hasAdditionalServices ? "block" : "none";

    // Update pricing
    document.getElementById("summarySubtotal").textContent =
      `$${subtotal.toFixed(2)}`;
    const tax = subtotal * 0.09;
    document.getElementById("summaryTax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("summaryTotal").textContent =
      `$${(subtotal + tax).toFixed(2)}`;
  }

  // Initialize form
  showStep(currentStep);
});