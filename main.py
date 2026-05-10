from PyQt6.QtWidgets import QApplication, QWidget, QMessageBox
from PyQt6 import uic
import sys

class Login(QWidget):
    def __init__(self):
        super().__init__()
        self.ui = uic.loadUi('login_form.ui', self)

        # authenticate when the login button is clicked
        self.ui.btn_login.clicked.connect(self.authenticate)

        self.show()
    
    def authenticate(self):
        username = self.username_input.text()

        if username == 'test_user':
            QMessageBox.information(self, 'Success',"You're logged in!")
        else:
            QMessageBox.critical(self, 'Error',"Invalid email or password.")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    login_window = Login()
    sys.exit(app.exec())