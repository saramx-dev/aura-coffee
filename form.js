// =========================================
// 1. SELECTORS & CORE DOM RECOGNITION
// =========================================
const form = document.getElementById("signup-form");
const inputField = form?.querySelector('[type="email"]');
const submitBtn = form?.querySelector('[type="submit"]');
const feedbackState = document.getElementById("form-feedback");

// =======================================
// 2. CENTRALIZED UI STATE ENGINE.
// =======================================
function updateUIState(status, message){
  // Guard against a completely broken DOM structure
  if (!inputField || !feedbackState) {
    console.error(
      "Critical UI Error: Form DOM elements are missing from the template.",
    );
    return;
  }
  
  const isError = status === "error";
  
  feedbackState.textContent = message;
  
  // Dynamically adds one and removes the other based on the status string.
  feedbackState.classList.toggle("is-error", isError);
  feedbackState.classList.toggle("is-success", status === "success");

  // Set accessibility hooks synchronously
  inputField.setAttribute("aria-invalid", isError ? "true" : "false");
};

// ==========================
// 3. CORE VALIDATION ENGINE 
// ==========================
const emailValidation = () => {
  // Defensive fallback: prevents crashes if HTML is missing and guarantees a string.
  const emailValue = inputField?.value?.trim() ?? "";
  
  // Email format structural check blueprint
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isInvalidFormat = !emailRegex.test(emailValue) || !inputField.validity.valid;

  // Block 1: Check if completely empty
  if (emailValue === "") {
    updateUIState("error", "Please enter your email address");
    return false; // STOP ENGINE
  }
  
  // Block 2: Check if format is wrong
  if (isInvalidFormat) {
    updateUIState("error", "Invalid Email");
    return false; // STOP ENGINE
  }
  
  // Block 3: Success Gateway (Passed all checks safely)
  inputField.setAttribute("aria-invalid", "false");
  return true; // PASS: Form data is safe to process
};

// ====================================================================
// 4. FIELD-LEVEL UX LISTENERS (Attached directly to inputField)
// ====================================================================


// A. Focus State: Eraser mode
inputField?.addEventListener('focus', () => {
  // Passing "clear" strips BOTH classes and wipes out old message text!
  updateUIState("clear", ""); 
});

// B. Blur State: Real-time passive validation check
inputField?.addEventListener('blur', () => {
  const emailValue = inputField?.value?.trim() ?? "";

  // Guard Clause: If they left it completely blank, do not show an error.
  // Just clear old messages and stop execution silently.
  if (emailValue === "") {
    updateUIState("clear", "");
    return;
  }

  // Only run full validation if they actually left something inside the box
  emailValidation(); 
});



// ====================================================================
// 5. GLOBAL SUBMISSION LIFECYCLE ROUTER (Attached strictly to form)
// ====================================================================


form?.addEventListener('submit', async (event) => {
  event.preventDefault(); // Intercept browser default page refresh.

  const isFormValid = emailValidation(); // Emergency final loop verification
  if (!isFormValid) return; // Exit if invalid data is sitting in DOM.
  

 // ──► [ BLOCK 1: PRE-FLIGHT LOCKOUT ] 
  // Disable the button immediately when clicked
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Joining...";
  }

  // Extract clean snapshot for the payload data packet
  const emailValue = inputField?.value?.trim() ?? "";
// ──► ENTER THE ASYNC/AWAIT TUNNEL
  try {
    
    // Helper: Create a clean promise-based delay on the fly (1000ms = 1 second)
    const artificialDelay = new Promise(resolve => setTimeout(resolve, 1000));
    // ──► [ BLOCK 2: THE API PAYLOAD DISPATCH ]
    //send a POST request with endpoint, headers, and stringified body.
   const apiCall =  fetch("https://a.klaviyo.com/client/subscriptions?company_id=WDGN3H", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "revision": "2024-10-15"
  },
  body: JSON.stringify({
    data: {
      type: "subscription",
      attributes: {
        profile: {
          data: {
            type: "profile",
            attributes: { email: emailValue }
          }
        }
      },
      relationships: {
        list: {
          data: { type: "list", id: "UgCQSA" }
        }
      }
    }
  })
});

   // 🌟Execute both in parallel.
   const [response] = await Promise.all([apiCall, artificialDelay]);
    // ──► [ BLOCK 3: SERVER RESPONSE EVALUATION GATE ]
    // The server responded! Did it accept payload safely?
    if(!response.ok){
      // Something went wrong on the server side (e.g., 400 Bad Request, 401 Unauthorized)
      throw new Error(`Server statues: ${response.status}`);
    }

    // NETWORK SUCCESS: Server accepted the data!
    updateUIState("success", "Thank you for joining our waitlist!");
    form.reset(); //Wipes the input text field clean
  }
  catch (networkError) {
    
    // ──► [ BLOCK 4: ERROR BOUNDARY (CATCH ALL) ]
    // Catches system crashes, dropped Wi-Fi, or the error thrown above
    console.error("Klaviyo API Transit Failure:", networkError);
    updateUIState("error", "Service unavailable. Please try again later.");
    
  } finally {
    
    // ──► [ THE POST-FLIGHT CLEANUP ]
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Join Waitlist";
    }
  }
});