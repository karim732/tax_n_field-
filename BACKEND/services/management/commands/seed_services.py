from django.core.management.base import BaseCommand

from services.models import Service


SERVICES = [

    # =========================================================
    # GST SERVICES
    # =========================================================

    {
        "title": "GST Registration (1 Day)",
        "category": "GST",
        "price": 1499,
        "unit": "",
        "description": "GST registration assistance.",
        "features": [
            "GST application preparation",
            "GSTIN assistance",
            "Document guidance",
        ],
        "popular": True,
    },

    {
        "title": "GST Return Filing (NIL)",
        "category": "GST",
        "price": 249,
        "unit": "",
        "description": "GST NIL return filing assistance.",
        "features": [
            "Return preparation",
            "GST portal filing",
            "Filing confirmation",
        ],
        "popular": False,
    },

    {
        "title": "GST Return Filing (Taxable)",
        "category": "GST",
        "price": 699,
        "unit": "",
        "description": "GST taxable return filing assistance.",
        "features": [
            "Taxable return preparation",
            "B2B/B2C support",
            "GST filing assistance",
        ],
        "popular": True,
    },

    {
        "title": "GST Cancellation",
        "category": "GST",
        "price": 1499,
        "unit": "",
        "description": "GST registration cancellation assistance.",
        "features": [
            "Cancellation application",
            "Document guidance",
            "GST portal support",
        ],
        "popular": False,
    },

    {
        "title": "GST Amendment",
        "category": "GST",
        "price": 999,
        "unit": "",
        "description": "GST registration amendment assistance.",
        "features": [
            "Business detail update",
            "Document assistance",
            "GST portal support",
        ],
        "popular": False,
    },


    # =========================================================
    # BUSINESS LICENSES
    # =========================================================

    {
        "title": "Udyog Aadhar (MSME)",
        "category": "BUSINESS",
        "price": 499,
        "unit": "",
        "description": "MSME/Udyam registration assistance.",
        "features": [
            "Udyam registration",
            "Application support",
            "Certificate assistance",
        ],
        "popular": False,
    },

    {
        "title": "FSSAI Basic Registration",
        "category": "BUSINESS",
        "price": 1099,
        "unit": "",
        "description": "FSSAI basic registration assistance.",
        "features": [
            "FSSAI application",
            "Document guidance",
            "Registration support",
        ],
        "popular": False,
    },

    {
        "title": "Import Export Code (IEC)",
        "category": "BUSINESS",
        "price": 1999,
        "unit": "",
        "description": "Import Export Code registration assistance.",
        "features": [
            "IEC application",
            "Document checklist",
            "DGFT filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "Trademark Logo Registration",
        "category": "BUSINESS",
        "price": 13999,
        "unit": "",
        "description": "Trademark logo registration assistance.",
        "features": [
            "Trademark application",
            "Logo filing assistance",
            "Application guidance",
        ],
        "popular": False,
    },


    # =========================================================
    # ANNUAL FILINGS
    # =========================================================

    {
        "title": "GST Returns (NIL)",
        "category": "ANNUAL",
        "price": 1999,
        "unit": "/year",
        "description": "Annual GST NIL return filing support.",
        "features": [
            "Annual compliance",
            "GST return filing",
            "Filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "GST Returns (Taxable)",
        "category": "ANNUAL",
        "price": 4999,
        "unit": "/year",
        "description": "Annual GST taxable return filing.",
        "features": [
            "Annual GST compliance",
            "Taxable return filing",
            "Compliance assistance",
        ],
        "popular": False,
    },

    {
        "title": "Pvt Ltd / OPC (No Transaction)",
        "category": "ANNUAL",
        "price": 4999,
        "unit": "",
        "description": "Annual filing for companies with no transactions.",
        "features": [
            "Annual compliance",
            "ROC filing assistance",
            "Document preparation",
        ],
        "popular": False,
    },

    {
        "title": "Pvt Ltd / OPC (NIL Turnover)",
        "category": "ANNUAL",
        "price": 6999,
        "unit": "",
        "description": "Annual filing for companies with nil turnover.",
        "features": [
            "Annual compliance",
            "ROC filing assistance",
            "Return preparation",
        ],
        "popular": False,
    },

    {
        "title": "Pvt Ltd / OPC (With Turnover)",
        "category": "ANNUAL",
        "price": 6999,
        "unit": "",
        "description": "Annual filing for companies with turnover.",
        "features": [
            "Annual compliance",
            "ROC filing assistance",
            "Documentation support",
        ],
        "popular": False,
    },

    {
        "title": "LLP (With Transactions)",
        "category": "ANNUAL",
        "price": 4999,
        "unit": "",
        "description": "Annual LLP filing with transactions.",
        "features": [
            "LLP compliance",
            "Annual filing",
            "Documentation support",
        ],
        "popular": False,
    },


    # =========================================================
    # INCOME TAX
    # =========================================================

    {
        "title": "Salary ITR",
        "category": "INCOME_TAX",
        "price": 1499,
        "unit": "*",
        "description": "Income tax return filing for salaried individuals.",
        "features": [
            "ITR preparation",
            "Income calculation",
            "Online filing assistance",
        ],
        "popular": True,
    },

    {
        "title": "Business Income ITR",
        "category": "INCOME_TAX",
        "price": 1499,
        "unit": "*",
        "description": "Income tax return for business or professional income.",
        "features": [
            "Income computation",
            "ITR preparation",
            "Online filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "Salary / Business ITR Returns",
        "category": "INCOME_TAX",
        "price": 1999,
        "unit": "*",
        "description": "ITR filing for salary and business income.",
        "features": [
            "Salary income",
            "Business income",
            "ITR filing assistance",
        ],
        "popular": False,
    },


    # =========================================================
    # COMPANY / FIRM REGISTRATION
    # =========================================================

    {
        "title": "Proprietorship (MSME + GST)",
        "category": "REGISTRATION",
        "price": 1999,
        "unit": "",
        "description": "Proprietorship business setup assistance.",
        "features": [
            "Proprietorship setup",
            "MSME registration",
            "GST registration assistance",
        ],
        "popular": False,
    },

    {
        "title": "Partnership (MSME + GST + PAN)",
        "category": "REGISTRATION",
        "price": 3999,
        "unit": "",
        "description": "Partnership firm registration assistance.",
        "features": [
            "Partnership setup",
            "MSME registration",
            "GST and PAN assistance",
        ],
        "popular": False,
    },

    {
        "title": "Pvt Ltd Company (2 Directors)",
        "category": "REGISTRATION",
        "price": 3999,
        "unit": "",
        "description": "Private limited company registration.",
        "features": [
            "Company incorporation",
            "2 director support",
            "Registration assistance",
        ],
        "popular": True,
    },

    {
        "title": "LLP (2 Partners)",
        "category": "REGISTRATION",
        "price": 8999,
        "unit": "",
        "description": "Limited Liability Partnership registration.",
        "features": [
            "LLP incorporation",
            "2 partner support",
            "Registration assistance",
        ],
        "popular": False,
    },

    {
        "title": "One Person Company",
        "category": "REGISTRATION",
        "price": 9999,
        "unit": "",
        "description": "One Person Company registration.",
        "features": [
            "OPC incorporation",
            "Documentation support",
            "Registration assistance",
        ],
        "popular": False,
    },


    # =========================================================
    # OTHER SERVICES
    # =========================================================

    {
        "title": "DSC Class 3 (2 Years)",
        "category": "OTHER",
        "price": 2399,
        "unit": "",
        "description": "Class 3 Digital Signature Certificate.",
        "features": [
            "DSC application",
            "Verification assistance",
            "2 year validity",
        ],
        "popular": False,
    },

    {
        "title": "Consultation Call",
        "category": "OTHER",
        "price": 299,
        "unit": "",
        "description": "Professional tax and business consultation.",
        "features": [
            "One consultation call",
            "Requirement discussion",
            "Service guidance",
        ],
        "popular": True,
    },

    {
        "title": "TDS Return Filing",
        "category": "OTHER",
        "price": 1499,
        "unit": "",
        "description": "TDS return filing assistance.",
        "features": [
            "TDS return preparation",
            "Document checking",
            "Online filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "DIR-3 KYC",
        "category": "OTHER",
        "price": 1499,
        "unit": "",
        "description": "Director KYC filing assistance.",
        "features": [
            "Document verification",
            "DIR-3 KYC preparation",
            "Online filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "Company Name Change",
        "category": "OTHER",
        "price": 4999,
        "unit": "",
        "description": "Company name change assistance.",
        "features": [
            "Documentation",
            "Name change application",
            "Filing assistance",
        ],
        "popular": False,
    },

    {
        "title": "Director Addition (with DSC)",
        "category": "OTHER",
        "price": 4999,
        "unit": "",
        "description": "Director addition assistance.",
        "features": [
            "Director documentation",
            "DSC assistance",
            "Filing support",
        ],
        "popular": False,
    },

    {
        "title": "Director Deletion",
        "category": "OTHER",
        "price": 4999,
        "unit": "",
        "description": "Director deletion assistance.",
        "features": [
            "Documentation",
            "Director removal process",
            "Filing support",
        ],
        "popular": False,
    },

    {
        "title": "MOA Change (Business Nature)",
        "category": "OTHER",
        "price": 4999,
        "unit": "",
        "description": "MOA business nature change assistance.",
        "features": [
            "MOA documentation",
            "Business nature update",
            "Filing support",
        ],
        "popular": False,
    },
]


class Command(BaseCommand):

    help = "Add Ashvathaman Associates services"

    def handle(self, *args, **kwargs):

        created_count = 0
        updated_count = 0

        for service in SERVICES:

            title = service["title"]

            data = {
                "category": service["category"],
                "price": service["price"],
                "unit": service["unit"],
                "description": service["description"],
                "features": service["features"],
                "popular": service["popular"],
                "active": True,
            }

            obj, created = Service.objects.update_or_create(
                title=title,
                defaults=data,
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Services created: {created_count}"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Services updated: {updated_count}"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Service catalogue loaded successfully."
            )
        )