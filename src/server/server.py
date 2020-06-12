from flask import Flask, request, abort, make_response
from datetime import datetime
import mysql.connector as mysql
import json
from flask_cors import CORS
import bcrypt
import uuid

db = mysql.connect(
	host = "localhost",
	user = "root",
	passwd = "BKNY1987",
	database = "world")
print(db)

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	print(data)
	query = "select id, password, first_name from users where email = %s"
	values = (data['email'], )
	cursor = db.cursor()
	cursor.execute(query, values)
	record = cursor.fetchone()
	print(record)

	if not record:
		abort(401)

	user_id = record[0]
	hashed_pwd = record[1].encode('utf-8')
	first_name = record[2]

	if bcrypt.hashpw(data['password'].encode('utf-8'), hashed_pwd) != hashed_pwd:
		abort(401)

	session_id = str(uuid.uuid4())
	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id=%s"
	values = (user_id, session_id, session_id)
	cursor.execute(query, values)
	db.commit()
	res_data = {"first_name": first_name, "user_id": user_id}
	res = make_response(res_data)
	res.set_cookie("session_id", session_id)
	return res

@app.route('/logout', methods=['POST'])
def logout():
	data = request.get_json()
	query = "delete from sessions where user_id=%s"
	print(data['user_id'])
	value = (data['user_id'], )
	cursor = db.cursor()
	cursor.execute(query, value)
	db.commit()
	cursor.close()
	res = make_response()
	res.set_cookie("session_id", '', expires=0)
	return res

@app.route('/register', methods=['POST'])
def register():
	data = request.get_json()
	print(data)
	query = "select id from users where email=%s"
	value = (data['email'], )
	cursor = db.cursor()
	cursor.execute(query, value)
	records = cursor.fetchall()
	print(records)

	if records:
		abort(401)

	hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
	query = "insert into users (first_name, last_name, email, password) values (%s, %s, %s, %s)"
	values = (data['first_name'], data['last_name'], data['email'], hashed_pwd)
	cursor.execute(query, values)
	db.commit()
	new_user_id = cursor.lastrowid
	cursor.close()
	return 'New user id: ' + str(new_user_id)

@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
	if request.method == 'GET':
		return get_all_posts()
	else:
		return add_post()


def add_post():
	data = request.get_json()
	print(data)
	current_time = datetime.now()
	author = "Ido Klotz" #set default to anonymous???
	query = "insert into posts (author, title, content, published) values (%s ,%s, %s, %s)"
	values = (author, data["title"], data["content"], current_time)
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	cursor.close()

	return "Post successfully added"


def get_all_posts():
	query = "select id, author, title, content, image, published from posts;"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	cursor.close()
	print(records)
	header = ['id', 'author', 'title', 'content', 'image', 'published']
	data = []

	for r in records:
		data.append(dict(zip(header, r)))

	return json.dumps(data, default=str)


if __name__ == "__main__":
	app.run()