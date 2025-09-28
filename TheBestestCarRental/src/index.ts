import express from "express"


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
}

class customer extends User {
        checkedOut: boolean;
        driversLicenseNumber: number;

    constructor(userId: string, password: string, driversLicenseNumber: number, checkedOut: boolean) {
        super(userId, password);
        this.driversLicenseNumber = driversLicenseNumber;
        this.checkedOut = checkedOut;
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