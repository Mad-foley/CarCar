from django.urls import path
from .views import api_list_technicians, api_appointment_history, api_list_appointments

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("appointments/<str:vin>/", api_appointment_history, name="api_appointment_history"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
]
