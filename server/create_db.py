from api import app, db, FoodItemModel
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
    db.session.commit()
    pass