from django.shortcuts import render
from django.http import JsonResponse
from .models import AutomobileVO, Customer,Employee,Sale
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json


# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


class EmployeeEncoder(ModelEncoder):
    model = Employee
    properties = [
        "name",
        "employee_number",
    ]



class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone",
        "id",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": EmployeeEncoder(),
        "customer": CustomerEncoder()

    }


@require_http_methods(["GET","POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
            )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.filter(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder= CustomerEncoder,
            safe=False,
        )
    elif request.method =="DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.load(request.body)
        try:
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder= CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer"},
                status = 400,
            )


@require_http_methods(["GET","POST"])
def list_employee(request):
    if request.method == "GET":
        employee = Employee.objects.all()
        return JsonResponse(
            {"employee": employee},
            encoder=EmployeeEncoder
            )
    else:
        content = json.loads(request.body)
        employee = Employee.objects.create(**content)
        return JsonResponse(
            employee,
            encoder=EmployeeEncoder,
            safe=False,
        )



@require_http_methods(["GET", "DELETE"])
def show_employee(request, id):
    if request.method == "GET":
        employee = Employee.objects.filter(id=id)
        return JsonResponse(
            {"employee": employee},
            encoder= EmployeeEncoder,
            safe=False,
        )
    elif request.method =="DELETE":
        count, _ = Employee.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.load(request.body)
        try:
            Employee.objects.filter(id=id).update(**content)
            employee = Employee.objects.get(id=id)
            return JsonResponse(
                employee,
                encoder= EmployeeEncoder,
                safe=False,
            )
        except Employee.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee"},
                status = 400,
            )


@require_http_methods(["GET","POST"])
def list_sales(request, employee_vo_id=None):
    if request.method == "GET":
        if employee_vo_id is not None:
            sales = Sale.objects.filter(employee=employee_vo_id)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin = content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid VIN"},
                status = 400,
            )
        try:
            salesperson = Employee.objects.get(employee_number = content["salesperson"])
            content["salesperson"] = salesperson
        except Employee.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status = 400,
            )
        try:
            customer = Customer.objects.get(name = content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status = 400,
            )

        sales = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def show_sales(request, id):
    if request.method == "GET":
        sale = Sale.objects.filter(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder,
        )

    elif request.method == "DELETE":
        count, _ = Sale.objects.get(id=id).delete()
        return JsonResponse({"deleted": count > 0})
