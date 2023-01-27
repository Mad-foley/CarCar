# CarCar

Team:

* Person 1 - Ciana: Sales
* Person 2 - Maddy: Services

## Design

## Service microservice

I created a Technician model that allows for technicians to be added with a name and unique employee identifier. I also created an automobileVO model that polls data from the inventory database to use in my POST appointment view function to check if a customer is VIP. I created an appointment model that keeps track of appointments, vip status, and history. It uses Technician as a foreign key and checks the automobileVO to see if any of the vins match upon creation. If the vin matches then VIP status is set to true and the customer gets a VIP icon next to their name on the appointment list. Otherwise their VIP status is set to false. When creating an appointment, its status of being "finished" is automatically set to "false" and when the "finished" button is selected it is set to "true" which allows it to be viewed in history. If it is canceled it is deleted from the database entirely.

Each car's appointment history is linked to the VIN to allow for easy history filtering.

## Sales microservice


I created an Employee model, which when adding a sale, the views lists the employees and it is also possible to see what sales correlate with which employee(vin). I created a Customer model which allows the user to add a customer to be saved and used for other functions such as viewing what customer bought what automobile and the customer's information(phone number and address) will be pulled from what was previously inputted. The Sale model keeps track of the automobiles, salesperson, customer and sale price. Salesperson, customer and automobile are individual foreign keys to the Sale model.  A sale can be created when a user inputs the information from the model. All previous sales can be viewed as a list once required information was given.
AutomobileVO is the last model that holds the href and vin from automobiles which are then stored into the Inventory API using a poller function.
