import { hashPassword } from "@/lib/auth";
import { PackageItem, packages as defaultPackages } from "@/data/packages";
import { FAQItem, faqs as defaultFaqs } from "@/data/faq";
import { TestimonialItem, defaultTestimonials } from "@/data/testimonials";
import { OutletItem, defaultOutlets } from "@/data/outlets";
import { translateIdToEn, translateListIdToEn } from "@/lib/translator";

export interface AuthResponse {
  success: boolean;
  user?: {
    email: string;
    name: string;
  };
  error?: string;
  isMock?: boolean;
}

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// Configured administrative users with SHA-256 hashed passwords
const CONFIGURED_ADMINS = [
  {
    email: "admin@laverie.com",
    // SHA-256 of "admin123"
    passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9",
    name: "Laverie Admin",
  },
];

/**
 * Authenticate admin using SHA-256 password hashing.
 * Checks configured administrators, then checks backend script endpoint if available.
 */
export async function authenticateAdmin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: "Email and password are required." };
  }

  const passwordHash = hashPassword(cleanPassword);

  // Check built-in configured administrators
  const matchedAdmin = CONFIGURED_ADMINS.find(
    (admin) => admin.email === cleanEmail && admin.passwordHash === passwordHash
  );

  if (matchedAdmin) {
    return {
      success: true,
      user: {
        email: matchedAdmin.email,
        name: matchedAdmin.name,
      },
    };
  }

  // If not in configured admins and no backend endpoint is set
  if (!GOOGLE_SCRIPT_URL) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  // Query Google Apps Script backend for additional admin users
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "login",
        email: cleanEmail,
        passwordHash: passwordHash,
        password: cleanPassword,
      }),
      redirect: "follow",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Unable to verify credentials with authentication server.",
      };
    }

    const data = await response.json();
    if (data.success && data.user) {
      return {
        success: true,
        user: {
          email: data.user.email,
          name: data.user.name || data.user.email.split("@")[0],
        },
      };
    }

    return {
      success: false,
      error: data.error || "Invalid email or password.",
    };
  } catch {
    return {
      success: false,
      error: "Unable to connect to authentication service. Please try again.",
    };
  }
}

/**
 * Ensures all dynamic content fields have English translations populated.
 * If inputted in Indonesian without English, translates on the server and caches it.
 */
async function enrichContentWithTranslations(raw: {
  packages: PackageItem[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  outlets: OutletItem[];
}) {
  const [enrichedPackages, enrichedFaqs, enrichedTestimonials, enrichedOutlets] = await Promise.all([
    Promise.all(
      raw.packages.map(async (pkg) => {
        const turnaround_en = pkg.turnaround_en || (await translateIdToEn(pkg.turnaround));
        const description_en = pkg.description_en || (await translateIdToEn(pkg.description));
        const features_en =
          Array.isArray(pkg.features_en) && pkg.features_en.length > 0
            ? pkg.features_en
            : await translateListIdToEn(pkg.features || []);
        const whatsappMessage_en = pkg.whatsappMessage_en || (await translateIdToEn(pkg.whatsappMessage));

        return {
          ...pkg,
          turnaround_en,
          description_en,
          features_en,
          whatsappMessage_en,
        };
      })
    ),
    Promise.all(
      raw.faqs.map(async (faq) => {
        const question_en = faq.question_en || (await translateIdToEn(faq.question));
        const answer_en = faq.answer_en || (await translateIdToEn(faq.answer));

        return {
          ...faq,
          question_en,
          answer_en,
        };
      })
    ),
    Promise.all(
      raw.testimonials.map(async (t) => {
        const role_en = t.role_en || (await translateIdToEn(t.role));
        const content_en = t.content_en || (await translateIdToEn(t.content));

        return {
          ...t,
          role_en,
          content_en,
        };
      })
    ),
    Promise.all(
      raw.outlets.map(async (o) => {
        const description_en = o.description_en || (await translateIdToEn(o.description));
        const dispatch_en = o.dispatch_en || (await translateIdToEn(o.dispatch));
        const whatsappMessage_en = o.whatsappMessage_en || (await translateIdToEn(o.whatsappMessage));

        return {
          ...o,
          description_en,
          dispatch_en,
          whatsappMessage_en,
        };
      })
    ),
  ]);

  return {
    packages: enrichedPackages,
    faqs: enrichedFaqs,
    testimonials: enrichedTestimonials,
    outlets: enrichedOutlets,
  };
}

/**
 * Fetch all CMS content from Google Sheets (Packages, FAQs, Testimonials, Outlets)
 * Falls back to local default data if endpoint is unavailable or fails.
 */
export async function getCMSContent(): Promise<{
  packages: PackageItem[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  outlets: OutletItem[];
}> {
  if (!GOOGLE_SCRIPT_URL) {
    return enrichContentWithTranslations({
      packages: defaultPackages,
      faqs: defaultFaqs,
      testimonials: defaultTestimonials,
      outlets: defaultOutlets,
    });
  }

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getContent`, {
      method: "GET",
      next: { revalidate: 60, tags: ["cms-content"] },
    });

    if (!response.ok) {
      return enrichContentWithTranslations({
        packages: defaultPackages,
        faqs: defaultFaqs,
        testimonials: defaultTestimonials,
        outlets: defaultOutlets,
      });
    }

    const data = await response.json();
    const rawData = {
      packages: Array.isArray(data.packages) && data.packages.length > 0 ? data.packages : defaultPackages,
      faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultFaqs,
      testimonials:
        Array.isArray(data.testimonials) && data.testimonials.length > 0
          ? data.testimonials
          : defaultTestimonials,
      outlets:
        Array.isArray(data.outlets) && data.outlets.length > 0
          ? data.outlets
          : defaultOutlets,
    };

    return enrichContentWithTranslations(rawData);
  } catch {
    return enrichContentWithTranslations({
      packages: defaultPackages,
      faqs: defaultFaqs,
      testimonials: defaultTestimonials,
      outlets: defaultOutlets,
    });
  }
}

/**
 * Fetch Packages from Google Sheets
 */
export async function getPackages(): Promise<PackageItem[]> {
  const content = await getCMSContent();
  return content.packages;
}

/**
 * Fetch FAQs from Google Sheets
 */
export async function getFaqs(): Promise<FAQItem[]> {
  const content = await getCMSContent();
  return content.faqs;
}

/**
 * Fetch Testimonials from Google Sheets
 */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  const content = await getCMSContent();
  return content.testimonials;
}

/**
 * Fetch Outlets from Google Sheets
 */
export async function getOutlets(): Promise<OutletItem[]> {
  const content = await getCMSContent();
  return content.outlets;
}

/**
 * Save Outlets to Google Sheet
 */
export async function saveOutletsToSheet(
  outletsList: OutletItem[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "GOOGLE_SCRIPT_URL is not configured in environment variables." };
  }

  try {
    const enrichedOutlets = await Promise.all(
      outletsList.map(async (o) => ({
        ...o,
        description_en: o.description_en || (await translateIdToEn(o.description)),
        dispatch_en: o.dispatch_en || (await translateIdToEn(o.dispatch)),
        whatsappMessage_en: o.whatsappMessage_en || (await translateIdToEn(o.whatsappMessage)),
      }))
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateOutlets",
        outlets: enrichedOutlets,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { success: false, error: `Server returned status ${response.status}` };
    }

    const data = await response.json();
    if (!data.success && data.error && data.error.includes("Unknown action")) {
      return {
        success: false,
        error: "Google Apps Script Web App is running an older deployment. In Apps Script, click Deploy > Manage deployments > Edit (pencil icon) > Version: New version > Deploy.",
      };
    }
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return { success: false, error: `Failed to save outlets: ${message}` };
  }
}

/**
 * Save Packages to Google Sheet
 */
export async function savePackagesToSheet(
  packagesList: PackageItem[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "GOOGLE_SCRIPT_URL is not configured in environment variables." };
  }

  try {
    const enrichedPackages = await Promise.all(
      packagesList.map(async (pkg) => ({
        ...pkg,
        turnaround_en: pkg.turnaround_en || (await translateIdToEn(pkg.turnaround)),
        description_en: pkg.description_en || (await translateIdToEn(pkg.description)),
        features_en:
          Array.isArray(pkg.features_en) && pkg.features_en.length > 0
            ? pkg.features_en
            : await translateListIdToEn(pkg.features || []),
        whatsappMessage_en: pkg.whatsappMessage_en || (await translateIdToEn(pkg.whatsappMessage)),
      }))
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updatePackages",
        packages: enrichedPackages,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { success: false, error: `Server returned status ${response.status}` };
    }

    const data = await response.json();
    if (!data.success && data.error && data.error.includes("Unknown action")) {
      return {
        success: false,
        error: "Google Apps Script Web App is running an older deployment. In Apps Script, click Deploy > Manage deployments > Edit (pencil icon) > Version: New version > Deploy.",
      };
    }
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return { success: false, error: `Failed to save packages: ${message}` };
  }
}

/**
 * Save FAQs to Google Sheet
 */
export async function saveFaqsToSheet(
  faqsList: FAQItem[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "GOOGLE_SCRIPT_URL is not configured in environment variables." };
  }

  try {
    const enrichedFaqs = await Promise.all(
      faqsList.map(async (faq) => ({
        ...faq,
        question_en: faq.question_en || (await translateIdToEn(faq.question)),
        answer_en: faq.answer_en || (await translateIdToEn(faq.answer)),
      }))
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateFaqs",
        faqs: enrichedFaqs,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { success: false, error: `Server returned status ${response.status}` };
    }

    const data = await response.json();
    if (!data.success && data.error && data.error.includes("Unknown action")) {
      return {
        success: false,
        error: "Google Apps Script Web App is running an older deployment. In Apps Script, click Deploy > Manage deployments > Edit (pencil icon) > Version: New version > Deploy.",
      };
    }
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return { success: false, error: `Failed to save FAQs: ${message}` };
  }
}

/**
 * Save Testimonials to Google Sheet
 */
export async function saveTestimonialsToSheet(
  testimonialsList: TestimonialItem[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "GOOGLE_SCRIPT_URL is not configured in environment variables." };
  }

  try {
    const enrichedTestimonials = await Promise.all(
      testimonialsList.map(async (t) => ({
        ...t,
        role_en: t.role_en || (await translateIdToEn(t.role)),
        content_en: t.content_en || (await translateIdToEn(t.content)),
      }))
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateTestimonials",
        testimonials: enrichedTestimonials,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { success: false, error: `Server returned status ${response.status}` };
    }

    const data = await response.json();
    if (!data.success && data.error && data.error.includes("Unknown action")) {
      return {
        success: false,
        error: "Google Apps Script Web App is running an older deployment. In Apps Script, click Deploy > Manage deployments > Edit (pencil icon) > Version: New version > Deploy.",
      };
    }
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Connection failed";
    return { success: false, error: `Failed to save testimonials: ${message}` };
  }
}
