from flask import Flask
# from pathlib import Path
# from flask_login import LoginManager
# from flask_migrate import Migrate
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()
# database_name = "database.db"

#read from key.txt
APIKey = None
with open('key.txt', 'r') as f:
    APIKey = f.read()


def create_app():
    created_app = Flask(__name__)
    created_app.config['SECRET_KEY'] = 'WeatherApp3000'
    # created_app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_name}'
    # created_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # db.init_app(created_app)
    # socket.init_app(created_app)

    # created_app.register_blueprint(visuals, url_prefix='/')
    # created_app.register_blueprint(authentication, url_prefix='/')

    # create_database_if_not_exist(created_app)
    # from website.database import User, YoutubeLinks
    # migrate = Migrate(created_app, db)

    # login_manager = LoginManager()
    # login_manager.login_view = 'login'
    # login_manager.init_app(created_app)

    # @login_manager.user_loader
    # def load_user(id):
    #     return User.query.get(int(id))

    return created_app

# def create_database_if_not_exist(created_app):
#     if not Path('website/' + database_name).exists():
#         db.create_all(app=created_app)
#         print('Created Database!')