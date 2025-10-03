import express from "express"
import type { Request, Response} from "express";

import sqlite3 from "sqlite3"
import { open } from "sqlite";


const app = express();
app.use(express.json());

let db: Awaited<ReturnType<typeof open>>;

async function init() {
    db = await open({
        filename: "database.db",
        driver: sqlite3.Database,
    });

    app.listen(401, () => {});
    // idk if this needs to be same as server, just running it at this port for now
}


//example login function
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) {
    res.status(400).json({ success: false, message: "User not found" });
    return;
  }

  if (user.password === password) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(400).json({ success: false, message: "Incorrect password" });
  }
});




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

    /*makeReservation(cus: customer, car: Car) : boolean {
        if (car.availability == false) {
            return false;
        }
        car.availability = false;
        return true;
    }
    */    
}

class customer extends User {
        reservation: Reservation;
        driversLicenseNumber: number;

    constructor(userId: string, password: string, driversLicenseNumber: number, reservation: Reservation) {
        super(userId, password);
        this.driversLicenseNumber = driversLicenseNumber;
        this.reservation = reservation;
    }
}

class Admin extends User {
    constructor(userId: string, password: string) {
        super(userId, password)
    }
}


class Reservation {
    reservationId : string;
    startDate : Date;
    endDate : Date;
    status : boolean;
    car: Car

    constructor(reservationId : string, startDate : Date, endDate : Date, status : boolean, car: Car) {
        this.reservationId = reservationId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.car = car;
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

init();