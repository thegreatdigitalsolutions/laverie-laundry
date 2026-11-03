import { hashPassword } from "@/lib/auth";
import { PackageItem, packages as defaultPackages } from "@/data/packages";
import { FAQItem, faqs as defaultFaqs } from "@/data/faq";
import { TestimonialItem, defaultTestimonials } from "@/data/testimonials";

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
 * Fetch all CMS content from Google Sheets (Packages, FAQs, Testimonials)
 * Falls back to local default data if endpoint is unavailable or fails.
 */
export async function getCMSContent(): Promise<{
  packages: PackageItem[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
}> {
  if (!GOOGLE_SCRIPT_URL) {
    return {
      packages: defaultPackages,
      faqs: defaultFaqs,
      testimonials: defaultTestimonials,
    };
  }

  try {
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getContent`, {
      method: "GET",
      next: { revalidate: 60, tags: ["cms-content"] },
    });

    if (!response.ok) {
      return {
        packages: defaultPackages,
        faqs: defaultFaqs,
        testimonials: defaultTestimonials,
      };
    }

    const data = await response.json();
    return {
      packages: Array.isArray(data.packages) && data.packages.length > 0 ? data.packages : defaultPackages,
      faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : defaultFaqs,
      testimonials:
        Array.isArray(data.testimonials) && data.testimonials.length > 0
          ? data.testimonials
          : defaultTestimonials,
    };
  } catch {
    return {
      packages: defaultPackages,
      faqs: defaultFaqs,
      testimonials: defaultTestimonials,
    };
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
 * Save Packages to Google Sheet
 */
export async function savePackagesToSheet(
  packagesList: PackageItem[]
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    return { success: false, error: "GOOGLE_SCRIPT_URL is not configured in environment variables." };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updatePackages",
        packages: packagesList,
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
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateFaqs",
        faqs: faqsList,
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
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "updateTestimonials",
        testimonials: testimonialsList,
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
