from flask import Flask, jsonify, request, abort
from flask_restful import Resource, Api, reqparse, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Setup

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
CORS(app)

db = SQLAlchemy(app)
api = Api(app)


# ===========================================================================
# Item Model
class FoodItemModel(db.Model):
   id = db.Column(db.Integer, primary_key = True)

   name = db.Column(db.String(80))
   source = db.Column(db.String(80), nullable=True)
   unit = db.Column(db.String(40), nullable=True)
   unit_portions = db.Column(db.Float)
   unit_price = db.Column(db.Float)

   def __repr__(self):
      return f"\"FoodItem(id:{self.id},name:{self.name},source:{self.source},unit:{self.unit},portions:{self.unit_portions},price:{self.unit_price})"
   pass

foodItem_args = reqparse.RequestParser()
foodItem_args.add_argument("id", type = int, required = False, location="form")

foodItem_args.add_argument("name", type = str, required = True, help = "Food Item name cannot be blank.", location="form")
foodItem_args.add_argument("source", type = str, required = False, location="form")
foodItem_args.add_argument("unit", type = str, required = False, location="form")

foodItem_args.add_argument("unit_portions", type = float, required = True, location="form")
foodItem_args.add_argument("unit_price", type = float, required = True, location="form")

foodItem_fields = {
   "id": fields.Integer,
   "name": fields.String,
   "source": fields.String,
   "unit": fields.String,
   "unit_portions": fields.Float,
   "unit_price": fields.Float
}

class FoodItems(Resource):

   @marshal_with(foodItem_fields)
   def get(self):
      food = FoodItemModel.query.all()
      return food

   @marshal_with(foodItem_fields)
   def post(self):
      args = foodItem_args.parse_args()

      if args["name"] == "":
         return { "name": "ERROR: Food name was left blank" }, 403 # 403=Forbidden

      # When using an id that is "None" or does not exist...
      # ... in db, the result will be a null object - "None" in python.
      # - In short, you can safely query database without checking input
      existing_entry = db.session.get(FoodItemModel, args["id"])

      if existing_entry is None:
         # Does not exist, can add new one
         new_item = FoodItemModel(
            name=args["name"],
            source = args["source"],
            unit=args["unit"],
            unit_portions=args["unit_portions"],
            unit_price=args["unit_price"]
         )
         db.session.add(new_item)
         db.session.commit()
         return new_item, 200

      # Exists, update values
      existing_entry.name = args["name"]
      existing_entry.source = args["source"]
      existing_entry.unit = args["unit"]
      existing_entry.unit_portions = args["unit_portions"]
      existing_entry.unit_price = args["unit_price"]

      db.session.commit()
      return existing_entry, 200

   pass
api.add_resource(FoodItems, "/api/fooditems")

@app.route("/api/fooditems/delete", methods=["POST"])
def delete_food_item():
   id_to_delete = int(request.form.get("id"))
   existing_entry = db.session.get(FoodItemModel, id_to_delete)
   if existing_entry is None:
      return { "error": "No record found" }, 403 # 403=Forbidden
   db.session.delete(existing_entry)
   db.session.commit()
   return { "success": "Entry was deleted" }, 200 # 200=OK
   pass

# ===========================================================================
# Birthday Model
class BirthdayModel(db.Model):
   id = db.Column(db.Integer, primary_key = True)

   name = db.Column(db.String(80))
   year = db.Column(db.Integer)
   month = db.Column(db.Integer)
   day = db.Column(db.Integer)

   def __repr__(self):
      return f"\"Birthday(id:{self.id},name:{self.name},year:{self.year},month:{self.month},day:{self.day}"
   pass

birthday_args = reqparse.RequestParser()
birthday_args.add_argument("id", type = int, required = False, location="form")

birthday_args.add_argument("name", type = str, required = True, help = "Name for birthday cannot be blank.", location="form")
birthday_args.add_argument("year", type = int, required = True, help = "Birth year must be provided.", location="form")
birthday_args.add_argument("month", type = int, required = False, location="form")
birthday_args.add_argument("day", type = int, required = False, location="form")

birthday_fields = {
   "id": fields.Integer,
   "name": fields.String,
   "year": fields.Integer,
   "month": fields.Integer,
   "day": fields.Integer
}

class Birthdays(Resource):

   @marshal_with(birthday_fields)
   def get(self):
      birthdays = BirthdayModel.query.all()
      return birthdays

   @marshal_with(birthday_fields)
   def post(self):
      args = birthday_args.parse_args()

      if args["name"] == "":
         return { "name": "ERROR: Birthday name was left blank" }, 403 # 403=Forbidden

      existing_entry = db.session.get(BirthdayModel, args["id"])

      if existing_entry is None:
         # Does not exist, can add new one
         new_item = BirthdayModel(
            name=args["name"],
            year = args["year"],
            month=args["month"],
            day=args["day"]
         )
         db.session.add(new_item)
         db.session.commit()
         return new_item, 200

      # Exists, update values
      existing_entry.name = args["name"]
      existing_entry.year = args["year"]
      existing_entry.month = args["month"]
      existing_entry.day = args["day"]

      db.session.commit()
      return existing_entry, 200

   pass
api.add_resource(Birthdays, "/api/birthdays")

@app.route("/api/birthdays/delete", methods=["POST"])
def delete_birthday_item():
   id_to_delete = int(request.form.get("id"))
   existing_entry = db.session.get(BirthdayModel, id_to_delete)
   if existing_entry is None:
      return { "error": "No record found" }, 403 # 403=Forbidden
   db.session.delete(existing_entry)
   db.session.commit()
   return { "success": "Entry was deleted" }, 200 # 200=OK
   pass




# ===========================================================================
# Pen Model
class PenModel(db.Model):
   id = db.Column(db.Integer, primary_key = True)

   brand = db.Column(db.String(80))
   model = db.Column(db.String(80), nullable=True)
   color = db.Column(db.String(40), nullable=True)
   point = db.Column(db.Float)

   def __repr__(self):
      return f"\"Pen(id:{self.id},brand:{self.brand},model:{self.model},color:{self.color},point:{self.point})"
   pass

penItem_args = reqparse.RequestParser()
penItem_args.add_argument("id", type = int, required = False, location="form")

penItem_args.add_argument("brand", type = str, required = True, help = "Pen Brand cannot be blank.", location="form")
penItem_args.add_argument("model", type = str, required = True, help = "Pen Model cannot be blank.", location="form")
penItem_args.add_argument("color", type = str, required = False, location="form")
penItem_args.add_argument("point", type = float, required = True, help = "Pen point thickness must be defined (mm).", location="form")

penItem_fields = {
   "id": fields.Integer,
   "brand": fields.String,
   "model": fields.String,
   "color": fields.String,
   "point": fields.Float
}

class Pens(Resource):

   @marshal_with(penItem_fields)
   def get(self):
      pen = PenModel.query.all()
      return pen

   @marshal_with(penItem_fields)
   def post(self):
      args = penItem_args.parse_args()

      if args["brand"] == "":
         return { "brand": "ERROR: Pen Brand was left blank" }, 403 # 403=Forbidden
      if args["model"] == "":
         return { "brand": "ERROR: Pen Model was left blank" }, 403 # 403=Forbidden

      # When using an id that is "None" or does not exist...
      # ... in db, the result will be a null object - "None" in python.
      # - In short, you can safely query database without checking input
      existing_entry = db.session.get(PenModel, args["id"])

      if existing_entry is None:
         # Does not exist, can add new one
         new_item = PenModel(
            brand=args["brand"],
            model = args["model"],
            color=args["color"],
            point=args["point"]
         )
         db.session.add(new_item)
         db.session.commit()
         return new_item, 200

      # Exists, update values
      existing_entry.brand = args["brand"]
      existing_entry.model = args["model"]
      existing_entry.color = args["color"]
      existing_entry.point = args["point"]

      db.session.commit()
      return existing_entry, 200

   pass
api.add_resource(Pens, "/api/pens")

@app.route("/api/pens/delete", methods=["POST"])
def delete_pen_item():
   id_to_delete = int(request.form.get("id"))
   existing_entry = db.session.get(PenModel, id_to_delete)
   if existing_entry is None:
      return { "error": "No record found" }, 403 # 403=Forbidden
   db.session.delete(existing_entry)
   db.session.commit()
   return { "success": "Entry was deleted" }, 200 # 200=OK
   pass


# ===========================================================================
# Special case of app.route for this because I don't need a database table for the type defs.
@app.route("/api/portiontypes", methods=["GET"])
def get_portion_types():
   ret_types = [
      {
         "id": 1,
         "name": "Carb",
         "kcal": 200
      },
      {
         "id": 2,
         "name": "Dairy",
         "kcal": 120
      },
      {
         "id": 3,
         "name": "Fat",
         "kcal": 120
      },
      {
         "id": 4,
         "name": "Fruit",
         "kcal": 100
      },
      {
         "id": 5,
         "name": "Protein",
         "kcal": 100
      },
      {
         "id": 6,
         "name": "Vegetable",
         "kcal": 50
      },
   ]
   return jsonify(ret_types), 201

# running server
if __name__ == '__main__':
   app.run(debug=True, port=8080)