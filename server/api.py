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


# Models
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

# Routes & other methods
class FoodItems(Resource):

   @marshal_with(foodItem_fields)
   def get(self):
      workout = FoodItemModel.query.all()
      return workout

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
   print(id_to_delete)
   existing_entry = db.session.get(FoodItemModel, id_to_delete)
   if existing_entry is None:
      return { "error": "No record found" }, 403 # 403=Forbidden
   db.session.delete(existing_entry)
   db.session.commit()
   return { "success": "Entry was deleted" }, 200 # 200=OK
   pass



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