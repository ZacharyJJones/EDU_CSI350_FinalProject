from api import app, db, FoodItemModel, BirthdayModel, PenModel
from db_data import db_data_food_items

with app.app_context():
    db.create_all()

    # Fill with some data ahead of use
    for x in db_data_food_items:
        food_item = FoodItemModel(
            name = x["name"],
            source = x["source"],
            unit = x["unit"],
            unit_portions = x["unit_portions"],
            unit_price = x["unit_price"],
        )
        db.session.add(food_item)

    db.session.add(BirthdayModel(
        name = "Zachary",
        year = 1999,
        month = -1,
        day = -1
    ))
    db.session.add(BirthdayModel(
        name = "Josie",
        year = 1944,
        month = 4,
        day = 44
    ))


    db.session.add(PenModel(
        brand = "Pilot",
        model = "G2",
        color = "Black",
        point = 0.2
    ))
    db.session.add(PenModel(
        brand = "Bic",
        model = "Elle Normale",
        color = "Blue",
        point = 0.3
    ))


    db.session.commit()
    pass