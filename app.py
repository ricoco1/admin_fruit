from flask import Flask, render_template, request, redirect, url_for
import requests
from pymongo import MongoClient
from bson import ObjectId
import os
from os.path import join, dirname
from dotenv import load_dotenv
from datetime import datetime


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME =  os.environ.get("DB_NAME")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME] 
app = Flask(__name__)

@app.route('/', methods = ['GET'])
def home():
    fruit = list(db.fruit.find({}))
    return render_template("dashboard.html", fruit=fruit)

@app.route('/fruit', methods = ['GET'])
def fruit():
    fruit = list(db.fruit.find({}))
    return render_template("index.html", fruit=fruit)

@app.route('/addFruit',methods = ['GET', 'POST'])
def addFruit():
    if request.method=='POST':
        nama = request.form['nama']
        harga = request.form['harga']
        deskripsi = request.form['deskripsi']
        gambar = request.files['gambar']
        current_time = datetime.now()


        if gambar:
            namaGambarAsli = gambar.filename
            namaFileGambar = namaGambarAsli.split('/')[-1]
            file_path = f'static/assets/gambar_buah/{namaFileGambar}'
            gambar.save(file_path)
        else:
            gambar = None
        
        doc = {
            'nama':nama,
            'harga': harga,
            'deskripsi': deskripsi,
            'gambar': namaFileGambar,
            'created_at': current_time,
            'updated_at': current_time
        }
        db.fruit.insert_one(doc)
        return redirect(url_for("fruit"))

    return render_template("AddFruit.html")

@app.route('/editFruit/<_id>',methods = ['GET','POST'])
def editFruit(_id):
    if request.method=='POST':
        nama = request.form['nama']
        harga = request.form['harga']
        deskripsi = request.form['deskripsi']
        nama_gambar = request.files['gambar']
        current_time = datetime.now()

        
        doc = {
            'nama':nama,
            'harga': harga,
            'deskripsi': deskripsi,
            'updated_at': current_time
        }
        if nama_gambar:
            namaGambarAsli = nama_gambar.filename
            namaFileGambar = namaGambarAsli.split('/')[-1]
            file_path = f'static/assets/gambar_buah/{namaFileGambar}'
            nama_gambar.save(file_path)
            doc['gambar']=namaFileGambar
        db.fruit.update_one({"_id": ObjectId(_id)}, {"$set": doc})
        return redirect(url_for("fruit"))
    id = ObjectId(_id)
    data = list(db.fruit.find({"_id":id}))
    return render_template("EditFruit.html", data = data)

@app.route('/delete/<_id>', methods = ['GET'])
def delete(_id):
    db.fruit.delete_one({"_id": ObjectId(_id)})
    return redirect(url_for("fruit"))

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)