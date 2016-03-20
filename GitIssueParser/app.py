from flask import Flask
from flask import request
from flask import jsonify
from GitApiHandler import getGitRepoIssueCounts
from flask import render_template
from Error import CustomError

app=Flask(__name__)


@app.errorhandler(CustomError)
def handle_invalid_usage(error):
    """
    :param error:
    :return ErrorJSON:
    This is a handler for custom errors
    """
    app.logger.error(str(error.__class__)+": "+error.message)
    app.logger.error("Returned Error Message :"+error.message)

    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.route('/repo/issues',methods=["POST"])
def getGitRepoIssues():
    req_json=request.get_json()
    result=getGitRepoIssueCounts(req_json)
    return jsonify({"open_issue_counts":result})


@app.route('/')
def getHomePage():
    return render_template('index.html')
