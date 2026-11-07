/**
 * Laverie Laundry - Google Sheets CMS Backend
 * 
 * Manages Auth, Packages, FAQs, and Testimonials in Google Sheets.
 */

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "getContent";

    if (action === "initSheets") {
      const result = initSpreadsheet();
      return createJsonResponse({ success: true, message: result });
    }

    if (action === "getContent" || !action) {
      return createJsonResponse({
        success: true,
        packages: getPackagesData(),
        faqs: getFaqsData(),
        testimonials: getTestimonialsData(),
        outlets: getOutletsData(),
        timestamp: new Date().toISOString(),
      });
    }

    return createJsonResponse({
      status: "online",
      service: "Laverie Laundry CMS API",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        return createJsonResponse({ success: false, error: "Invalid JSON body" });
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const action = payload.action;

    if (action === "login") {
      return handleLogin(payload.email, payload.password, payload.passwordHash);
    }

    if (action === "getContent") {
      return createJsonResponse({
        success: true,
        packages: getPackagesData(),
        faqs: getFaqsData(),
        testimonials: getTestimonialsData(),
        outlets: getOutletsData(),
      });
    }

    if (action === "updatePackages") {
      return savePackagesData(payload.packages);
    }

    if (action === "updateOutlets") {
      return saveOutletsData(payload.outlets);
    }

    if (action === "updateFaqs") {
      return saveFaqsData(payload.faqs);
    }

    if (action === "updateTestimonials") {
      return saveTestimonialsData(payload.testimonials);
    }

    if (action === "initSheets") {
      const result = initSpreadsheet();
      return createJsonResponse({ success: true, message: result });
    }

    return createJsonResponse({
      success: false,
      error: "Unknown action: " + action,
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: "Server error: " + err.toString(),
    });
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================

function handleLogin(email, password, passwordHash) {
  if (!email || (!password && !passwordHash)) {
    return createJsonResponse({
      success: false,
      error: "Email and password are required.",
    });
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Auth") || ss.getSheetByName("Auth Sheet");

  if (!sheet) {
    // If Auth sheet doesn't exist, create it with default Laverie Admin user
    sheet = ss.insertSheet("Auth");
    sheet.appendRow(["email", "password", "name"]);
    sheet.appendRow([
      "admin@laverie.com",
      "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
      "Laverie Admin",
    ]);
  }

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    // Append default admin row if sheet is empty
    sheet.appendRow([
      "admin@laverie.com",
      "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
      "Laverie Admin",
    ]);
    return createJsonResponse({
      success: true,
      user: {
        email: "admin@laverie.com",
        name: "Laverie Admin",
      },
    });
  }

  const headers = data[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });

  let emailCol = headers.indexOf("email");
  let passCol = headers.indexOf("password");
  let nameCol = headers.indexOf("name");

  if (emailCol === -1) emailCol = 0;
  if (passCol === -1) passCol = 1;
  if (nameCol === -1) nameCol = 2;

  const targetEmail = String(email).trim().toLowerCase();
  const inputPassword = String(password || "").trim();
  const inputHash = String(
    passwordHash || (inputPassword ? hashSha256(inputPassword) : "")
  ).trim().toLowerCase();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowEmail = String(row[emailCol] || "").trim().toLowerCase();
    const rowPass = String(row[passCol] || "").trim();
    const rowName = nameCol < row.length ? String(row[nameCol] || "").trim() : "";

    if (rowEmail === targetEmail) {
      const isMatch =
        (inputHash && rowPass.toLowerCase() === inputHash) ||
        (inputPassword && hashSha256(inputPassword).toLowerCase() === rowPass.toLowerCase()) ||
        (inputPassword && rowPass === inputPassword);

      if (isMatch) {
        return createJsonResponse({
          success: true,
          user: {
            email: rowEmail,
            name: rowName || "Laverie Admin",
          },
        });
      } else {
        return createJsonResponse({
          success: false,
          error: "Invalid email or password.",
        });
      }
    }
  }

  return createJsonResponse({
    success: false,
    error: "Invalid email or password.",
  });
}

// ==========================================
// PACKAGES MODULE
// ==========================================

function getPackagesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Packages");
  if (!sheet) {
    sheet = ss.insertSheet("Packages");
    seedDefaultPackages(sheet);
  }
  return sheet;
}

function getPackagesData() {
  const sheet = getPackagesSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    seedDefaultPackages(sheet);
    return getDefaultPackagesList();
  }

  const headers = data[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });

  const idCol = headers.indexOf("id");
  const nameCol = headers.indexOf("name");
  const badgeCol = headers.indexOf("badge");
  const priceCol = headers.indexOf("price");
  const unitCol = headers.indexOf("unit");
  const turnaroundCol = headers.indexOf("turnaround");
  const descCol = headers.indexOf("description");
  const featuresCol = headers.indexOf("features");
  const popCol = headers.indexOf("popular");
  const waCol = headers.indexOf("whatsappmessage");

  const packages = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = String(row[nameCol !== -1 ? nameCol : 1] || "").trim();
    if (!name) continue;

    const rawFeatures = String(row[featuresCol !== -1 ? featuresCol : 7] || "");
    const featuresList = rawFeatures
      .split("\n")
      .map(function (f) {
        return f.trim();
      })
      .filter(Boolean);

    const isPop = row[popCol !== -1 ? popCol : 8];
    const popular =
      isPop === true ||
      String(isPop).toLowerCase() === "true" ||
      String(isPop).toLowerCase() === "yes" ||
      String(isPop) === "1";

    packages.push({
      id: String(row[idCol !== -1 ? idCol : 0] || "pkg-" + i).trim(),
      name: name,
      badge: String(row[badgeCol !== -1 ? badgeCol : 2] || "").trim(),
      price: String(row[priceCol !== -1 ? priceCol : 3] || "").trim(),
      unit: String(row[unitCol !== -1 ? unitCol : 4] || "/ KG").trim(),
      turnaround: String(row[turnaroundCol !== -1 ? turnaroundCol : 5] || "").trim(),
      description: String(row[descCol !== -1 ? descCol : 6] || "").trim(),
      features: featuresList,
      popular: popular,
      whatsappMessage: String(row[waCol !== -1 ? waCol : 9] || "").trim(),
    });
  }

  return packages.length > 0 ? packages : getDefaultPackagesList();
}

function savePackagesData(packagesList) {
  if (!packagesList || !Array.isArray(packagesList)) {
    return createJsonResponse({ success: false, error: "packages array is required." });
  }

  const sheet = getPackagesSheet();
  sheet.clearContents();

  const headers = [
    "id",
    "name",
    "badge",
    "price",
    "unit",
    "turnaround",
    "description",
    "features",
    "popular",
    "whatsappMessage",
  ];

  const rows = [headers];
  for (let i = 0; i < packagesList.length; i++) {
    const pkg = packagesList[i];
    const featuresStr = Array.isArray(pkg.features)
      ? pkg.features.join("\n")
      : String(pkg.features || "");

    rows.push([
      pkg.id || "pkg-" + (i + 1),
      pkg.name || "",
      pkg.badge || "",
      pkg.price || "",
      pkg.unit || "/ KG",
      pkg.turnaround || "",
      pkg.description || "",
      featuresStr,
      pkg.popular ? "TRUE" : "FALSE",
      pkg.whatsappMessage || "",
    ]);
  }

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  return createJsonResponse({
    success: true,
    message: "Packages updated successfully in Google Sheet.",
    count: packagesList.length,
  });
}

// ==========================================
// FAQS MODULE
// ==========================================

function getFaqsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("FAQs") || ss.getSheetByName("FAQ");
  if (!sheet) {
    sheet = ss.insertSheet("FAQs");
    seedDefaultFaqs(sheet);
  }
  return sheet;
}

function getFaqsData() {
  const sheet = getFaqsSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    seedDefaultFaqs(sheet);
    return getDefaultFaqsList();
  }

  const headers = data[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });

  const qCol = headers.indexOf("question");
  const aCol = headers.indexOf("answer");

  const faqs = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const question = String(row[qCol !== -1 ? qCol : 0] || "").trim();
    const answer = String(row[aCol !== -1 ? aCol : 1] || "").trim();
    if (question && answer) {
      faqs.push({ question: question, answer: answer });
    }
  }

  return faqs.length > 0 ? faqs : getDefaultFaqsList();
}

function saveFaqsData(faqsList) {
  if (!faqsList || !Array.isArray(faqsList)) {
    return createJsonResponse({ success: false, error: "faqs array is required." });
  }

  const sheet = getFaqsSheet();
  sheet.clearContents();

  const headers = ["question", "answer"];
  const rows = [headers];

  for (let i = 0; i < faqsList.length; i++) {
    const item = faqsList[i];
    rows.push([item.question || "", item.answer || ""]);
  }

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  return createJsonResponse({
    success: true,
    message: "FAQs updated successfully in Google Sheet.",
    count: faqsList.length,
  });
}

// ==========================================
// TESTIMONIALS MODULE
// ==========================================

function getTestimonialsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Testimonials") || ss.getSheetByName("Reviews");
  if (!sheet) {
    sheet = ss.insertSheet("Testimonials");
    seedDefaultTestimonials(sheet);
  }
  return sheet;
}

function getTestimonialsData() {
  const sheet = getTestimonialsSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    seedDefaultTestimonials(sheet);
    return getDefaultTestimonialsList();
  }

  const headers = data[0].map(function (h) {
    return String(h).trim().toLowerCase();
  });

  const nameCol = headers.indexOf("name");
  const roleCol = headers.indexOf("role");
  const hotelCol = headers.indexOf("hotel");
  const ratingCol = headers.indexOf("rating");
  const contentCol = headers.indexOf("content");

  const testimonials = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = String(row[nameCol !== -1 ? nameCol : 0] || "").trim();
    const content = String(row[contentCol !== -1 ? contentCol : 4] || "").trim();
    if (!name || !content) continue;

    const ratingNum = parseInt(row[ratingCol !== -1 ? ratingCol : 3], 10);

    testimonials.push({
      name: name,
      role: String(row[roleCol !== -1 ? roleCol : 1] || "").trim(),
      hotel: String(row[hotelCol !== -1 ? hotelCol : 2] || "").trim(),
      rating: isNaN(ratingNum) ? 5 : ratingNum,
      content: content,
    });
  }

  return testimonials.length > 0 ? testimonials : getDefaultTestimonialsList();
}

function saveTestimonialsData(testimonialsList) {
  if (!testimonialsList || !Array.isArray(testimonialsList)) {
    return createJsonResponse({ success: false, error: "testimonials array is required." });
  }

  const sheet = getTestimonialsSheet();
  sheet.clearContents();

  const headers = ["name", "role", "hotel", "rating", "content"];
  const rows = [headers];

  for (let i = 0; i < testimonialsList.length; i++) {
    const item = testimonialsList[i];
    rows.push([
      item.name || "",
      item.role || "",
      item.hotel || "",
      item.rating || 5,
      item.content || "",
    ]);
  }

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
  return createJsonResponse({
    success: true,
    message: "Testimonials updated successfully in Google Sheet.",
    count: testimonialsList.length,
  });
}

// ==========================================
// SEEDING DEFAULTS
// ==========================================

function seedDefaultPackages(sheet) {
  const headers = [
    "id",
    "name",
    "badge",
    "price",
    "unit",
    "turnaround",
    "description",
    "features",
    "popular",
    "whatsappMessage",
  ];
  const list = getDefaultPackagesList();
  const rows = [headers];

  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    rows.push([
      p.id,
      p.name,
      p.badge,
      p.price,
      p.unit,
      p.turnaround,
      p.description,
      p.features.join("\n"),
      p.popular ? "TRUE" : "FALSE",
      p.whatsappMessage,
    ]);
  }
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function seedDefaultFaqs(sheet) {
  const headers = ["question", "answer"];
  const list = getDefaultFaqsList();
  const rows = [headers];
  for (let i = 0; i < list.length; i++) {
    rows.push([list[i].question, list[i].answer]);
  }
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function seedDefaultTestimonials(sheet) {
  const headers = ["name", "role", "hotel", "rating", "content"];
  const list = getDefaultTestimonialsList();
  const rows = [headers];
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    rows.push([t.name, t.role, t.hotel, t.rating, t.content]);
  }
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function initSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Auth sheet
  let authSheet = ss.getSheetByName("Auth");
  if (!authSheet) {
    authSheet = ss.insertSheet("Auth");
    authSheet.appendRow(["email", "password", "name"]);
    authSheet.appendRow([
      "admin@laverie.com",
      "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
      "Laverie Admin",
    ]);
  }

  // Packages sheet
  let pkgSheet = ss.getSheetByName("Packages");
  if (!pkgSheet) {
    pkgSheet = ss.insertSheet("Packages");
    seedDefaultPackages(pkgSheet);
  }

  // FAQs sheet
  let faqSheet = ss.getSheetByName("FAQs");
  if (!faqSheet) {
    faqSheet = ss.insertSheet("FAQs");
    seedDefaultFaqs(faqSheet);
  }

  // Testimonials sheet
  let testSheet = ss.getSheetByName("Testimonials");
  if (!testSheet) {
    testSheet = ss.insertSheet("Testimonials");
    seedDefaultTestimonials(testSheet);
  }

  // Outlets sheet
  let outletSheet = ss.getSheetByName("Outlets");
  if (!outletSheet) {
    outletSheet = ss.insertSheet("Outlets");
    seedDefaultOutlets(outletSheet);
  }

  return "All 5 sheets (Auth, Packages, Outlets, FAQs, Testimonials) initialized successfully.";
}

function getOutletsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Outlets") || ss.getSheetByName("Locations");
  if (!sheet) {
    sheet = ss.insertSheet("Outlets");
    seedDefaultOutlets(sheet);
  }
  return sheet;
}

function getOutletsData() {
  try {
    const sheet = getOutletsSheet();
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      seedDefaultOutlets(sheet);
      return getDefaultOutletsList();
    }
    const headers = data[0].map(h => String(h).trim().toLowerCase());
    const idIdx = headers.indexOf("id");
    const tabNameIdx = headers.indexOf("tabname");
    const nameIdx = headers.indexOf("name");
    const phoneIdx = headers.indexOf("phone");
    const descIdx = headers.indexOf("description");
    const addressIdx = headers.indexOf("address");
    const hoursIdx = headers.indexOf("openinghours");
    const dispatchIdx = headers.indexOf("dispatch");
    const mapsUrlIdx = headers.indexOf("mapsurl");
    const embedIdx = headers.indexOf("mapsembedurl");
    const waIdx = headers.indexOf("whatsappmessage");
    const statusIdx = headers.indexOf("status");

    const items = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row[nameIdx !== -1 ? nameIdx : 2]) continue;
      items.push({
        id: String(row[idIdx !== -1 ? idIdx : 0] || `outlet-${i}`),
        tabName: String(row[tabNameIdx !== -1 ? tabNameIdx : 1] || "Location"),
        name: String(row[nameIdx !== -1 ? nameIdx : 2] || ""),
        phone: String(row[phoneIdx !== -1 ? phoneIdx : 3] || ""),
        description: String(row[descIdx !== -1 ? descIdx : 4] || ""),
        address: String(row[addressIdx !== -1 ? addressIdx : 5] || ""),
        openingHours: String(row[hoursIdx !== -1 ? hoursIdx : 6] || ""),
        dispatch: String(row[dispatchIdx !== -1 ? dispatchIdx : 7] || ""),
        mapsUrl: String(row[mapsUrlIdx !== -1 ? mapsUrlIdx : 8] || ""),
        mapsEmbedUrl: String(row[embedIdx !== -1 ? embedIdx : 9] || ""),
        whatsappMessage: String(row[waIdx !== -1 ? waIdx : 10] || ""),
        status: String(row[statusIdx !== -1 ? statusIdx : 11] || "Active"),
      });
    }
    return items.length > 0 ? items : getDefaultOutletsList();
  } catch (err) {
    return getDefaultOutletsList();
  }
}

function saveOutletsData(outletsList) {
  try {
    if (!Array.isArray(outletsList) || outletsList.length === 0) {
      return createJsonResponse({ success: false, error: "Empty or invalid outlets list." });
    }
    const sheet = getOutletsSheet();
    sheet.clearContents();

    const headers = [
      "id",
      "tabName",
      "name",
      "phone",
      "description",
      "address",
      "openingHours",
      "dispatch",
      "mapsUrl",
      "mapsEmbedUrl",
      "whatsappMessage",
      "status"
    ];

    const rows = [headers];
    outletsList.forEach((o, idx) => {
      rows.push([
        o.id || `outlet-${idx + 1}`,
        o.tabName || "",
        o.name || "",
        o.phone || "",
        o.description || "",
        o.address || "",
        o.openingHours || "",
        o.dispatch || "",
        o.mapsUrl || "",
        o.mapsEmbedUrl || "",
        o.whatsappMessage || "",
        o.status || "Active"
      ]);
    });

    sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
    return createJsonResponse({
      success: true,
      message: "Outlets updated successfully.",
      count: outletsList.length,
    });
  } catch (err) {
    return createJsonResponse({ success: false, error: err.toString() });
  }
}

function seedDefaultOutlets(sheet) {
  const headers = [
    "id",
    "tabName",
    "name",
    "phone",
    "description",
    "address",
    "openingHours",
    "dispatch",
    "mapsUrl",
    "mapsEmbedUrl",
    "whatsappMessage",
    "status"
  ];
  const list = getDefaultOutletsList();
  const rows = [headers];
  list.forEach(o => {
    rows.push([
      o.id,
      o.tabName,
      o.name,
      o.phone || "",
      o.description,
      o.address,
      o.openingHours,
      o.dispatch,
      o.mapsUrl,
      o.mapsEmbedUrl,
      o.whatsappMessage,
      o.status
    ]);
  });
  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);
}

function getDefaultOutletsList() {
  return [
    {
      id: "outlet-pik",
      tabName: "PIK, Jakarta",
      name: "Laverie Premium Laundry PIK",
      phone: "+62 811-1907-8899",
      description: "Conveniently situated in Pantai Indah Kapuk (PIK). Drop off your garments or coordinate express hotel lobby and villa pickup.",
      address: "Pantai Indah Kapuk, Jakarta Utara, DKI Jakarta",
      openingHours: "07:30 AM – 21:00 PM Daily (Express cutoff 10:00 AM)",
      dispatch: "Available for hotels, villas, and residences around PIK & North Jakarta",
      mapsUrl: "https://maps.app.goo.gl/aAEsvnwHZAUsbqmq9",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Laverie%20Premium%20Laundry%20PIK&t=&z=16&ie=UTF8&iwloc=&output=embed",
      whatsappMessage: "Hello Laverie Premium Laundry PIK! I want to ask about your laundry services and pickup.",
      status: "Active",
    },
    {
      id: "outlet-seminyak",
      tabName: "Seminyak, Bali",
      name: "Laverie Suite & Villa Hub Seminyak",
      phone: "+62 812-3890-1234",
      description: "Dedicated express valet and gentle fabric sanitization hub catering to luxury villas and hotel suites across Seminyak & Kerobokan.",
      address: "Jl. Kayu Aya, Seminyak, Kuta, Badung, Bali",
      openingHours: "07:00 AM – 22:00 PM Daily (Express cutoff 10:00 AM)",
      dispatch: "Daily concierge collection across Seminyak, Petitenget & Legian",
      mapsUrl: "https://maps.google.com/?q=Seminyak+Bali",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Seminyak%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
      whatsappMessage: "Hello Laverie Suite & Villa Hub Seminyak! I want to ask about your laundry services and pickup.",
      status: "Active",
    },
    {
      id: "outlet-canggu",
      tabName: "Canggu, Bali",
      name: "Laverie Eco Atelier Canggu",
      phone: "+62 813-5300-5678",
      description: "Our sustainable ozone-wash studio serving digital nomads, resident villas, and travelers throughout the Batu Bolong and Berawa coastal enclaves.",
      address: "Jl. Pantai Batu Bolong, Canggu, Kuta Utara, Badung, Bali",
      openingHours: "08:00 AM – 20:00 PM Daily",
      dispatch: "Doorstep pickup covering Berawa, Batu Bolong & Pererenan",
      mapsUrl: "https://maps.google.com/?q=Canggu+Bali",
      mapsEmbedUrl: "https://maps.google.com/maps?q=Canggu%20Bali&t=&z=15&ie=UTF8&iwloc=&output=embed",
      whatsappMessage: "Hello Laverie Eco Atelier Canggu! I want to ask about your laundry services and pickup.",
      status: "Active",
    },
  ];
}

function getDefaultPackagesList() {
  return [
    {
      id: "regular",
      name: "Regular Care",
      badge: "",
      price: "Rp 15.000",
      unit: "/ KG",
      turnaround: "24 - 48 Hours",
      description: "Comprehensive care for your everyday garments and essentials.",
      features: [
        "Gentle temperature-controlled wash",
        "Soft tumble dry cycle",
        "Neat hotel-grade fold & packaging",
        "Eco-certified fabric softener",
        "Complimentary standard bag",
      ],
      popular: false,
      whatsappMessage: "Hello Laverie! I would like to order the Regular Care package (/KG).",
    },
    {
      id: "express",
      name: "12H Hotel Express",
      badge: "MOST POPULAR",
      price: "Rp 25.000",
      unit: "/ KG",
      turnaround: "Same Day (12 Hours)",
      description: "Tailored for business trips, short getaways, and urgent itineraries.",
      features: [
        "Priority same-day express turnaround",
        "Hotel lobby or doorstep pickup before 10 AM",
        "Evening return before 10 PM",
        "Wrinkle-release steam press",
        "Anti-bacterial ozone sanitization",
        "Sealed travel-ready packaging",
      ],
      popular: true,
      whatsappMessage: "Hello Laverie! I would like to book the 12H Hotel Express package (Same Day).",
    },
    {
      id: "premium",
      name: "Delicate & Premium",
      badge: "BESPOKE CARE",
      price: "Rp 35.000",
      unit: "/ Piece / KG",
      turnaround: "24 - 36 Hours",
      description: "Specialized gentle care for suits, silks, designer wear, and fine linen.",
      features: [
        "Individual fabric inspection & spot treatment",
        "Dermatologically tested premium detergent",
        "Hand steam & artisan pressing",
        "Garment hanger & breathable dust cover",
        "Ideal for business blazers, dresses & woolens",
      ],
      popular: false,
      whatsappMessage: "Hello Laverie! I would like to enquire about the Delicate & Premium Care package.",
    },
  ];
}

function getDefaultFaqsList() {
  return [
    {
      question: "How does the same-day 12-hour hotel express laundry work?",
      answer: "Place your booking via WhatsApp or hotel concierge before 10:00 AM. Our team picks up your laundry bag directly from your hotel front desk or room lobby, meticulously processes and steams your garments, and delivers them back fresh and sealed the same evening before 10:00 PM.",
    },
    {
      question: "Do you offer doorstep pickup for private residences and villas?",
      answer: "Yes! While our 12-hour express was designed with partner hotels and travelers in mind, we also service private residences, apartments, and villas within our delivery perimeter. Regular and express turnaround slots are available daily.",
    },
    {
      question: "How do you handle delicate fabrics, designer wear, and suits?",
      answer: "Garments categorized under our Delicate & Premium care receive individual care labels inspection, cold ozone sanitization, pH-neutral eco detergents, and delicate steam pressing on hangers with breathable dust covers to protect fiber integrity.",
    },
    {
      question: "What are the payment methods accepted?",
      answer: "We support seamless digital payments including Indonesian QRIS (GoPay, OVO, Dana, BCA Mobile), Bank Transfer, Credit/Debit cards, and room billing charge agreements for partner hotel guests.",
    },
    {
      question: "What is the minimum order quantity for laundry pickup?",
      answer: "Our minimum pickup order is 3 KG for standard wash & fold, or a minimum order value of Rp 50.000 for express or delicate piece-rate dry clean services.",
    },
  ];
}

function getDefaultTestimonialsList() {
  return [
    {
      name: "Marcus Vance",
      role: "Business Traveler & Hotel Guest",
      hotel: "The Seminyak Suite Hotel",
      rating: 5,
      content: "Handed my suit and shirts to the front desk at 9:30 AM before my meetings. By 7 PM when I returned to the hotel, everything was neatly hung in dust bags, steamed to perfection, and smelled wonderful. Exceptional service!",
    },
    {
      name: "Sophia Chen",
      role: "Digital Nomad & Villa Resident",
      hotel: "Canggu Eco Villas",
      rating: 5,
      content: "Finding a laundry service that genuinely respects delicate fabrics and silks is rare. Laverie’s packaging and detergent quality blew me away. Best laundry experience in Bali by far.",
    },
    {
      name: "David & Claire Miller",
      role: "Holiday Getaway Travelers",
      hotel: "Alila Resort & Villas",
      rating: 5,
      content: "We didn't want to fly back with a suitcase full of dirty holiday clothes. Laverie picked up our luggage bags directly from our resort reception and delivered everything fresh and compact. Worth every Rupiah!",
    },
  ];
}

function hashSha256(value) {
  const rawHash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    value,
    Utilities.Charset.UTF_8
  );
  let txtHash = "";
  for (let j = 0; j < rawHash.length; j++) {
    let hashVal = rawHash[j];
    if (hashVal < 0) hashVal += 256;
    let byteString = hashVal.toString(16);
    if (byteString.length === 1) byteString = "0" + byteString;
    txtHash += byteString;
  }
  return txtHash;
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
