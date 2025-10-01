import express from "express"
import type { Request, Response} from "express";


class Car {
    year: number;
    size: string;
    color: string;
    make : string;
    model : string;
    availability : boolean;
    seats: number;
    price: number;

    constructor(year: number, size: string, color: string, model: string, make: string, availability: boolean, seats: number, price: number;) {
        this.year = year;
        this.size = size;
        this.color = color;
        this.make = make;
        this.model = model;
        this.availability = availability;
        this.seats = seats;
        this.price = price;
    }
}

class User {
    userId: string;
    password: string;

    constructor(userID: string, password: string) {
        this.userId = userID;
        this.password = password;
    }

    makeReservation(cus: customer, car: Car) : boolean {
        if (car.availability == false) {
            return false;
        }
        car.availability = false;
        cus.checkedOutCar = car;
        return true;
    }
}

class customer extends User {
        checkedOutCar: Car;
        driversLicenseNumber: number;

    constructor(userId: string, password: string, driversLicenseNumber: number, checkedOutCar: Car) {
        super(userId, password);
        this.driversLicenseNumber = driversLicenseNumber;
        this.checkedOutCar = checkedOutCar;
    }
}

class Admin extends User {
    constructor(userId: string, password: string) {
        super(userId, password)
    }
}


class Reservation {
    reservationId : string
    startDate : Date;
    endDate : Date;
    status : boolean;

    constructor(reservationId : string, startDate : Date, endDate : Date, status : boolean) {
        this.reservationId = reservationId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}


class Payment {
    method: string;
    payId: string;
    amount: number;
    status: boolean;

    constructor(method: string, payId: string, amount: number, status: boolean) {
        this.method = method;
        this.payId = payId;
        this.amount = amount;
        this.status = status;
    }
}