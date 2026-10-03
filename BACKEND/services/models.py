from django.db import models

# Create your models here.
from django.db import models


class Service(models.Model):

    CATEGORY_CHOICES = [
        ("GST", "GST Services"),
        ("INCOME_TAX", "Income Tax Services"),
        ("BUSINESS", "Business Licenses & Codes"),
        ("ANNUAL", "Annual Filings"),
        ("REGISTRATION", "Company/Firm Registration"),
        ("OTHER", "Other Services"),
    ]

    title = models.CharField(
        max_length=180
    )

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        db_index=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    unit = models.CharField(
        max_length=50,
        blank=True,
        default=""
    )

    description = models.TextField(
        blank=True
    )

    features = models.JSONField(
        default=list,
        blank=True
    )

    popular = models.BooleanField(
        default=False,
        db_index=True
    )

    active = models.BooleanField(
        default=True,
        db_index=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = [
            "category",
            "price",
            "title"
        ]
        indexes = [
            models.Index(fields=["active", "category"]),
            models.Index(fields=["active", "popular"]),
        ]

    def __str__(self):
        return f"{self.title} - ₹{self.price}"


class Enquiry(models.Model):

    STATUS_CHOICES = [
        ("NEW", "New"),
        ("CONTACTED", "Contacted"),
        ("CLOSED", "Closed"),
    ]

    name = models.CharField(
        max_length=120
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )

    service = models.CharField(
        max_length=180,
        blank=True
    )

    message = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="NEW"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.name} - {self.phone}"