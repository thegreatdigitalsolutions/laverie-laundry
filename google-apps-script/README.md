# Google Apps Script Setup Guide for Laverie Laundry CMS

Follow these steps to connect your Google Sheet to the admin portal:

## 1. Open Your Google Sheet
- Make sure you open the spreadsheet connected to your project.
- Sheets tabs managed by the CMS:
  1. **`Auth`** — Admin users (`email`, `password`, `name`)
  2. **`Packages`** — Laundry service packages (`id`, `name`, `badge`, `price`, `unit`, `turnaround`, `description`, `features`, `popular`, `whatsappMessage`)
  3. **`Outlets`** — Store branches & hubs (`id`, `tabName`, `name`, `phone`, `description`, `address`, `openingHours`, `dispatch`, `mapsUrl`, `mapsEmbedUrl`, `whatsappMessage`, `status`)
  4. **`FAQs`** — Customer Q&A accordions (`question`, `answer`)
  5. **`Testimonials`** — Customer reviews (`name`, `role`, `hotel`, `rating`, `content`)

*(All sheets are automatically created and seeded when you deploy the script!)*

---

## 2. Add Google Apps Script
1. In the Google Sheet top menu, click **Extensions** &gt; **Apps Script**.
2. Erase any placeholder code in the script editor.
3. Open `google-apps-script/Code.gs` from this project, copy all of its content, and paste it into the Apps Script editor.
4. Click the disk icon 💾 (**Save project**).

---

## 3. Deploy as Web App
1. In the top right corner of Apps Script, click the blue **Deploy** button &gt; **New deployment** (or **Manage deployments** &gt; Edit &gt; New version if already deployed).
2. Next to *Select type*, click the gear icon ⚙️ and choose **Web app**.
3. Configure the settings:
   - **Description**: `Laverie Laundry CMS API`
   - **Execute as**: `Me (<your-email>)`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

---

## 4. Add to `.env.local`
In `.env.local`:
```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Now, all packages, FAQs, and testimonials edited in the admin console will automatically sync with your Google Sheet!
