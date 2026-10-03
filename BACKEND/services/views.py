from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Service
from .models import Enquiry

from .serializers import ServiceSerializer
from .serializers import EnquirySerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ServiceSerializer

    permission_classes = [
        AllowAny
    ]

    def get_queryset(self):

        queryset = Service.objects.filter(
            active=True
        )

        category = self.request.query_params.get(
            "category"
        )

        if category:
            queryset = queryset.filter(
                category=category
            )

        return queryset

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # Enable HTTP caching for CDNs and browser caches (5 mins)
        response["Cache-Control"] = "public, max-age=300, s-maxage=600"
        return response


class EnquiryViewSet(viewsets.ModelViewSet):

    serializer_class = EnquirySerializer

    permission_classes = [
        AllowAny
    ]

    queryset = Enquiry.objects.all()

    def get_queryset(self):

        # Normal visitors cannot view enquiries
        if (
            self.request.method == "GET"
            and not self.request.user.is_staff
        ):
            return Enquiry.objects.none()

        return Enquiry.objects.all()