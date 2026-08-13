# How to Edit Business Contact & Social Links

All contact details and social media links across the entire website are driven from **one single central file**.

---

## 📁 Primary Editable File: `src/config/contact.json`

To change any phone number, email address, WhatsApp message, or social profile URL:

1. Open [src/config/contact.json](file:///Users/utkarshmanitripathi/Documents/GitHub/Shree Balaji Site/src/config/contact.json) in any text editor or IDE.
2. Edit any field value:

```json
{
  "email": "shreebalajirmills@gmail.com",
  "phone": "+91 8800106726",
  "phoneRaw": "+918800106726",
  "whatsappRaw": "918800106726",
  "whatsappDefaultMessage": "Hey, I'd like to Talk for Quotation ....",
  "salesDesk": "Bhiwadi Mill Sales Desk",
  "socialLinks": {
    "instagram": "https://www.instagram.com/sbrm.2026/",
    "facebook": "https://www.facebook.com/profile.php?id=61592632001035",
    "x": "https://x.com/SBRM2026",
    "reddit": "https://www.reddit.com/user/ShreeBalajiRollMill/"
  },
  "address": {
    "factory": "Bhiwadi Industrial Area, Bhiwadi, Haryana, India",
    "office": "Delhi NCR, India",
    "country": "IN"
  }
}
```

3. Save the file. The entire site (Header, Footer, Contact Page, Inquiry Form, Floating WhatsApp, and Schema JSON-LD) will automatically update everywhere!

---

## 📊 Spreadsheet / Excel Reference File: `BUSINESS_CONTACT.csv`

An Excel-compatible CSV file is also included in the root directory:
- [BUSINESS_CONTACT.csv](file:///Users/utkarshmanitripathi/Documents/GitHub/Shree Balaji Site/BUSINESS_CONTACT.csv)

You can open this file in **Microsoft Excel**, **Apple Numbers**, or **Google Sheets** for reference or offline documentation.
