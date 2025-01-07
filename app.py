from flask import Flask, request, jsonify, render_template, redirect, url_for, session
import time

app = Flask(__name__)
app.secret_key = 'your_secret_key'


@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('chat'))
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Simple authentication logic for demonstration purposes
        if username == 'user' and password == 'password':
            session['username'] = username
            return redirect(url_for('chat'))
        else:
            return 'Invalid credentials!'
    return render_template('login.html')


@app.route('/chat')
def chat():
    if 'username' in session:
        return render_template('index.html', username=session['username'])
    return redirect(url_for('login'))


@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.form['message']
    # Simulate processing time
    time.sleep(2)
    # Dummy response logic
    bot_response = f"Bot response to: {user_message}"
    return jsonify(response=bot_response)


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
