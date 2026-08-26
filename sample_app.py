import os
import logging
from flask import Flask, render_template
import pymysql

# Configurar logs para no exponer excepciones al cliente web
logging.basicConfig(level=logging.INFO)

sample = Flask(__name__)

@sample.route("/")
def home():
    try:
        # Credenciales extraídas dinámicamente desde variables de entorno
        conn = pymysql.connect(
            host=os.environ.get("DB_HOST", "servidor-bd-082"),
            user=os.environ.get("DB_USER", "root"),
            password=os.environ.get("DB_PASSWORD"),
            database=os.environ.get("DB_NAME", "082_db"),
            connect_timeout=3
        )
        conn.close()
        db_status = "Conexión exitosa a la BD!"
    except pymysql.MySQLError as e:
        # Registrar el error real internamente en la consola/servidor
        logging.error("Error conectando a MySQL: %s", e)
        # Mostrar mensaje genérico al usuario final por seguridad
        db_status = "Error en la conexión a la base de datos."
    except Exception as e:
        logging.error("Error inesperado: %s", e)
        db_status = "Error interno en el servidor."

    return render_template("index.html", db_status=db_status)

if __name__ == '__main__':
    debug_mode = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    # # nosec B104 le indica a Bandit que bindear 0.0.0.0 es intencional para contenedores
    sample.run(host="0.0.0.0", port=5050, debug=debug_mode)  # nosec B104
    #mafe