# Flask With SQLAlchemy 

## Learning Goals

- [ ] **Implement a small Flask app with SQLAlchemy**
- [ ] **Create a Restful API**
- [ ] **Implement Create and Post Routes**
- [ ] **Implement a database Model**
- [ ] **Understand the use of ORMS backend applications**
- [ ] **Handel server side validations**
- [ ] **Send json requests to a Postman client**


## Setting up your environment 
Create a virtual environment for your project by running:
`python3 -m venv venv`
Activate the virtual environment:
 `source venv/bin/activate`
run `pip install -r requirements.txt`

## Running the server 
The line below in our api.py allows us to run our server with `python3 api.py`.
After you have completed your first route, you can run `python3 api.py` to run the server and verify the route using postman. 

```
if __name__ == '__main__':
   app.run(debug=True)

```


## SQLite
SQLite is Python's built-in database engine. It stores data in relational tables and manages this data using SQL (Structured Query Language). Thanks to our ORM, SQLAlchemy, we don't need to dive deeply into SQL syntax to interact with the database. Instead, SQLAlchemy abstracts much of the complexity. If you'd like to learn more about SQLite, you can check out the official documentation here: Python SQLite.

## ORMs (Object-Relational Mappers)
Object-Relational Mapping (ORM) is a technique that converts data from our database into Python class objects. SQLAlchemy is our ORM, which handles interaction with the SQLite database. It automatically builds tables for us based on our models and provides methods for creating, reading, updating, and deleting data. This allows us to interact with the database in an intuitive, Pythonic way without needing to write raw SQL queries.




## Testing your code with Postman (Review)
Postman is an application that allows you to mock client-side requests. This means you can test your routes without having to build a frontend application, such as a React app.

Create an Account and Log In
Sign up for a Postman account and log in to the platform.

Install the Desktop Agent
Download and install the Postman desktop agent to enable sending requests to your locally hosted server.

Create a New Request
Once logged in, click "New" and select "Request." Choose the appropriate HTTP method (e.g., GET, POST, PUT, DELETE), and enter the URL of your Flask app (e.g., http://127.0.0.1:5000/api/workouts).

Send the Request
Configure the request as needed (e.g., adding headers or body data) and click "Send" to test your API.

![postman](assets/postman.png)


## Resources
- [Python REST API Tutorial for Beginners | How to Build a Flask REST API](https://www.youtube.com/watch?v=z3YMz-Gocmw)
- [Postman](https://www.postman.com/)



## Lab Deliverables

1. Import Dependencies 

- Import Flask from flask, SQLAlchemy from flask_sqlalchemy, and Resource, Api, reqparse, fields, and marshal_with from flask_restful.
- Create an instance of your Flask app using app = Flask(__name__).


<details>
  <summary>Click Here to view solution</summary>

```
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with 

app = Flask(__name__)

```

</details>


2. Configure the Database

- **Set Up Database Configuration**
   - In `app.py`, configure the database with the following line:
     ```python
     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
     ```
   - Initialize SQLAlchemy:
     ```python
     db = SQLAlchemy(app)
     ```
-  **Instantiate the API**
   - Create an instance of the API and pass the Flask app to it:
     ```python
     api = Api(app)
     ```

<details>
  <summary>Click Here to view solution</summary>

```
#the name of our database is database.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
#Passes the flask app to the api
api = Api(app)

```

</details>


3. Create a Model

- Define a class called `WorkoutModel` and inherit from `db.Model`.
- Define Attributes inside of the class
   - `id`: Integer, primary key.
   - `exercise`: String, max 80 characters, cannot be null.
   - `reps`: Integer.
   - `sets`: Integer.
   - `notes`: Text.
- Add a Representation Method. Define a `__repr__` method that returns a string representation of the `WorkoutModel` instance.



<details>
  <summary>Click Here to view solution</summary>

```
#We need to make a model for our class
#This will define what the data looks 
#In SQLite, TEXT can store up to 2GB of text
class WorkoutModel(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   exercise = db.Column(db.String(80), nullable=False)
   reps = db.Column(db.Integer)
   sets = db.Column(db.Integer)
   notes = db.Column(db.Text)
   #What prints when we look at the class
   def __repr__(self):
      return f"Workout {self.exercise}, Reps {self.reps}, Sets {self.sets}, Notes {self.notes}"

```

</details>

3. Create the Database 
- In `create_db.py`, import `api` and `db` from your `app.py` file.
- Call `app.app_context()` within a `with` statement:
     ```python
     with app.app_context():
         db.create_all()
     ```
- In your terminal, run the following command: `python3 create_db.py`
- If this runs successfully, you should see an `instance` folder with the `database.db` file.

<details>
  <summary>Click Here to view solution</summary>

```

from api import app,db
#Creates database 
with app.app_context():
  db.create_all()
#run python3 create_db.py
# Creates the database and folder called instance

```

</details>



4. Configure arguments 
- Initialize the Argument Parser. Create a variable called `workout_args` and set it to `reqparse.RequestParser()`
- Add the `exercise` argument with the following line `     workout_args.add_argument('exercise', type=str, required=True, help="Exercise cannot be blank")` This ensures that `exercise` is a required string and displays the message "Exercise cannot be blank" if the user leaves it empty
- Add Additional Arguments by follow the same pattern for the remaining attributes (e.g., `reps`, `sets`, `notes`), but exclude the `required=True` part, as they are not required.

<details>
  <summary>Click Here to view solution</summary>

```

workout_args = reqparse.RequestParser()
workout_args.add_argument('exercise', type=str, required=True, help="Exercise can not be blank")
workout_args.add_argument('reps', type=int )
workout_args.add_argument('sets', type=int)
workout_args.add_argument('notes', type=str, required=False)

```

</details>

5. Serialize the data
- Add a variable workoutFields and set it to a dictionary
- Each key should correspond to an attribute of the `WorkoutModel`, with the value set to the appropriate `fields` data type (e.g., `fields.Integer`, `fields.String`).

<details>
  <summary>Click Here to view solution</summary>

```

workoutFields = {
   'id': fields.Integer,
   'exercise': fields.String,
   'reps': fields.Integer,
   'sets': fields.Integer,
   'notes': fields.String,
}

```

</details>

5. Adding Routes
- Create a class called `Workouts` and inherit from `Resource`.
- Use the `@marshal_with(workoutFields)` decorator to serialize the data using the dictionary we created. This decorator should be applied before every route.
- Create a `get` route by defining `def get(self):`.
- Inside the route, create a variable called `workout` and set it to `WorkoutModel.query.all()` and return `workout`.
- Add this route to the API using `api.add_resource(Workouts, '/api/workouts')`.
- Run your server with `python3 app.py` and test the route. Since no data has been added yet, you should see an empty list `[]` in the response.

- Next, create a `post` route by defining `def post(self):`.
- Use `workout_args.parse_args()` to parse the data from the request body:
```
  args = workout_args.parse_args()
  workout = WorkoutModel(exercise=args["exercise"], reps=args["reps"], sets=args["sets"], notes=args["notes"])
```
- To save the data to the database, add and commit the workout with `db.session.add(workout)` and `db.session.commit()`
- Finally, query all workouts and return them with a status of 201
```
workouts = WorkoutModel.query.all()
return workouts, 201
```

<details>
  <summary>Click Here to view solution</summary>

```

class Workouts(Resource):
   #Sends serialized data
   @marshal_with(workoutFields)
   def get(self):
      workout = WorkoutModel.query.all()
      return workout
   
   @marshal_with(workoutFields)
   def post(self):
      args = workout_args.parse_args()
      workout = WorkoutModel(exercise=args["exercise"], reps=args["reps"],sets=args["sets"], notes=args["notes"])
      db.session.add(workout)
      db.session.commit()
      workouts = WorkoutModel.query.all()
      return workouts, 201

api.add_resource(Workouts, '/api/workouts')

```

</details>




## Submission Instructions

1. Push your code to GitHub.
2. Submit the link to your GitHub repository URL.
