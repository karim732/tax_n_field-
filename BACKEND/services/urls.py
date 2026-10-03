from rest_framework.routers import DefaultRouter

from .views import ServiceViewSet
from .views import EnquiryViewSet


router = DefaultRouter()

router.register(
    "services",
    ServiceViewSet,
    basename="services"
)

router.register(
    "enquiries",
    EnquiryViewSet,
    basename="enquiries"
)


urlpatterns = router.urls