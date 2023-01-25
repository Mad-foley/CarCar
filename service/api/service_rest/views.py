from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
from django.views.decorators.http import require_http_methods
from datetime import datetime
import json

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ['vin', 'import_href']

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [ 'name', "employee_number"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer_name",
        "appointment_time",
        "reason",
        "finished",
        "vip",
        "technician",
        ]
    encoders = {
        "technician": TechnicianListEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        employee = Technician.objects.all()
        return JsonResponse(
            {"technicians": employee},
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        employee = Technician.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=TechnicianListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(name=content['technician'])
            content['technician'] = technician
            item = AutomobileVO.objects.filter(vin=content['vin'])
            if len(item) > 0:
                content['vip'] = True
            else:
                content['vip'] = False
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician name"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_appointment_history(request,vin):
    if request.method == "GET":
        appointment = Appointment.objects.filter(vin)
        return JsonResponse(
                appointment,
                encoder=AppointmentListEncoder,
                safe=False,
            )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(vin=vin).delete()
        return JsonResponse({"deleted": count > 0})

        