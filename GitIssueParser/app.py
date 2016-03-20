from flask import Flask
from flask import request
from flask import jsonify
from GitApiHandler import getGitRepoIssueCounts
from flask import render_template
from Error import CustomError

#Creating  App
app=Flask(__name__)


#Error Handler for CustomError
@app.errorhandler(CustomError)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response



@app.route('/repo/issues',methods=["POST"])
def getGitRepoIssues():
    """
    input:git_url - URL of the github repository
    :return:open issue counts in json format
    """
    req_json=request.get_json()
    result=getGitRepoIssueCounts(req_json)
    return jsonify({"open_issue_counts":result})


@app.route('/')
def getHomePage():
    return render_template('index.html')
