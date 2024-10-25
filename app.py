from flask import Flask, render_template, url_for, redirect, request, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'MADONNA_LMAO'  # Change this to a strong secret key
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Decorator to check if user is logged in
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("index.html")

@app.route("/about", methods=["GET", "POST"])
def about():
    return render_template("about.html")

@app.route("/projects", methods=["GET", "POST"])
def projects():
    return render_template("projects.html")

@app.route("/contact", methods=["GET", "POST"])
def contact():
    return render_template("contact.html")

# Donate and payment pages
@app.route("/donate", methods=["GET", "POST"])
@login_required
def donate():
    return render_template("donate.html")

@app.route("/payment", methods=["GET", "POST"])
@login_required
def payment():
    return render_template("payment.html")

# Login route
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['user_id'] = user.id  # Store user ID in the session
            return redirect(url_for('home'))
        else:
            return render_template("login.html", error="Invalid credentials")
    return render_template("login.html")

# Registration route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        if User.query.filter_by(email=email).first():
            return render_template("register.html", error="Email already registered")
        new_user = User(name=name, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template("register.html")

# Profile route
@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    user = User.query.get(session['user_id'])
    if request.method == "POST":
        user.name = request.form.get("name")
        user.email = request.form.get("email")
        # Assume you have a field for profile photo URL
        user.profile_photo_url = request.form.get("profile_photo_url")  
        db.session.commit()
        return redirect(url_for('profile'))
    return render_template("profile.html", user=user)

# Logout route
@app.route("/logout")
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))

# Create the database tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
