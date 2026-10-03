from rest_framework import serializers

from .models import Service
from .models import Enquiry


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service

        fields = [
            "id",
            "title",
            "category",
            "price",
            "unit",
            "description",
            "features",
            "popular",
            "active",
            "created_at",
            "updated_at",
        ]


class EnquirySerializer(serializers.ModelSerializer):

    class Meta:
        model = Enquiry

        fields = [
            "id",
            "name",
            "email",
            "phone",
            "service",
            "message",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]